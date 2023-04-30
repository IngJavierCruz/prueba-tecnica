export interface UserCredential {
  accessToken: string;
  user: User;
}

export interface User {
  id: number;
  nickname: string;
  email: string;
  lastName: string;
  name: string;
  typeUser: number;
};
