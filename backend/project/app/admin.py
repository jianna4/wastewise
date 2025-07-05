from django.contrib import admin

# Register your models here.
# backend/core/admin.py

from django.contrib.auth.admin import UserAdmin
from .models import User, County, SubCounty, Driver, PickupRequest

# Custom User display in Admin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'phone', 'is_driver', 'is_admin', 'stars')
    fieldsets = UserAdmin.fieldsets + (
        ('WasteWise Info', {'fields': ('phone', 'stars', 'is_driver', 'is_admin')}),
    )

# Driver Admin with filter by subcounty
class DriverAdmin(admin.ModelAdmin):
    list_display = ('user', 'vehicle_number')
    filter_horizontal = ('assigned_subcounties',)  # For easy subcounty assignment

# Pickup Request Admin
class PickupRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'subcounty', 'status', 'created_at')
    list_filter = ('status', 'subcounty__county')
    search_fields = ('user__username', 'address')

# Register all models
admin.site.register(User, CustomUserAdmin)
admin.site.register(County)
admin.site.register(SubCounty)
admin.site.register(Driver, DriverAdmin)
admin.site.register(PickupRequest, PickupRequestAdmin)