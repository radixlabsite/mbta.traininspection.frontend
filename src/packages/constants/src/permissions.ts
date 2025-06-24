import { UserRoles } from "./userRoles";

export const hasRole = (userRoles: string[], role: UserRoles): boolean => {
  return userRoles.includes(role);
};

export const hasAnyRole = (
  userRoles: string[],
  roles: UserRoles[]
): boolean => {
  return roles.some((role) => userRoles.includes(role));
};
