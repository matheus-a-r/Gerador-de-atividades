import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { refreshToken } from "./user";

export const api = axios.create({
    baseURL: "http://localhost:3001"
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const { data } = error.response;

      if (data.message === "Credenciais inválidas." || data.message === "Email não cadastrado.") {
        throw new Error(data.message);
      } else if (data.message === "Refresh token inválido" || data.message === "Token inválido ou expirado") {
        destroyCookie(null, "nextauth.accessToken");
        destroyCookie(null, "nextauth.refreshToken");

        if (typeof window !== "undefined") {
            window.location.href = "/";
        }

        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            await refreshToken();
            const { 'nextauth.accessToken': newToken } = parseCookies();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            resolve(axios(originalRequest));
          } catch (err) {
            processQueue(err, null);
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }
    }

    else if(error.response.status === 400){
      const { data } = error.response;
      if (data.message === "Refresh token inválido") {
        destroyCookie(null, "nextauth.accessToken");
        destroyCookie(null, "nextauth.refreshToken");

        if (typeof window !== "undefined") {
            window.location.href = "/";
        }

        return Promise.reject(error);
      }

      if(data.message = "Invalid or expired token."){
          if (!originalRequest._retry) {
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return axios(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }
    
            originalRequest._retry = true;
            isRefreshing = true;
    
            return new Promise(async (resolve, reject) => {
              try {
                await refreshToken();
                const { 'nextauth.accessToken': newToken } = parseCookies();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                resolve(axios(originalRequest));
              } catch (err) {
                processQueue(err, null);
                reject(err);
              } finally {
                isRefreshing = false;
              }
            });
          }
        }
      }
      
    return Promise.reject(error.response.data);
  }
);


api.interceptors.request.use(config => {
  const { 'nextauth.accessToken': token } = parseCookies();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config)
  return config
})


