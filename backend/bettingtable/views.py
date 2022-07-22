from urllib.error import HTTPError
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from rest_framework import viewsets
import jwt
import json

from .serializers import UserSerializer
from .models import User
from .forms import SignupForm

# Create your views here.

class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()

def signup(request):
  if request.method == "POST":
    req_data = json.loads(request.body.decode('utf-8'))
    req_data['hashid'] = make_password(req_data['email'] + req_data['password1'])
    form = SignupForm(req_data)
    if form.is_valid():
      form.save()
      return HttpResponse("Saved")
    return HttpResponse(json.dumps(form.errors), status=406)
  return HttpResponse("Bad request", status=400)

def login(request):
  if request.method == "POST":
    req_data = json.loads(request.body.decode('utf-8'))
    id = User.objects.filter(email__exact = req_data.get('email')).values('hashid')
    if not id:
      return HttpResponse(json.dumps({"email": "Email does not exist"}), status=406)
    user = authenticate(email=req_data.get('email'), password=req_data.get('password'))
    if user:
      id = id[0].get('hashid')
      return HttpResponse(json.dumps({
        "userid": id,
        "token": jwt.encode({"id": id}, settings.SECRET_KEY).decode()
      }), status=200)
    else:
      return HttpResponse(json.dumps({"password": "Wrong password"}), status=406)
  return HttpResponse("Bad request", status=400)

def test(reqest):
  return HttpResponse(json.dumps({"token":jwt.encode({ "userid": "abcabcabcabc" }, settings.SECRET_KEY).decode()}))