export interface FormData {
  price: {
    puerta: number;
    locuras: number;
  };
  eventName: string;
  category: string;
  date: string;
  hour: string;
  location: string;
  description: string;
  image: File | null;
}
