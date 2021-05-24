import { AuthInput } from './../../models/auth-input.model';

export const loginControlData: AuthInput[] = [
  {
    controlName: 'email',
    icon: 'email',
    type: 'email',
  },
  {
    controlName: 'password',
    icon: 'lock',
    type: 'password',
  },
];

export const registerControlData: AuthInput[] = [
  {
    controlName: 'username',
    icon: 'account_circle',
    type: 'text',
  },
  ...loginControlData,
  {
    controlName: 'bio',
    icon: 'info',
    type: 'text',
  },
];
