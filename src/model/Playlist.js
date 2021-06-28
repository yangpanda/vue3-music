class Playlist {
    constructor(playlist) {
        this.__id = playlist.id
        this.__name = playlist.name
        this.__picUrl = playlist.picUrl
        this.__playCount = playlist.playCount
        this.__trackCount = playlist.trackCount
        this.__coverImgUrl = playlist.coverImgUrl
        this.__trackIds = playlist.trackIds
        this.__tags = playlist.tags
        this.__description = playlist.description
        this.__creator = playlist.creator
    }

    get imgUrl() {
        return this.__picUrl ?? this.__coverImgUrl
    }
    get name() {
        return this.__name
    }

    get id() {
        return this.__id
    }

    get playCount() {
        return this.__playCount
    }
    get trackIds() {
        return this.__trackIds
    }
    get tags() {
        return this.__tags.join('/')
    }
    get description() {
        return this.__description
    }
    get creator() {
        return this.__creator
    }
    get trackCount() {
        return this.__trackCount
    }
    get avatarUrl() {
        return this.__creator.avatarUrl
    }
    get creatorName() {
        return this.__creator.nickname
    }
}

export default Playlist