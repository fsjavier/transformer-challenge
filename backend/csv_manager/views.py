from rest_framework import generics, status
from rest_framework.response import Response
from django.http import FileResponse
from .models import CSVFile
from .serializers import CSVFileSerializer
import csv
from io import StringIO

class CSVFileListCreateView(generics.ListCreateAPIView):
    """
    List all CSV files or create a new CSV file.
    """
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

class CSVFileRetrieveHeaderView(generics.RetrieveAPIView):
    """
    Retrieve the header of a CSV file.
    """
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

    def retrieve(self, request, *args, **kwargs):
        csv_file = self.get_object()
        try:
            with csv_file.file.open('rb') as f:
                csv_content = f.read().decode('utf-8')
            csv_reader = csv.reader(StringIO(csv_content))
            headers = next(csv_reader)

            return Response({
                'id': csv_file.id,
                'name': csv_file.name,
                'headers': headers
            })

        except Exception as e:
            return Response(
                {'error': f"Error reading the header of the file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )


class CSVFileRetrieveContentView(generics.RetrieveAPIView):
    """
    Retrieve the content of a CSV file.
    """
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

    def retrieve(self, request, *args, **kwargs):
        csv_file = self.get_object()
        try:
            with csv_file.file.open('rb') as f:
                csv_content = f.read().decode('utf-8')
            csv_reader = csv.reader(StringIO(csv_content))
            headers = next(csv_reader)
            rows = list(csv_reader)

            return Response({
            'id': csv_file.id,
            'name': csv_file.name,
            'headers': headers,
            'rows': rows
            })
        except Exception as e:
            return Response(
                {'error': f"Error reading the content of the file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
