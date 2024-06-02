export type Moment = {
  user: {
    name: string;
    id: string;
    avatar: string;
  },
  content?: string;
  photos?: {
    id: string;
    thumbnail: string;
    src: string;
  }[];
  createdAt: string;
};
