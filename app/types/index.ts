import {
  User,
  Listing,
  Reservation,
  Review,
  Chat,
  Message,
} from "@prisma/client";

export type SafeReservation = Reservation & {
  listing: Listing;
  user: User;
};

export type SafeReview = Review & {
  user: User;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type ChatType = Chat & {
  users: User[];
  messages: FullMessageType[];
};
