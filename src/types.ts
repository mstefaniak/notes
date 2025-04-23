export interface User {
    birthdate: number; // timestamp
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    location: Record<string, string>;
    phone_number: string;
    title: string;
    username: string;
  }

  export interface Note {
    id: number
    body: string
  }
  