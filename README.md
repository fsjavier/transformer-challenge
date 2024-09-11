# Adverity Full-stack challenge

Full-stack web application that allows users to upload, view, and enrich CSV files with data from external APIs.

## Running the app

1. Start the application using Docker Compose:

   ```
   docker-compose up
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Swagger API Docs: http://localhost:8000/api/docs/

## App requirements

### Requirement #1

_As a user I need to upload `.csv` file and be able to preview its content in a table_

Please use `users_posts_audience.csv` file for testing, it contains users' posts views data

### Requirement #2

_As a user I would like to see the list of all files I've uploaded, so I can choose the file I want to preview_

### Requirement #3

_As a user I would like to enrich my data file with additional details fetched from API endpoint_

- User should be able to input API endpoint for fetching external data, you can use following endpoints for testing:
  https://jsonplaceholder.typicode.com/posts/, https://jsonplaceholder.typicode.com/users/
- User should be able to select key column name from data file that would be used for joining data, by default first column should be pre-selected
- User should be able to input key name for API response that would be used for the other side of join
- Based on selected keys, enriching should add all keys from the API response for each matching row as new columns
- Enriching existing file should create a new file accessible in the listing from **Requirement #2**, original file should not be modified

## Features

- Upload CSV files
- View a list of uploaded files
- Preview CSV file contents in a tabular format
- Enrich CSV files with data from external APIs
- Responsive design for desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js (React), TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Database**: PostgreSQL
- **Task Queue**: Celery with Redis
- **Containerization**: Docker

## Future Improvements

Due to time constraints, not all desired features have been implemented. Among the features planned for future iterations are:

- Set up external storage for CSV files (e.g., AWS S3 or Azure Blob Storage)
- Implement authentication and permissions system
- Add a detailed view for individual CSV files
- Enable file deletion functionality
- Allow editing of column names and file names
- Implement pagination / lazy loading for large CSV files in the preview
- Implement pagination / lazy loading for the list of uploaded files
- Implement detailed updates for long-running enrichment tasks
- Add export functionality for enriched CSV files
- Implement a more robust error handling and logging system
- Improve unit test coverage and add e2e tests
- Prepare for production deployment
