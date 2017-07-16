import {
  CHANGE_AUTH
} from './types';

export function authenticate(isLoggesIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggesIn
  };
}
