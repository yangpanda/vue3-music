

export default async playSong(song) {
    const res = await fetchSongUrl(song.id)
    song.url = res.data[0].url
    this.$store.commit("setCurrentSong", song)
}