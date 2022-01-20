import { setUser, User } from './User';
import { picSizeUrl } from '@/utils/picture.js';

export default class PlayList {
  constructor(data) {
    this.id = '';
    this.name = '';
    this.picUrl = '';
    this.playCount = 0;
    this.trackCount = 0;
    this.tags = [];
    this.description = '';
    this.creator = new User();
    this.trackIds = [];
    this.subscribers = [];

    if (data) {
      setPlayList(this, data);
    }
  }
}

function setPlayList(playList, data) {
  playList.id = data.id;
  playList.name = data.name;
  playList.picUrl = picSizeUrl(data.picUrl ?? data.coverImgUrl, 180);
  playList.playCount = data.playCount;
  playList.trackCount = data.trackCount;
  playList.tags = data.tags;
  playList.description = data.description;
  if (data.creator) {
    setUser(playList.creator, data.creator);
  }
  if (data.trackIds) {
    playList.trackIds = data.trackIds.map((item) => item.id);
  }
  if (data.subscribers) {
    playList.subscribers = data.subscribers.map((item) => new User(item));
  }
}
