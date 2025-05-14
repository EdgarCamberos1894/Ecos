export interface FormData {
  price: {
    puerta: number;
    locuras: number;
  };
  name: string;
  category: string;
  type: string;
  dateString: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: File | null;
}
