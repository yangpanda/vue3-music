export default class Artist {
  constructor(data) {
    this.id = data ? data.id : ''
    this.accountId = data ? data.accountId : ''
    this.name = data ? data.name : ''
    this.musicSize = data ? data.musicSize : ''
    this.mvSize = data ? data.mvSize : ''
    this.cover = data ? data.cover ?? data.picUrl : ''
    this.albumSize = data ? data.albumSize : ''
    this.fansCount = data ? data.fansCount : ''
    this.description = data ? data.briefDesc : ''
  }
}
