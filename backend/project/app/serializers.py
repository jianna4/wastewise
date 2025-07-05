# backend/core/serializers.py
from rest_framework import serializers
from .models import User, County, SubCounty, Driver, PickupRequest

# Basic Serializers
class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = ['id', 'name']

class SubCountySerializer(serializers.ModelSerializer):
    county = CountySerializer(read_only=True)
    
    class Meta:
        model = SubCounty
        fields = ['id', 'name', 'county']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'phone', 'stars']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Driver Serializer
class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    assigned_subcounties = SubCountySerializer(many=True, read_only=True)

    class Meta:
        model = Driver
        fields = ['id', 'user', 'vehicle_number', 'assigned_subcounties']

# Pickup Request Serializer
class PickupRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    subcounty = SubCountySerializer(read_only=True)
    trash_types = serializers.MultipleChoiceField(choices=PickupRequest.TRASH_TYPES)

    class Meta:
        model = PickupRequest
        fields = ['id', 'user', 'subcounty', 'trash_types', 'address', 'status', 'created_at']
        read_only_fields = ['user', 'status', 'created_at']

    def create(self, validated_data):
        # Auto-set the user from request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)