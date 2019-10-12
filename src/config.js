const config = {
  backend: {
    host: 'https://europe-west2-spotify-magician.cloudfunctions.net',
  },
  spotify: {
    client_id: 'dc57243b2f564609beb31f87954380b6',
    scopes: [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
    ],
  },
};

export default config;
