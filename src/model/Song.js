import Artist from './Artist';
import Album from './Album';
import { picSizeUrl } from '../utils/picture';

export default class Song {
  constructor(data) {
    this.id = '';
    this.name = '';
    this.artists = [];
    this.album = new Album();
    this.duration = '';
    this.picUrl = '';
    this.url = '';
    this.playCount = 0;

    if (data) {
      setSong(this, data);
    }
  }
}

function setSong(song, data) {
  song.id = data.id;
  song.name = data.name;
  song.artists = createArtists(data.ar ?? data.artists);
  song.album = new Album(data.al ?? data.album);
  song.duration = formatDuration(data.dt ?? data.duration);
  song.picUrl = picSizeUrl((data.al ?? data.album).picUrl, 180);
  song.url = `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`;
}

function createArtists(ars) {
  return ars.map((ar) => new Artist(ar));
}

function addZero(num) {
  let ret = num;
  if (String(num).length === 1) {
    ret = '0' + num;
  }

  return ret;
}

function formatDuration(time) {
  let minute = ~~(time / 1000 / 60);
  let second = ~~((time - minute * 60 * 1000) / 1000);

  return addZero(minute) + ':' + addZero(second);
}
