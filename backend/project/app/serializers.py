from rest_framework import serializers
from .models import (
    User, County, SubCounty, Area,
    Driver, Booking, Pickup
)

# -------------------------------
# User Serializer
# -------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'stars']

# -------------------------------
# Location Serializers
# -------------------------------
class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = ['id', 'name']

class SubCountySerializer(serializers.ModelSerializer):
    county = CountySerializer(read_only=True)
    county_id = serializers.PrimaryKeyRelatedField(
        queryset=County.objects.all(), source='county', write_only=True
    )

    class Meta:
        model = SubCounty
        fields = ['id', 'name', 'county', 'county_id']

class AreaSerializer(serializers.ModelSerializer):
    subcounty = SubCountySerializer(read_only=True)
    subcounty_id = serializers.PrimaryKeyRelatedField(
        queryset=SubCounty.objects.all(), source='subcounty', write_only=True
    )

    class Meta:
        model = Area
        fields = ['id', 'name', 'subcounty', 'subcounty_id']

# -------------------------------
# Driver Serializer
# -------------------------------
class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Driver
        fields = ['id', 'user', 'user_id', 'vehicle_number']

# -------------------------------
# Booking Serializer
# -------------------------------
class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    area = AreaSerializer(read_only=True)
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(), source='area', write_only=True
    )

    class Meta:
        model = Booking
        fields = ['id', 'user', 'user_id', 'area', 'area_id', 'pickup_date', 'is_completed']

# -------------------------------
# Pickup Serializer
# -------------------------------
class PickupSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)
    booking_id = serializers.PrimaryKeyRelatedField(
        queryset=Booking.objects.all(), source='booking', write_only=True
    )
    driver = DriverSerializer(read_only=True)
    driver_id = serializers.PrimaryKeyRelatedField(
        queryset=Driver.objects.all(), source='driver', write_only=True
    )

    class Meta:
        model = Pickup
        fields = ['id', 'booking', 'booking_id', 'driver', 'driver_id', 'completed_at']