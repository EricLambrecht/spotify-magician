export default {
  playlistImage: (state) => {
    if (!state.playlist || !state.playlist.images) {
      return './src/assets/logo.png';
    }
    return state.playlist.images[0].url;
  },
};
