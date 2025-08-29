import { ComponentType, ReactNode } from "react";

export type { ISendOtp, IVerifyOtp, ILogin,ForgotPasswordPayload,ResetPasswordPayload,ChangePasswordBody,ChangePasswordResponse } from "./auth.type";


export type { IsActive, IWallet, IUser, IPaginatedMeta, ApiEnvelope, GetUserQuery, UserListResponse, UpdateMePayload , UpdateMeResponse} from "@/types/user.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface IProps {
  children: ReactNode;
}
