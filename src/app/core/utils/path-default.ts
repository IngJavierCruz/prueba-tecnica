import { PATH_DEFAULT_USER, TYPE_USER } from "@constants/TypeUser";

export const redirectByTypeUserTo = (typeUser: number) => {
  switch (typeUser) {
    case TYPE_USER.admin:
      return PATH_DEFAULT_USER.admin
    case TYPE_USER.client:
      return PATH_DEFAULT_USER.client
    default:
      return '';
  }
}