export interface CSVFile {
  id: string;
  name: string;
}

export interface CSVData {
  headers: string[];
  rows: string[][];
}
