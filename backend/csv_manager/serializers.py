import csv
from io import StringIO
from rest_framework import serializers
from .models import CSVFile


class CSVFileSerializer(serializers.ModelSerializer):
    """Serializer for the CSVFile model."""
    class Meta:
        model = CSVFile
        fields = ['id', 'file', 'name', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']

    def validate_file(self, value):
        """Validate the file field."""
        if value.size == 0:
            raise serializers.ValidationError("The uploaded file is empty.")

        file_content = value.read().decode('utf-8')
        csv_reader = csv.reader(StringIO(file_content))

        header = next(csv_reader, None)

        if not header or all(cell.strip() == '' for cell in header):
            raise serializers.ValidationError(
                "The CSV file must have a non-empty header row."
            )

        first_row = next(csv_reader, None)
        if not first_row:
            raise serializers.ValidationError(
                "The CSV file must contain at least one data row."
            )

        return value
