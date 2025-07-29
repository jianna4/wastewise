from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# -------------------------------
# Custom User Model
# -------------------------------
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100,blank=True, null=True)
    stars = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager() 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

     

    def __str__(self):
        return self.email


# -------------------------------
# County Model
# -------------------------------
class County(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# -------------------------------
# SubCounty Model
# -------------------------------
class SubCounty(models.Model):
    county = models.ForeignKey(County, on_delete=models.CASCADE, related_name='subcounties')
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('county', 'name')

    def __str__(self):
        return f"{self.name} ({self.county.name})"

# -------------------------------
# Area Model
# -------------------------------
class Area(models.Model):
    subcounty = models.ForeignKey(SubCounty, on_delete=models.CASCADE, related_name='areas')
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('subcounty', 'name')

    def __str__(self):
        return f"{self.name} ({self.subcounty.name}, {self.subcounty.county.name})"
# -------------------------------
# Driver Model
# -------------------------------
class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vehicle_number = models.CharField(max_length=50)

    def __str__(self):
        return f"Driver: {self.user.name}"

# -------------------------------
# Booking Model
# -------------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    pickup_date = models.DateField()
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Booking by {self.user.email} on {self.pickup_date}"

# -------------------------------
# Pickup Model
# -------------------------------
class Pickup(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    completed_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Award star to user
        user = self.booking.user
        user.stars += 1
        user.save()

    def __str__(self):
        return f"Pickup for {self.booking.user.email} by {self.driver.user.email}"