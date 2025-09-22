from django.urls import path

from .views import authView, bookingView, driverView, locationView

urlpatterns = [
    # User endpoints
    path("register/", authView.register_user, name="register_user"),
    path("login/", authView.login_user, name="login_user"),
    # # Driver endpoints
    path("driver-login/", authView.login_driver, name="login_driver"),
    path("driver/pickups/", driverView.list_driver_pickups, name="list_driver_pickups"),
    path(
        "pickup/<int:booking_id>/complete/",
        driverView.complete_pickup,
        name="complete_pickup",
    ),
    # Booking endpoints
    path("bookings/create/", bookingView.create_booking, name="create_booking"),
    path("bookings/", bookingView.list_user_bookings, name="list_user_bookings"),
    # location endpoints
    path("counties/", locationView.list_counties, name="list_counties"),
    path(
        "counties/<int:county_id>/subcounties/",
        locationView.list_subcounties,
        name="list_subcounties",
    ),
    path(
        "subcounties/<int:subcounty_id>/areas/",
        locationView.list_areas,
        name="list_areas",
    ),
    # rag endpoints
    # path("ask/", views.ask_question, name="ask_question"),
]
