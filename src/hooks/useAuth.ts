import Cookies from 'js-cookie';
import { useState } from 'react';

export const useAuth = (): { isAuthenticated: boolean } => {
  const [isAuthenticated] = useState(() => {
    const accessToken = Cookies.get('access_token');
    return !!accessToken;
  });

  return { isAuthenticated };
};
