class Song {
  constructor(song) {
    this.__name = song.name
    this.__id = song.id
    this.__artist = song.ar
    this.__album = song.al
    this.__duration = song.dt
    this.__picUrl = song.al.picUrl
    this.__url = ''
  }

  get name() {
    return this.__name
  }
  get id() {
    return this.__id
  }
  get artist() {
    return this.getArts(this.__artist)
  }
  get album() {
    return this.__album.name
  }
  get duration() {
    return this.formatSecond(this.__duration)
  }
  get picUrl() {
    return this.__picUrl
  }
  set url(value) {
    this.__url = value
  }
  get url() {
    return this.__url
  }

  getArts(artsArr) {
    let arts = [];
    for (let art of artsArr) {
      arts.push(art.name);
    }
    return arts.join(" & ");
  }

  formatSecond(time) {
    // 取整
    time = ~~time
    var secondTime
    if (time < 10) {
      secondTime = '00:0' + time
    } else if (time < 60) {
      secondTime = '00:' + time
    } else {
      var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      var s = ~~parseInt((time % (1000 * 60)) / 1000)
      secondTime = Number(m * 60 + s)
    }

    const minute = (secondTime / 60) | 0
    const second = secondTime % 60

    return minute + ':' + second
  }
}

export default Song
