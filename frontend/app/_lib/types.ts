export interface CSVFile {
  id: string;
  name: string;
}

export interface CSVData {
  headers: string[];
  rows: string[][];
}

export interface EnrichmentData {
  api_endpoint: string;
  key_column: string;
  api_key_name: string;
}
