from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class SignupForm(UserCreationForm):
  hashid = forms.CharField(required=False)
  email = forms.EmailField(required=False)
  password1 = forms.CharField(required=False)
  password2 = forms.CharField(required=False)

  class Meta:
    model = User
    fields = ('hashid', 'email', 'password1', 'password2', )