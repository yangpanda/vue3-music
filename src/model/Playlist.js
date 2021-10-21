class Playlist {
  constructor(data) {
    this.id = data ? data.id : ''
    this.name = data ? data.name : ''
    this.picUrl = data ? data.picUrl : ''
    this.playCount = data ? data.playCount : ''
    this.trackCount = data ? data.trackCount : ''
    this.coverImgUrl = data ? data.coverImgUrl : ''
    this.trackIds = data ? data.trackIds : []
    this.tags = data ? data.tags : []
    this.description = data ? data.description : ''
    this.creator = data ? data.creator : {},
    this.subscribed = data ? data.subscribed : null
  }

  get imgUrl() {
    return this.picUrl ?? this.coverImgUrl
  }
  get avatarUrl() {
    return this.creator.avatarUrl
  }
  get creatorName() {
    return this.creator.nickname
  }
}

export default Playlist
