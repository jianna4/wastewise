from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, County, SubCounty, Area, Driver, Booking, Pickup


# -------------------------------
# Custom User Admin
# -------------------------------
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ("email", "name", "stars", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    search_fields = ("email", "name")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name", "stars")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "name",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


admin.site.register(User, UserAdmin)


# -------------------------------
# Location Admins
# -------------------------------
class SubCountyInline(
    admin.TabularInline
):  # Creates inline editing for SubCounties within County admin
    model = SubCounty
    extra = 1


class CountyAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    inlines = [SubCountyInline]


class AreaInline(admin.TabularInline):
    model = Area
    extra = 1


class SubCountyAdmin(admin.ModelAdmin):
    list_display = ("name", "county")
    search_fields = ("name",)
    list_filter = ("county",)
    inlines = [AreaInline]


class AreaAdmin(admin.ModelAdmin):
    list_display = ("name", "subcounty")
    search_fields = ("name",)
    list_filter = ("subcounty",)


admin.site.register(County, CountyAdmin)
admin.site.register(SubCounty, SubCountyAdmin)
admin.site.register(Area, AreaAdmin)


# -------------------------------
# Driver Admin
# -------------------------------
class DriverAdmin(admin.ModelAdmin):
    list_display = ("user", "vehicle_number")
    search_fields = ("user__email", "vehicle_number")


admin.site.register(Driver, DriverAdmin)


# -------------------------------
# Booking Admin
# -------------------------------
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "area",
        "location",
        "address",
        "raw_response",
        "pickup_date",
        "is_completed",
    )
    list_filter = ("pickup_date", "is_completed", "area__subcounty__county")
    search_fields = ("user__email", "area__name")


admin.site.register(Booking, BookingAdmin)


# -------------------------------
# Pickup Admin
# -------------------------------
class PickupAdmin(admin.ModelAdmin):
    list_display = ("booking", "driver", "completed_at")
    list_filter = ("completed_at", "driver")
    search_fields = ("booking__user__email", "driver__user__email")


admin.site.register(Pickup, PickupAdmin)
