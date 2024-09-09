from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from csv_manager.models import CSVFile

URL_CSV_FILE_LIST_CREATE = reverse('csv_manager:csv_file_list_create')

class CSVFileViewsTest(TestCase):
    """Test the CSVFile views."""
    def setUp(self):
        self.client = APIClient()

    def test_upload_csv_view(self):
        """
        Test the CSV upload view.
        """
        csv_content = 'column1,column2\nvalue1,value2\nvalue3,value4'
        csv_file = SimpleUploadedFile(
            name="test_file.csv",
            content=csv_content.encode('utf-8'),
            content_type="text/csv"
        )

        response = self.client.post(
            URL_CSV_FILE_LIST_CREATE,
            {
                'file': csv_file,
                'name': 'Test CSV File'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(CSVFile.objects.filter(name='Test CSV File').exists())

    def test_csv_list_view(self):
        """
        Test the CSV list view.
        """
        csv_content = 'column1,column2\nvalue1,value2\nvalue3,value4'
        csv_file = SimpleUploadedFile(
            name="test_file.csv",
            content=csv_content.encode('utf-8'),
            content_type="text/csv"
        )

        CSVFile.objects.create(
            file=csv_file,
            name="Test CSV 1"
        )
        CSVFile.objects.create(
            file=csv_file,
            name="Test CSV 2"
        )

        response = self.client.get(URL_CSV_FILE_LIST_CREATE)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)