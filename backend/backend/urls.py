"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from bettingtable import views
# from bettingtable.models import User

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')

# admin.site.register(User, UserAdmin)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/database/', include(router.urls)),
    path('api/users/signup/', csrf_exempt(views.signup)),
    path('api/users/login/', csrf_exempt(views.login)),
    path('api/users/test/', views.test),
]
