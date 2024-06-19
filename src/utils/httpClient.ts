import axios from "axios";
import { getSession } from "next-auth/react";

// export default axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
// });

// export const httpClientAuth = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
// });


const ApiClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  };
  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(
    async (config) => {
      const session: any = await getSession();
      if (session?.user) {
        config.headers["Authorization"] = `Bearer ${session?.user?.token}`;
      }
      return config;
    },
    (error) => {
      throw new Error(error.response.data.message);
    }
  );
  return instance;
};

export default ApiClient();
