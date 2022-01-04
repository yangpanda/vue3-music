import { shuffle } from 'lodash';

export const PlayMode = {
  sequence: 0,
  listLoop: 1,
  singleLoop: 2,
  random: 3,
};

const player = {
  namespaced: true,
  state: () => ({
    playing: false,
    playMode: PlayMode.sequence,
    currentIndex: -1,
    playList: [],
    randomPlayList: [],
    playingPageDisplayStatus: false,
  }),
  mutations: {
    togglePlayMode(state) {
      if (state.playMode != PlayMode.random) {
        state.playMode += 1;
      } else {
        state.playMode = PlayMode.sequence;
      }
    },
    togglePlayingPage(state) {
      state.playingPageDisplayStatus = !state.playingPageDisplayStatus;
    },
    hidePlayingPage(state) {
      state.playingPageDisplayStatus = false;
    },
    setPlayList(state, list) {
      state.playList = list;
    },
    setRandomPlayList(state) {
      const indexArr = [...Array(state.playList.length).keys()];
      state.randomPlayList = shuffle(indexArr);
    },
    setPlaying(state, flag) {
      state.playing = flag;
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    nextTrack(state) {
      switch (state.playMode) {
        case PlayMode.singleLoop:
        case PlayMode.listLoop:
        case PlayMode.sequence: {
          if (state.currentIndex + 1 === state.playList.length) {
            state.currentIndex = 0;
          } else {
            state.currentIndex += 1;
          }
          break;
        }
        case PlayMode.random: {
          const index = state.randomPlayList.indexOf(state.currentIndex);
          if (index === state.randomPlayList.length - 1) {
            state.currentIndex = state.randomPlayList[0];
          } else {
            state.currentIndex = state.randomPlayList[index + 1];
          }
          break;
        }
      }
    },
    preTrack(state) {
      switch (state.playMode) {
        case PlayMode.singleLoop:
        case PlayMode.listLoop:
        case PlayMode.sequence: {
          if (state.currentIndex === 0) {
            state.currentIndex = state.playList.length - 1;
          } else {
            state.currentIndex -= 1;
          }
          break;
        }
        case PlayMode.random: {
          const index = state.randomPlayList.indexOf(state.currentIndex);
          if (index === 0) {
            state.currentIndex = state.randomPlayList[state.randomPlayList.length - 1];
          } else {
            state.currentIndex = state.randomPlayList[index - 1];
          }
          break;
        }
      }
    },
  },
  getters: {
    currentSong(state) {
      return state.playList[state.currentIndex] || {};
    },
    reachEnd(state) {
      return state.playList.length - 1 === state.currentIndex;
    },
  },
};

export default player;
