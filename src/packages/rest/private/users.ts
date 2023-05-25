import { Item } from '@/packages/common/types/item';
import { LocalStorageUtils } from '@/packages/common/utils';
import { ACCESS_TOKEN_KEY, API_URI } from '@/packages/env/constants';
import axios from 'axios';

const token = LocalStorageUtils.get(ACCESS_TOKEN_KEY);

export const depositApi = async (data: Item): Promise<any> => {
  try {
    const res = await axios.patch(`${API_URI}/users/deposit`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log('depositApi error: ', e);
    return null;
  }
};
