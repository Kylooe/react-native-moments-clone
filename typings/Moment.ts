export type Photo = {
  id: string;
  thumbnail: string;
  src: string;
  aspectRatio?: number;
}

export type Moment = {
  user: {
    name: string;
    id: string;
    avatar: string;
  },
  content?: string;
  photos?: Photo[];
  createdAt: string;
};
