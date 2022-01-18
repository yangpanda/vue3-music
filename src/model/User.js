import { picSizeUrl } from '@/utils/picture.js';

export class User {
  constructor(data) {
    this.id = '';
    this.avatarUrl = '';
    this.nickname = '';
    this.signature = '';

    if (data) {
      setUser(this, data);
    }
  }
}

export function setUser(user, data) {
  user.id = data.userId;
  user.nickname = data.nickname;
  user.avatarUrl = picSizeUrl(data.avatarUrl, 100);
  user.signature = data.signature;
}
