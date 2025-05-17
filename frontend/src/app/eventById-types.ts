interface Ticket {
  id: number;
  location: string;
  price: number;
}

export interface EventById {
  id: number;
  name: string;
  category: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: string;
  active: boolean;
  tickets: Ticket[];
  musicianId: number;
}
