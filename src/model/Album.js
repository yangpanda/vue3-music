import Artist from './Artist.js';

export default class Album {
  constructor(data) {
    this.id = data ? data.id : '';
    this.name = data ? data.name : '';
    this.artists = data ? generateArtists(data.artists) : [];
    this.publishTime = data ? generateDate(data.publishTime) : '';
    this.picUrl = data ? data.picUrl : '';
    this.description = data ? generateDes(data.description) : '';
  }
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
