import { Item, TypeFilter } from '@/packages/common/types/item';
import { LocalStorageUtils } from '@/packages/common/utils';
import { ACCESS_TOKEN_KEY, API_URI } from '@/packages/env/constants';
import { RestApis } from '../apis';

const token = LocalStorageUtils.get(ACCESS_TOKEN_KEY);

export const getListItemApi = async (type?: TypeFilter): Promise<Item[]> => {
  return RestApis.get(`${API_URI}/items`, {
    params: {
      type,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createItemApi = async (data: Item): Promise<Item> => {
  return RestApis.post(`${API_URI}/items`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const publishItemApi = async (idItem: number): Promise<any> => {
  return RestApis.patch(
    `${API_URI}/items/${idItem}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const bidItemApi = async (idItem: number, data: { amount: number }): Promise<any> => {
  return RestApis.patch(`${API_URI}/items/${idItem}/bid`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
