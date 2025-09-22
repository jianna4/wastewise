from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Driver, Booking, Pickup, Area
from .serializers import (
    UserSerializer, DriverSerializer,
    BookingSerializer, PickupSerializer
)
import json
#from .waster.retrieval import qa_chain
# -------------------------------
# Register User
# -------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    name = request.data.get("name","")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(email=email, password=password, name=name)
    refresh = RefreshToken.for_user(user)
    return Response({
        "user": UserSerializer(user).data,
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }, status=201)

# -------------------------------
# Login User
# -------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    print("Received data:", request.data)
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, email=email, password=password )

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    return Response({"error": "Invalid credentials"}, status=401)

# -------------------------------
# Login Driver
# -------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_driver(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, email=email, password=password)

    if user and hasattr(user, 'driver'):
        refresh = RefreshToken.for_user(user)
        return Response({
            "driver": DriverSerializer(user.driver).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    return Response({"error": "Invalid driver credentials"}, status=401)

# -------------------------------
# Create Booking
# -------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    area_id = request.data.get("area_id")
    pickup_date = request.data.get("pickup_date")
    latitude = request.data.get("latitude")
    longitude = request.data.get("longitude")
    address = request.data.get("address")
    raw_response = request.data.get("raw_response")

    try:
        area = Area.objects.get(id=area_id)
    except Area.DoesNotExist:
        return Response({"error": "Invalid area"}, status=400)

    booking = Booking.objects.create(
        user=request.user,
        area=area,
        pickup_date=pickup_date,
        latitude=latitude,
        longitude=longitude,
        address=address,
        raw_response=raw_response , # can be dict if JSONField
    )
    return Response(BookingSerializer(booking).data, status=201)

# -------------------------------
# List User Bookings
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

# -------------------------------
# Complete Pickup (Driver only)
# -------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_pickup(request, booking_id):
    if not hasattr(request.user, 'driver'):
        return Response({"error": "Only drivers can complete pickups"}, status=403)

    try:
        booking = Booking.objects.get(id=booking_id, is_completed=True)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or already completed"}, status=404)

    pickup = Pickup.objects.create(
        booking=booking,
        driver=request.user.driver
    )
    booking.is_completed = True
    booking.save()
    return Response(PickupSerializer(pickup).data, status=201)

# -------------------------------
# List Driver Pickups
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_driver_pickups(request):
    if not hasattr(request.user, 'driver'):
        return Response({"error": "Only drivers can view pickups"}, status=403)

    pickups = Pickup.objects.filter(driver=request.user.driver)
    serializer = PickupSerializer(pickups, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import County, SubCounty, Area
from .serializers import CountySerializer, SubCountySerializer, AreaSerializer

# County endpoints
@api_view(['GET'])
def list_counties(request):
    counties = County.objects.all()
    serializer = CountySerializer(counties, many=True)
    return Response(serializer.data)

# SubCounty endpoints
@api_view(['GET'])
def list_subcounties(request, county_id=None):
    queryset = SubCounty.objects.all()
    if county_id:
        queryset = queryset.filter(county_id=county_id)
    serializer = SubCountySerializer(queryset, many=True)
    return Response(serializer.data)

# Area endpoints
@api_view(['GET'])
def list_areas(request, subcounty_id=None):
    queryset = Area.objects.all()
    if subcounty_id:
        queryset = queryset.filter(subcounty_id=subcounty_id)
    serializer = AreaSerializer(queryset, many=True)
    return Response(serializer.data)

# Booking endpoint

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .chatbot.retrieval import quey_vectorstore
@csrf_exempt  # disable CSRF for testing, better handle with tokens later
def chatbot_endpoint(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode("utf-8"))
            query = body.get("query", None)

            if not query:
                return JsonResponse({"error": "Missing 'query' in request body"}, status=400)

            answer = quey_vectorstore(query)
            return JsonResponse({"query": query, "answer": answer}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)