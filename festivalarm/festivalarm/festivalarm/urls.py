from turtle import home
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('festivalapp/', include('festivalapp.urls')),
    path('accounts/', include('accounts.urls')),
]
