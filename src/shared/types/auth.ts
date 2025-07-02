export interface LoginI {
  phone: string;
  password: string;
}

export interface TokenI {
  accessToken: string;
  refreshToken: string;
}

export enum Role {
  customer = 'CUSTOMER',
  seller = 'SELLER',
}
