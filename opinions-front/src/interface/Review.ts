import { User } from "./User";

export interface Review {
    id: number;
    streaming_id: number;
    streaming_type: string;
    user: User | null;
    created: string | null;
    rate: number;
    title: string | null;
    description: string | null;
  }
  