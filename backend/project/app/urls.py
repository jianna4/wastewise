from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from app.views.user import UserProfileView
from app.views.waste import WasteRequestViewSet
from app.views.auth import LoginView, UserRegistrationView


urlpatterns = [
    path(
        "register/",
        UserRegistrationView.as_view(),
        name="registerUser",
    ),
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "profile/<str:pk>",
        UserProfileView.as_view(),
        name="profile",
    ),
]
router = DefaultRouter()

router.register("wasteRequest", WasteRequestViewSet)
urlpatterns += router.urls
