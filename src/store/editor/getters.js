export default {
  playlistImage: (state) => {
    if (!state.playlist || !state.playlist.images) {
      return './src/assets/logo.png';
    }
    return state.playlist.images[0].url;
  },
  playlistName: (state) => {
    if (state.playlist) {
      return state.playlist.name;
    }
    return 'Choose playlist';
  },
};
