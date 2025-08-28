// /lib/users.ts
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const users: User[] = [];
