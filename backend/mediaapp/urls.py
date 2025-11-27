from django.urls import path, include
from rest_framework import routers
from .views import MediaItemViewSet, fetch_youtube_metadata

router = routers.DefaultRouter()
router.register(r"media", MediaItemViewSet, basename="media")

urlpatterns = [
    path("", include(router.urls)),
    path("fetch-youtube-metadata/", fetch_youtube_metadata, name="fetch-youtube"),
]
