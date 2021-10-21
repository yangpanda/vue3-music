export default class User {
  constructor(data) {
    this.id = data.userId ?? ''
    this.nickname = data.nickname ?? ''
    this.avatar = data.avatarUrl ?? ''
  }
}
