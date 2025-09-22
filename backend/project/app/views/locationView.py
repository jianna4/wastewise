from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import County, SubCounty
from ..serializers import AreaSerializer, CountySerializer, SubCountySerializer
from ..models import Area


# County endpoints
@api_view(["GET"])
def list_counties(request):
    counties = County.objects.all()
    serializer = CountySerializer(counties, many=True)
    return Response(serializer.data)


# SubCounty endpoints
@api_view(["GET"])
def list_subcounties(request, county_id=None):
    queryset = SubCounty.objects.all()
    if county_id:
        queryset = queryset.filter(county_id=county_id)
    serializer = SubCountySerializer(queryset, many=True)
    return Response(serializer.data)


# Area endpoints
@api_view(["GET"])
def list_areas(request, subcounty_id=None):
    queryset = Area.objects.all()
    if subcounty_id:
        queryset = queryset.filter(subcounty_id=subcounty_id)
    serializer = AreaSerializer(queryset, many=True)
    return Response(serializer.data)
