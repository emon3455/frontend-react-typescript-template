export interface ISendOtp {
  email: string;
  purpose: "verify_email" | "reset_password" | "2fa" | string;
}

export interface IVerifyOtp {
  email: string;
  code: string;
  purpose: "verify_email" | "reset_password" | "2fa" | string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type ForgotPasswordPayload = { email: string };
export type ResetPasswordPayload = { id: string; token: string; password: string };

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
};