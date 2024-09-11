import csv
import io
import requests
from celery import shared_task
from .models import CSVFile


@shared_task
def enrich_csv(file_id, api_endpoint, key_column, api_key_name):
    """
    Enrich a CSV file with data from an external API.
    Reads the CSV file, fetches data from the API, enriches the data,
    and saves the enriched file.
    """
    try:
        csv_file = CSVFile.objects.get(id=file_id)

        with csv_file.file.open('r') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
            fieldnames = reader.fieldnames

        response = requests.get(api_endpoint)
        api_data = response.json()

        if not api_data or api_key_name not in api_data[0]:
            raise ValueError(
                f"The API key '{api_key_name}' is not present in the API response."
            )

        api_lookup = {str(item[api_key_name]): item for item in api_data}

        new_fieldnames = set()
        for row in rows:
            key_value = row[key_column]
            if key_value in api_lookup:
                api_item = api_lookup[key_value]
                for key, value in api_item.items():
                    new_key = f"api_{key}"
                    row[new_key] = str(value)
                    new_fieldnames.add(new_key)

        all_fieldnames = fieldnames + list(new_fieldnames)
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=all_fieldnames)
        writer.writeheader()
        writer.writerows(rows)

        enriched_file_name = f"enriched_{csv_file.name}"
        enriched_file = CSVFile(name=enriched_file_name)
        enriched_file.file.save(
            enriched_file_name,
            io.BytesIO(output.getvalue().encode())
        )
        enriched_file.save()

        return enriched_file.id
    except Exception:
        raise
