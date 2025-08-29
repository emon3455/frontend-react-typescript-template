import { TRole } from ".";

export type IsActive = "ACTIVE" | "PENDING" | "BLOCKED" | "SUSPENDED";

export interface IWallet {
  _id?: string;
  user?: string;
  balance?: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: TRole;
  isActive: IsActive;
  isVerified?: boolean;
  picture?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  wallet?: IWallet;
}

export interface IPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export type ApiEnvelope<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IPaginatedMeta;
};

export type GetUserQuery = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: IsActive | "ALL";
  role?: string;
  sortBy?: "createdAt" | "name" | "email" | "isActive";
  sortOrder?: "asc" | "desc";
};

export type UserListResponse = {
  data: IUser[];
  meta: IPaginatedMeta;
};

export type UpdateMePayload = Partial<
  Pick<IUser, "name" | "email" | "phone" | "picture" | "address">
> & { password?: string };

export type UpdateMeResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
};