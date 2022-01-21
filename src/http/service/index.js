import * as album from './album.js';
import * as artist from './artist.js';
import * as banner from './banner.js';
import * as comment from './comment.js';
import * as mv from './mv.js';
import * as playlist from './playlist.js';
import * as song from './song.js';
import * as user from './user.js';
import * as search from './search.js';
import * as subscription from './subscription.js';

export default {
  album,
  artist,
  banner,
  comment,
  mv,
  playlist,
  song,
  user,
  search,
  subscription,
  ...album,
};
