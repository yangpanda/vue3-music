import { picSizeUrl } from '../utils/picture';
import Artist from './Artist';

export default class Mv {
  constructor(data) {
    this.id = '';
    this.name = '';
    this.picUrl = '';
    this.playCount = 0;
    this.artists = [];
    this.artistId = '';
    this.artistName = '';

    if (data) {
      setMv(this, data);
    }
  }
}

function setMv(mv, data) {
  mv.id = data.id;
  mv.name = data.name;
  mv.picUrl = picSizeUrl(data.imgurl ?? data.picUrl ?? data.cover, 250, 140);
  mv.playCount = data.playCount;
  if (data.artists) {
    mv.artists = data.artists.map((item) => new Artist(item));
  }
  mv.artistId = data.artistId;
  mv.artistName = data.artistName;
}

export class RankMv extends Mv {
  constructor(data) {
    super(data);

    this.lastRank = 0;
    if (data) {
      setRankMv(this, data);
    }
  }
}

function setRankMv(mv, data) {
  mv.lastRank = data.lastRank;
}
