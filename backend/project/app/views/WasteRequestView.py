from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from app.models import WasteRequest
from app.serializers import WasteRequestSerializer


class WasteRequestViewSet(viewsets.ModelViewSet):
    """crud operation for waste request"""

    serializer_class = WasteRequestSerializer
    queryset = WasteRequest.objects.all()
    permission_classes = [IsAuthenticated]
