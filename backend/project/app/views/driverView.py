from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Booking, Pickup
from ..serializers import (
    PickupSerializer,
)


# -------------------------------
# Complete Pickup (Driver only)
# -------------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def complete_pickup(request, booking_id):
    if not hasattr(request.user, "driver"):
        return Response({"error": "Only drivers can complete pickups"}, status=403)

    try:
        booking = Booking.objects.get(id=booking_id, is_completed=True)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or already completed"}, status=404)

    pickup = Pickup.objects.create(booking=booking, driver=request.user.driver)
    booking.is_completed = True
    booking.save()
    return Response(PickupSerializer(pickup).data, status=201)


# -------------------------------
# List Driver Pickups
# -------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_driver_pickups(request):
    if not hasattr(request.user, "driver"):
        return Response({"error": "Only drivers can view pickups"}, status=403)

    pickups = Pickup.objects.filter(driver=request.user.driver)
    serializer = PickupSerializer(pickups, many=True)
    return Response(serializer.data)
