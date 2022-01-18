import Artist from './Artist.js';
import { picSizeUrl } from '@/utils/picture.js';

export default class Album {
  constructor(data) {
    this.id = '';
    this.name = '';
    this.picUrl = '';
    // this.artists = generateArtists(data.artists);
    // this.publishTime = generateDate(data.publishTime);
    // this.description = generateDes(data.description);

    if (data) {
      setAlbum(this, data);
    }
  }
}

function setAlbum(album, data) {
  album.id = data.id;
  album.name = data.name;
  album.picUrl = picSizeUrl(data.picUrl, 180);
}

function generateArtists(artists) {
  if (!artists || artists.length === 0) {
    return [];
  } else {
    return artists.map((item) => new Artist(item));
  }
}

function generateDate(time) {
  if (!time) return '';

  const date = new Date(time);
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDay();

  return `${Y}-${M}-${D}`;
}

function generateDes(des) {
  const description = des.split('\n').filter((item) => item != '');
  return description;
}
