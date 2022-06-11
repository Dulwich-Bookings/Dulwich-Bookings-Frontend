import jwt_decode from 'jwt-decode';
import { Payload } from '@/modules/jwt/types';

export const decodeJwt = (accessToken: string) => {
  try {
    const payload = jwt_decode(accessToken) as Payload;
    return payload;
  } catch (err) {
    console.log(err);
    return { id: -1 } as Payload;
  }
};
