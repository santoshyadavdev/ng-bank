export interface User {
  $id: string;
  name: string;
  password: string;
  email: string;
  userId?: string;
  hash?: string;
  registration?: string;
  status?: boolean;
  labels?: string;
  passwordUpdate?: string;
  phone?: string;
  emailVerification?: boolean;
  phoneVerification?: boolean;
  prefs?: Prefs;
  accessedAt?: string;
}

export interface Prefs {
  theme: string;
  timezone: string;
}
