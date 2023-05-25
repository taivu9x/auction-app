import { Item, TypeFilter } from '@/packages/common/types/item';
import { LocalStorageUtils } from '@/packages/common/utils';
import { ACCESS_TOKEN_KEY, API_URI } from '@/packages/env/constants';
import axios from 'axios';

const token = LocalStorageUtils.get(ACCESS_TOKEN_KEY);

export const getListItemApi = async (type?: TypeFilter): Promise<Item[]> => {
  const res = await axios.get(`${API_URI}/items`, {
    params: {
      type,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createItemApi = async (data: Item): Promise<Item> => {
  const res = await axios.post(`${API_URI}/items`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const publishItemApi = async (idItem: number): Promise<any> => {
  const res = await axios.patch(
    `${API_URI}/items/${idItem}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const bidItemApi = async (idItem: number, data: { amount: number }): Promise<any> => {
  const res = await axios.patch(`${API_URI}/items/${idItem}/bid`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
