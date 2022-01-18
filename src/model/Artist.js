import { picSizeUrl } from '@/utils/picture.js';

export default class Artist {
  constructor(data) {
    this.id = '';
    this.name = '';
    this.accountId = '';
    this.musicSize = 0;
    this.mvSize = 0;
    this.picUrl = '';
    this.albumSize = '';
    this.fansCount = '';
    this.description = '';

    if (data) {
      setArtist(this, data);
    }
  }
}

function setArtist(artist, data) {
  artist.id = data.id;
  artist.name = data.name;
  artist.picUrl = picSizeUrl(data.cover ?? data.picUrl, 180);
  artist.accountId = data.accountId;
  artist.musicSize = data.musicSize;
  artist.mvSize = data.mvSize;
  artist.albumSize = data.albumSize;
  artist.fandsCount = data.fandsCount;
  artist.description = data.briefDesc;
}
