import { ACCESS_TOKEN_KEY } from "@/packages/common/constants";
import { Item } from "@/packages/common/types/item";
import { LocalStorageUtils } from "@/packages/common/utils";
import { API_URI } from "@/packages/env/constants";
import axios from "axios";

const token = LocalStorageUtils.get(ACCESS_TOKEN_KEY);

export const getListItemApi = async (): Promise<any> => {
  try {
    const res = await axios.get(`${API_URI}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("getListItemApi error: ", e);
    return null;
  }
};

export const createItemApi = async (data: Item): Promise<any> => {
  try {
    const res = await axios.post(`${API_URI}/items`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("createItemApi error: ", e);
    return null;
  }
};

export const publishItemApi = async (idItem: number): Promise<any> => {
  try {
    const res = await axios.patch(`${API_URI}/items/${idItem}/publish`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("publishItemApi error: ", e);
    return null;
  }
};
