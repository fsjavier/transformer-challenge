from rest_framework import generics
from .models import CSVFile
from .serializers import CSVFileSerializer

class CSVFileListCreateView(generics.ListCreateAPIView):
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer
