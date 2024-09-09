from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from csv_manager.models import CSVFile

class CSVFileModelTest(TestCase):
    """
    Test cases for the CSVFile model.
    """

    def test_create_valid_csv_file(self):
        """
        Test creating a CSVFile with a valid CSV file is successful.
        """
        csv_content = 'column1,column2\nvalue1,value2\nvalue3,value4'
        csv_file = SimpleUploadedFile(
            name="test_file.csv",
            content=csv_content.encode('utf-8'),
            content_type="text/csv"
        )

        csv_model = CSVFile.objects.create(
            file=csv_file,
            name="Test CSV File"
        )

        self.assertEqual(str(csv_model), csv_model.name)
        self.assertTrue(csv_model.file.name.endswith('test_file.csv'))

    def test_create_invalid_file_type(self):
        """
        Test creating a CSVFile with an invalid file type raises a ValidationError.
        """
        txt_content = 'column1,column2\nvalue1,value2\nvalue3,value4'
        txt_file = SimpleUploadedFile(
            name="test_file.txt",
            content=txt_content.encode('utf-8'),
            content_type="text/plain"
        )

        txt_file = CSVFile.objects.create(
            file=txt_file,
            name="Test Not CSV File"
        )

        self.assertRaises(ValidationError)
