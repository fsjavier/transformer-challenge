from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from csv_manager.serializers import CSVFileSerializer


def create_csv_file(content):
    csv_file = SimpleUploadedFile(
        name="test_file.csv",
        content=content.encode('utf-8'),
        content_type="text/csv"
    )
    return csv_file


class CSVFileSerializerTest(TestCase):
    """Test the CSVFileSerializer."""
    def test_valid_csv_file(self):
        """Test a valid CSV file."""
        csv_content = 'header1,header2\nvalue1,value2\nvalue3,value4'
        csv_file = create_csv_file(csv_content)
        serializer = CSVFileSerializer(
            data={'file': csv_file, 'name': 'Valid CSV'}
        )
        self.assertTrue(serializer.is_valid())

    def test_empty_file(self):
        """Test an empty file."""
        empty_file = create_csv_file('')
        serializer = CSVFileSerializer(
            data={'file': empty_file, 'name': 'Empty CSV'}
        )
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors['file'],
            ['The submitted file is empty.']
        )

    def test_file_without_header(self):
        """Test a file without a header."""
        no_header_content = '\nvalue1,value2\nvalue3,value4'
        no_header_file = create_csv_file(no_header_content)
        serializer = CSVFileSerializer(
            data={'file': no_header_file, 'name': 'No Header CSV'}
        )
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors['file'],
            ['The CSV file must have a non-empty header row.']
        )

    def test_file_with_only_header(self):
        """Test a file with only a header."""
        only_header_content = 'header1,header2'
        only_header_file = create_csv_file(only_header_content)
        serializer = CSVFileSerializer(
            data={'file': only_header_file, 'name': 'Only Header CSV'}
        )
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors['file'],
            ['The CSV file must contain at least one data row.']
        )
