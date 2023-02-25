import { UserLogin } from "@/packages/common/types/auth";
import { API_URI } from "@/packages/env/constants";
import axios from "axios";

export const loginApi = async (data: UserLogin): Promise<any> => {
  try {
    const res = await axios.post(`${API_URI}/auth/login`, data);
    return res.data;
  } catch (e) {
    console.log("User login error:", e);
    return null;
  }
};

export const registerApi = async (data: UserLogin) => {
  try {
    const res = await axios.post(`${API_URI}/auth/register`, data);
    return res.data;
  } catch (e) {
    console.log("User regiester error:", e);
    return null;
  }
};
