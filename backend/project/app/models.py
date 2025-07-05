from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser

# ---- 1. User Model (Roles: Resident, Driver, Admin) ----
class User(AbstractUser):
    phone = models.CharField(max_length=15, unique=True)  # Required for M-Pesa
    is_driver = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    stars = models.IntegerField(default=0)  # Reward points

    def __str__(self):
        return f"{self.username} ({self.phone})"

# ---- 2. Location Tables ----
class County(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SubCounty(models.Model):
    name = models.CharField(max_length=100)
    county = models.ForeignKey(County, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}, {self.county.name}"

# ---- 3. Driver Profile (Extra Fields) ----
class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    assigned_subcounties = models.ManyToManyField(SubCounty)  # Where they operate
    vehicle_number = models.CharField(max_length=20)

    def __str__(self):
        return f"Driver {self.user.username}"

# ---- 4. Pickup Request ----
class PickupRequest(models.Model):
    TRASH_TYPES = [
        ('plastic', 'Plastic'),
        ('metal', 'Metal'),
        ('organic', 'Organic'),
        ('e-waste', 'E-Waste'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subcounty = models.ForeignKey(SubCounty, on_delete=models.CASCADE)
    trash_types = models.CharField(max_length=100)  # Comma-separated (e.g., "plastic,metal")
    address = models.TextField()  # Exact location (e.g., "House 42, Nairobi")
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('completed', 'Completed')],
        default='pending'
    )
    assigned_driver = models.ForeignKey(Driver, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pickup #{self.id} by {self.user.username}"

    def save(self, *args, **kwargs):
        # Auto-add a star when pickup is completed
        if self.status == 'completed' and not self.pk:
            self.user.stars += 1
            self.user.save()
        super().save(*args, **kwargs)