from django.db import models
from django.core.validators import FileExtensionValidator

class CSVFile(models.Model):
    """
    Model representing a CSV file.
    """
    file = models.FileField(upload_to='csv_files/', validators=[FileExtensionValidator(['csv'])])
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name