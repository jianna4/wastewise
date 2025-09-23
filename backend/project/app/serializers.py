from rest_framework import serializers
from app.models import (
    Collection,
    RecyclingCenter,
    User,
    Vehicle,
    WasteRequest,
    WasteType,
)

from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    """create user  user"""

    class Meta:
        model = User
        fields = ["email", "phone", "user_type", "password"]
        readonly = ["id"]
        extra_kwargs = {"password": {"write_only": True}}


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.get(email=data["email"])
        if not user:
            raise AuthenticationFailed("Invalid username or password")
        if not user.is_active:
            raise AuthenticationFailed("User account is disabled")

        refresh = RefreshToken.for_user(user)

        return {
            "accessToken": str(refresh.access_token),
            "refreshToken": str(refresh),
        }


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
