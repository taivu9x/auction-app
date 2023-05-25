import { CookiesUtils } from '@/common/utils/cookies';
import { ACCESS_TOKEN_KEY } from '@/env/constants';

export const useAuth = () => {
  return {
    isAuthenticated: CookiesUtils.get(ACCESS_TOKEN_KEY) !== '',
    logout: () => {
      CookiesUtils.remove(ACCESS_TOKEN_KEY);
      location.href = '/login';
    },
  };
};
