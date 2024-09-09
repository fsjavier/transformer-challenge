from rest_framework import serializers
from .models import CSVFile

class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = ['id', 'file', 'name', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']