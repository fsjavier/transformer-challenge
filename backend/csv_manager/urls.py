from django.urls import path
from .views import CSVFileListCreateView

app_name = 'csv_manager'

urlpatterns = [
    path('csv-files/', CSVFileListCreateView.as_view(), name='csv_file_list_create'),
]