export interface GetStartedItem {
  text: string;
  iconName: string;
}

export interface Feature {
  title: string;
  description: string;
}

export const homeContent = {
  title: "Welcome to CSV File Manager",
  subtitle:
    "Simplify your CSV file management. Upload, view, and enrich your data effortlessly.",
  getStartedItems: [
    {
      text: "Navigate between different features",
      iconName: "ArrowRight",
    },
    { text: "Upload your CSV files for easy management", iconName: "Upload" },
    {
      text: "View your data in a tabular format",
      iconName: "Table",
    },
    {
      text: "Enrich your CSV files with external data sources",
      iconName: "Enrich",
    },
  ] as GetStartedItem[],
};
