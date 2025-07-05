from django.shortcuts import render

# Create your views here.
# backend/core/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate
from django.db.models import Q
from .models import User, County, SubCounty, Driver, PickupRequest
from .serializers import *

# ========================
# Authentication
# ========================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        login(self.request, user)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'status': 'Logged in'})
        return Response({'error': 'Invalid credentials'}, status=400)

# ========================
# Locations
# ========================
class CountyListView(generics.ListAPIView):
    queryset = County.objects.all()
    serializer_class = CountySerializer
    permission_classes = [permissions.AllowAny]

class SubCountyListView(generics.ListAPIView):
    serializer_class = SubCountySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        county_id = self.request.query_params.get('county_id')
        return SubCounty.objects.filter(county_id=county_id)

# ========================
# Pickups
# ========================
class PickupRequestCreateView(generics.CreateAPIView):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            subcounty=self.request.user.userlocation.subcounty
        )

class UserPickupListView(generics.ListAPIView):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PickupRequest.objects.filter(user=self.request.user)

# ========================
# Driver Endpoints
# ========================
class DriverRegisterView(generics.CreateAPIView):
    serializer_class = DriverSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_driver:
            serializer.save(user=self.request.user)
            self.request.user.is_driver = True
            self.request.user.save()

class AvailablePickupsView(generics.ListAPIView):
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_driver:
            return PickupRequest.objects.none()
        return PickupRequest.objects.filter(
            status='pending',
            subcounty__in=self.request.user.driver.assigned_subcounties.all()
        )

class AcceptPickupView(generics.UpdateAPIView):
    queryset = PickupRequest.objects.all()
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        pickup = self.get_object()
        if not request.user.is_driver:
            return Response({"error": "Driver access only"}, status=403)
        pickup.status = 'accepted'
        pickup.assigned_driver = request.user.driver
        pickup.save()
        return Response({"status": "Pickup accepted"})

# ========================
# Admin Endpoints
# ========================
class CompletePickupView(generics.UpdateAPIView):
    queryset = PickupRequest.objects.all()
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        pickup = self.get_object()
        pickup.status = 'completed'
        pickup.save()
        return Response({"status": "Pickup completed"})