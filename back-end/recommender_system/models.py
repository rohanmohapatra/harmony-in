from django.db import models

# Create your models here.
class UserActivity(models.Model):
    user = models.CharField(max_length=30)
    ACTIVITY_CHOICES= (
            ("CLKD", "CLICKED"),
            ("MSVR", "MOUSE_OVER"),
            ("ADWL", "ADDED_TO_WISHLIST")
        )
    activity = models.CharField(
        max_length=4,
        choices=ACTIVITY_CHOICES,
        default="CLKD",
        )
    timeStamp = models.DateTimeField(auto_now_add=True)
