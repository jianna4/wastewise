from rest_framework import serializers
from app.models import (
    Collection,
    RecyclingCenter,
    User,
    Vehicle,
    WasteRequest,
    WasteType,
)


class UserSerializer(serializers.ModelSerializer):
    """create user  user"""

    class Meta:
        model = User
        fields = ["email", "name", "phone", "password_hash", "user_type", "location"]


class WasteTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteType
        fields = ["id", "name", "description"]


class WasteRequestSerializer(serializers.ModelSerializer):
    waste_type = serializers.StringRelatedField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = WasteRequest
        fields = [
            "user",
            "waste_type ",
            "volume_kg",
            "status",
            "schedule_time",
            "location",
        ]


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class RecyclingCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecyclingCenter
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    delivered_to = RecyclingCenterSerializer()

    class Meta:
        model = Collection
        fields = "__all__"
