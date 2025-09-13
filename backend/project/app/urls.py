from django.urls import path
from . import views

urlpatterns = [
    # User endpoints
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),

    # Driver endpoints
    path('driver-login/', views.login_driver, name='login_driver'),
    path('driver/pickups/', views.list_driver_pickups, name='list_driver_pickups'),
    path('pickup/<int:booking_id>/complete/', views.complete_pickup, name='complete_pickup'),

    # Booking endpoints
    path('bookings/create/', views.create_booking, name='create_booking'),
    path('bookings/', views.list_user_bookings, name='list_user_bookings'),

    #location endpoints
    path('counties/', views.list_counties, name='list_counties'),
    path('counties/<int:county_id>/subcounties/', views.list_subcounties, name='list_subcounties'),
    path('subcounties/<int:subcounty_id>/areas/', views.list_areas, name='list_areas'),

    #rag endpoints
    # path("ask/", views.ask_question, name="ask_question"),
]