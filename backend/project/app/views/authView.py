from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from ..models import User
from ..serializers import (
    DriverSerializer,
    UserSerializer,
)


# from .waster.retrieval import qa_chain
# -------------------------------
# Register User
# -------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    name = request.data.get("name", "")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(email=email, password=password, name=name)
    refresh = RefreshToken.for_user(user)
    return Response(
        {
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status=201,
    )


# -------------------------------
# Login User
# -------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, email=email, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )
    return Response({"error": "Invalid credentials"}, status=401)


# -------------------------------
# Login Driver
# -------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_driver(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, email=email, password=password)

    if user and hasattr(user, "driver"):
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "driver": DriverSerializer(user.driver).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )
    return Response({"error": "Invalid driver credentials"}, status=401)
