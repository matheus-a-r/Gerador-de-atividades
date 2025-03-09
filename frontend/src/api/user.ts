import { ChangePassword } from "@/types";
import { api } from "./api";

import { UserFormState, SignInRequestData } from "../types"

import router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";

export async function signUpRequest(credentials: UserFormState) {
  try {
    return await api.post('/auth/register/user', credentials);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export async function signInRequest(credentials: SignInRequestData) {
  try {
    return await api.post('auth/login/user', credentials);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export async function logOut() {
  try {
    await api.post('auth/logout')
    destroyCookie(null, "nextauth.accessToken");
    destroyCookie(null, "nextauth.refreshToken");
    router.push("/");
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function getUser() {
  return await api.get('/users/user')
}

export async function forgotPasswordRequest(email: string) {
  try {
    const res = await api.post('/auth/request-password-reset', { email: email });
    return res;
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function changePasswordRequest(credentials: ChangePassword) {
  try {
    const { newPassword } = credentials
    return await api.put(`/auth/reset-password/${credentials.email}`, { password: newPassword })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const refreshToken = async () => {
  try {
    const { "nextauth.refreshToken": token } = parseCookies();
    const response = await api.post('/auth/refresh', { "refreshToken": token });
    if (response && response.status === 200) {
      setCookie(undefined, "nextauth.accessToken", response.data.newAccessToken);
    }
  } catch (err: any) {
    console.log(err);
    console.log(err.message);
  }
};

export async function getUserById(id: string) {
  return await api.get(`/users/id/${id}`)
}

export async function verifyCode(code: string) {
  try {
    return await api.put(`/auth/confirm/user/${code}`)
  } catch (error: any) {
    console.log(error.message);
  }
}
