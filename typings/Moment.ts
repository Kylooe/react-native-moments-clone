import type { User } from './User';

export type Photo = {
  id: string;
  thumbnail: string;
  src: string;
  aspectRatio?: number;
}

export type Moment = {
  user: User,
  content?: string;
  photos?: Photo[];
  createdAt: string;
};
