export default class Song {
  constructor(songData) {
    this.id = songData.id
    this.name = songData.name
    this.singer = filterSinger(songData.ar)
    this.album = songData.al.name
    this.duration = formatDuration(songData.dt)
    this.image = songData.al.picUrl
    this.url = `https://music.163.com/song/media/outer/url?id=${songData.id}.mp3`
  }
}

function filterSinger(singer) {
  const ret = []
  if (!singer) {
    return ret
  }
  singer.map(item => {
    ret.push(item.name)
  })
  return ret
}

function addZero(num) {
  let ret = num
  if (String(num).length === 1) {
    ret = '0' + num
  }

  return ret
}

function formatDuration(time) {
  let minute = ~~(time / 1000 / 60)
  let second = ~~((time - (minute * 60 * 1000)) / 1000)

  return addZero(minute) + ':' + addZero(second)
}