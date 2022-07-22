from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class User(AbstractUser):
  username=None
  hashid = models.CharField(max_length=100)
  email = models.CharField(_('email address'), max_length=100, unique=True)
  password = models.CharField(max_length=100)
  # active = models.BooleanField(default=True)
  # staff = models.BooleanField(default=False)  # a admin user; non super-user
  # admin = models.BooleanField(default=False)  # a superuser

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  def _str_(self):
    return "{}".format(self.email)

# class UserManager(BaseUserManager):
#   def create_user(self, email, password=None, is_admin=False, is_staff=False, is_active=False):
#     if not email:
#       raise ValueError("User must have an email")
#     if not password:
#       raise ValueError("User must have a password")
#     user = self.model(email=self.normalize_email(email))
#     user.set_password(password)
#     user.admin = is_admin
#     user.staff = is_staff
#     user.active = is_active
#     user.save(using=self._db)
#     return user
#   def create_superuser(self, email, password=None, **other_fields):
#     if not email:
#       raise ValueError("User must have an email")
#     if not password:
#       raise ValueError("User must have a password")
#     user = self.model(email=self.normalize_email(email))
#     user.set_password(password)
#     user.admin = True
#     user.staff = True
#     user.active = True
#     user.save(using=self._db)
#     return user