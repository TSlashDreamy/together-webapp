import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { PiSoundcloudLogoFill as SoundCloudIcon } from "react-icons/pi";
import { FaYoutube as YoutubeIcon } from "react-icons/fa";

import { Services } from "~/types";

export const services = {
    Spotify: { name: Services.Spotify, Icon: SpotifyIcon },
    SoundCloud: { name: Services.SoundCloud, Icon: SoundCloudIcon },
    YouTube: { name: Services.YouTube, Icon: YoutubeIcon },
}