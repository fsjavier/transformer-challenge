from django.urls import path
from .views import (
  CSVFileListCreateView,
  CSVFileRetrieveHeaderView,
  CSVFileRetrieveContentView
)

app_name = 'csv_manager'

urlpatterns = [
    path('csv-files/', CSVFileListCreateView.as_view(), name='csv_file_list_create'),
    path('csv-files/<int:pk>/headers/', CSVFileRetrieveHeaderView.as_view(), name='csv_file_headers'),
    path('csv-files/<int:pk>/content/', CSVFileRetrieveContentView.as_view(), name='csv_file_content'),
]