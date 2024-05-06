import { FC, useCallback } from "react";

import Button from "~/components/button";
import PageWrapper from "~/components/page-wrapper";
import StatusChip from "~/components/status-chip";
import Switch from "~/components/switch";
import Typography from "~/components/typography";
import SectionWrapper from "./section-wrapper";

import { useConfig } from "~/hooks/useConfig";

import { codeVerifier, spotifyRedirect } from "~/services/spotify";
import * as S from "./styles";
import { spotifyInitialState } from "~/services/constants";
import { IAppServices } from "~/services/types";

const SettingsPage: FC = () => {
  const { appearance, services, updateAppConfig } = useConfig();
  const handleSpotify = useCallback(() => {
    if (services.spotify.access_token) {
      updateAppConfig({ spotify: spotifyInitialState } as IAppServices);
    } else {
      window.localStorage.setItem("spotify_code_verifier", codeVerifier);
      window.location.href = spotifyRedirect.toString();
    }
  }, [services.spotify.access_token, updateAppConfig]);

  return (
    <PageWrapper>
      <Typography.H1>App Settings</Typography.H1>
      <div className={S.wrapper}>
        <SectionWrapper name="Appearance">
          <div className={S.option}>
            <Typography.SPAN>Show floating objects in background (Cubes etc.)</Typography.SPAN>
            <Switch
              onChange={() => updateAppConfig({ floatingObjects: !appearance.floatingObjects })}
              checked={appearance.floatingObjects}
            />
          </div>
        </SectionWrapper>
        <SectionWrapper name="Spotify">
          <div className={S.option}>
            <StatusChip status={services.spotify.status} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary danger={Boolean(services.spotify.access_token)} onClick={handleSpotify}>
              {services.spotify.access_token ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </SectionWrapper>
        <SectionWrapper name="SoundCloud">
          <div className={S.option}>
            <StatusChip status={services.soundCloud.status} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>{services.soundCloud.token ? "Disconnect" : "Connect"}</Button>
          </div>
        </SectionWrapper>
        <SectionWrapper name="YouTube">
          <div className={S.option}>
            <StatusChip status={services.youTube.status} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>{services.youTube.token ? "Disconnect" : "Connect"}</Button>
          </div>
        </SectionWrapper>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
