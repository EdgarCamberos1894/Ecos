export interface FormData {
  tickets: {
    location: string;
    price: number;
  }[];
  name: string;
  category: string;
  type: "Single" | "Recurring";
  único?: string;
  recurrente?: string;
  dateString: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: File | null;
}
