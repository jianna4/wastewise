from django.http import request
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Area, Booking
from ..serializers import (
    BookingSerializer,
)


# -------------------------------
# Create Booking
# -------------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_booking(request):
    data = request.data.copy()
    area_id = data.pop("area_id", None)
    try:
        area = Area.objects.get(id=area_id)
    except Area.DoesNotExist:
        return Response({"error": "Invalid area"}, status=400)

    booking = Booking.objects.create(user=request.user, area=area, **data)
    return Response(BookingSerializer(booking).data, status=201)


class UserCreateBookingCreateAPIView(generics.CreateAPIView):
    """create  new booking"""

    permission_classes = [IsAuthenticated]


class UserBookingsListAPIView(generics.ListAPIView):
    """list all the Booking to  user who is logged in"""

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return super().get_queryset().filter(user=user)
