from django.db import models


class MediaItem(models.Model):
    MEDIA_TYPES = [
        ("youtube_video", "YouTube Video"),
        ("youtube_playlist", "YouTube Playlist"),
        ("movie", "Movie"),
        ("anime", "Anime"),
        ("tv_series", "TV Series"),
        ("book", "Book"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("planning", "Planning"),
        ("in_progress", "Currently Watching/Reading"),
        ("completed", "Completed"),
        ("dropped", "Dropped"),
    ]

    title = models.CharField(max_length=255)
    media_type = models.CharField(max_length=32, choices=MEDIA_TYPES)
    source_url = models.URLField(blank=True, null=True)
    thumbnail_url = models.URLField(blank=True, null=True)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="planning"
    )
    notes = models.TextField(blank=True)

    progress = models.IntegerField(default=0)        # episodes/pages watched/read
    total_units = models.IntegerField(default=0)     # total episodes/pages

    date_added = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.media_type})"
