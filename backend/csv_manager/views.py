from rest_framework import generics, status
from rest_framework.response import Response
import csv
from io import StringIO
from celery.result import AsyncResult
from .models import CSVFile
from .serializers import CSVFileSerializer
from .tasks import enrich_csv


class CSVFileListCreateView(generics.ListCreateAPIView):
    """
    List all CSV files or create a new CSV file.
    """
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)

        return Response({
            'success': True,
            'id': serializer.data['id'],
            'name': serializer.data['name']
        }, status=status.HTTP_201_CREATED)

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

class CSVFileEnrichView(generics.CreateAPIView):
    """
    Enrich a CSV file with data from an external API.
    """
    serializer_class = CSVFileSerializer
    queryset = CSVFile.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            csv_file = self.get_object()
            api_endpoint = request.data.get('api_endpoint')
            key_column = request.data.get('key_column')
            api_key_name = request.data.get('api_key_name')

            if not all([api_endpoint, key_column, api_key_name]):
                return Response(
                    {'error': 'Missing required fields'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            task = enrich_csv.delay(csv_file.id, api_endpoint, key_column, api_key_name)
            return Response(
                {
                    "message": "Enrichment task started",
                    "task_id": str(task.id)
                },
                status=status.HTTP_202_ACCEPTED
            )
        except Exception as e:
            return Response(
                {'error': f"Error starting enrichment task: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

class EnrichmentTaskStatusView(generics.RetrieveAPIView):
    """
    Retrieve the status of an enrichment task.
    """
    def retrieve(self, request, task_id, *args, **kwargs):
        task_result = AsyncResult(task_id)
        if task_result.successful():
            return Response({"status": "completed", "result": task_result.result})
        elif task_result.failed():
            return Response({"status": "failed", "error": str(task_result.result)})
        elif task_result.status == 'PENDING':
            return Response({"status": "pending"})
        else:
            return Response({"status": "in_progress"})
