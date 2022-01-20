import * as album from './service/album';
import * as artist from './service/artist';
import * as banner from './service/banner';
import * as comment from './service/comment';
import * as mv from './service/mv';
import * as playlist from './service/playlist';
import * as song from './service/song';

export default {
  ...album,
  ...artist,
  ...banner,
  ...comment,
  ...mv,
  ...playlist,
  ...song,
};
