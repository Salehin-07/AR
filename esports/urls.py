from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('8v$Gk9pL!xZq2#jR7mT@wF4yB^nU6sH%aD1eC*oV0iQ+f/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include('core.urls')),
]
