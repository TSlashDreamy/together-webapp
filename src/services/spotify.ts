const envData = import.meta.env;

const spotifyRedirect = `https://accounts.spotify.com/authorize?client_id=${envData.VITE_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${envData.VITE_SPOTIFY_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
