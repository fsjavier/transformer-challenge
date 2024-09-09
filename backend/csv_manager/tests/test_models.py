from django.test import TestCase
from django.core.files import File
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

        with open('test_file.csv', 'w') as f:
            f.write('column1,column2\nvalue1,value2\nvalue3,value4')

        with open('test_file.csv', 'r') as f:
            csv_file = CSVFile(
                file=File(f, name='test_file.csv'),
                name="Test CSV File"
            )
            csv_file.save()

        self.assertEqual(str(csv_file), csv_file.name)
        csv_file.file.delete()

    def test_create_invalid_file_type(self):
        """
        Test creating a CSVFile with an invalid file type raises a ValidationError.
        """
        with open('test_file.xlsx', 'w') as f:
            f.write('column1,column2\nvalue1,value2\nvalue3,value4')

        with open('test_file.xlsx', 'r') as f:
            csv_file = CSVFile(
                file=File(f, name='test_file.xlsx'),
                name="Test Text File"
            )
            csv_file.save()

        self.assertRaises(ValidationError)
        csv_file.file.delete()
