from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status
from csv_manager.models import CSVFile

URL_CSV_FILE_LIST_CREATE = reverse('csv_manager:csv_file_list_create')

def get_url_csv_file_headers(csv_file_id):
    return reverse('csv_manager:csv_file_headers', args=[csv_file_id])

def get_url_csv_file_content(csv_file_id):
    return reverse('csv_manager:csv_file_content', args=[csv_file_id])

def create_csv_file():
    csv_content = 'column1,column2\nvalue1,value2\nvalue3,value4'
    csv_file = SimpleUploadedFile(
        name="test_file.csv",
        content=csv_content.encode('utf-8'),
        content_type="text/csv"
    )
    return csv_file

class CSVFileViewsTest(TestCase):
    """Test the CSVFile views."""
    def setUp(self):
        self.client = APIClient()

    def test_upload_csv_view(self):
        """
        Test the CSV upload view.
        """
        csv_file = create_csv_file()
        response = self.client.post(
            URL_CSV_FILE_LIST_CREATE,
            {
                'file': csv_file,
                'name': 'Test CSV File'
            },
            format='multipart'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(CSVFile.objects.filter(name='Test CSV File').exists())

    def test_csv_list_view(self):
        """
        Test the CSV list view.
        """
        csv_file = create_csv_file()
        csv_object = CSVFile.objects.create(
            file=csv_file,
            name="Test CSV File"
        )
        response = self.client.get(URL_CSV_FILE_LIST_CREATE)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_csv_headers_view(self):
        """
        Test the CSV headers view.
        """
        csv_file = create_csv_file()
        csv_object = CSVFile.objects.create(
            file=csv_file,
            name="Test CSV File"
        )
        url = get_url_csv_file_headers(csv_object.id)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('headers', response.data)
        self.assertEqual(response.data['headers'], ['column1', 'column2'])

    def test_csv_content_view(self):
        """
        Test the CSV content view.
        """
        csv_file = create_csv_file()
        csv_object = CSVFile.objects.create(
            file=csv_file,
            name="Test CSV File"
        )
        url = get_url_csv_file_content(csv_object.id)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('rows', response.data)
        self.assertEqual(response.data['rows'], [['value1', 'value2'], ['value3', 'value4']])
