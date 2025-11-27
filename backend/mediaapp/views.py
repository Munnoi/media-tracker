import re
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import MediaItem
from .serializers import MediaItemSerializer


class MediaItemViewSet(viewsets.ModelViewSet):
    queryset = MediaItem.objects.all().order_by("-date_added")
    serializer_class = MediaItemSerializer


YOUTUBE_REGEX = re.compile(
    r"(?:v=|youtu\.be/|embed/|shorts/)([A-Za-z0-9_-]{11})"
)


@api_view(["POST"])
def fetch_youtube_metadata(request):
    """
    Very simple helper.
    Takes { "url": "<youtube-url>" }
    Returns a guessed thumbnail URL and type.
    (No API key needed; title must be filled manually for now.)
    """
    url = request.data.get("url", "")

    if "playlist" in url:
        media_type = "youtube_playlist"
        # can't reliably get playlist thumbnail without API; leave null
        return Response(
            {
                "media_type": media_type,
                "thumbnail_url": None,
                "title": "",
            },
            status=status.HTTP_200_OK,
        )

    match = YOUTUBE_REGEX.search(url)
    if not match:
        return Response(
            {"detail": "Could not parse YouTube video ID."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    video_id = match.group(1)
    thumbnail_url = f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"

    return Response(
        {
            "media_type": "youtube_video",
            "thumbnail_url": thumbnail_url,
            "title": "",
        },
        status=status.HTTP_200_OK,
    )
