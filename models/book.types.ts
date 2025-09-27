export interface IBook {
  title: string;
  author: string;
  collection: "SGBC Library" | "GTS";
  category: string;
  description?: string;
  borrowTimes: number;
  ISBN: string;
  availableCopies: number;
  copies: number;
  publisher: string;
  imageURL?: string;
  createdAt: Date;
  updatedAt: Date;
}
