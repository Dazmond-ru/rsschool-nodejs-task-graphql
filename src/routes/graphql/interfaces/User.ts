interface UserSubscribedTo {
  subscriberId: string;
  authorId: string;
}

interface SubscribedToUser {
  subscriberId: string;
  authorId: string;
};

export interface User {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: UserSubscribedTo[];
  subscribedToUser?: SubscribedToUser[];
}
