import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const envData = import.meta.env;
const redirectUri = envData.VITE_SPOTIFY_REDIRECT_URI;
const clientId = envData.VITE_SPOTIFY_CLIENT_ID;
const secret = envData.VITE_SPOTIFY_CLIENT_SECRET;
const scope =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";
const spotifyAuthURL = new URL("https://accounts.spotify.com/authorize");

const spotifyWebApi = SpotifyApi.withClientCredentials(clientId, secret, scope.split(" "));

const generateRandomString = (length: number) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const codeVerifier = generateRandomString(64);
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);

const params = {
  response_type: "code",
  client_id: clientId,
  scope,
  code_challenge_method: "S256",
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};

spotifyAuthURL.search = new URLSearchParams(params).toString();

export { spotifyAuthURL, spotifyWebApi };
