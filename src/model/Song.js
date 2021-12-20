import Artist from './Artist.js';

export default class Song {
  constructor(songData) {
    this.id = songData.id;
    this.name = songData.name;
    this.singer = filterSinger(songData.ar ?? songData.artists);
    this.album = songData.al ?? songData.album;
    this.duration = formatDuration(songData.dt ?? songData.duration);
    this.image = (songData.al ?? songData.album).picUrl;
    this.url = `https://music.163.com/song/media/outer/url?id=${songData.id}.mp3`;
  }
}

function filterSinger(singer) {
  if (!singer) {
    return [];
  }
  return singer.map((item) => new Artist(item));
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
