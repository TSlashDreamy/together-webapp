import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Button from "~/components/button";
import PageWrapper from "~/components/page-wrapper";
import StatusChip from "~/components/status-chip";
import Switch from "~/components/switch";
import Typography from "~/components/typography";
import SectionWrapper from "./section-wrapper";
import Modal from "~/components/modal";

import { useConfig } from "~/hooks/useConfig";
import { useModal } from "~/hooks/useModal";

import { codeVerifier, spotifyAuthURL } from "~/services/spotify";
import { ServiceStatus, spotifyInitialState } from "~/services/constants";
import { IAppServices } from "~/services/types";
import { resetApp } from "./utils";
import { routes } from "~/router/constants";
import { ModalType } from "~/constants";
import * as S from "./styles";

const SettingsPage: FC = () => {
  const { isOpen, showModal, hideModal } = useModal();
  const navigate = useNavigate();
  const { appearance, services, updateAppConfig } = useConfig();
  const handleSpotify = useCallback(() => {
    if (services.spotify.access_token) {
      updateAppConfig({ spotify: spotifyInitialState } as IAppServices);
    } else {
      window.localStorage.setItem("spotify_code_verifier", codeVerifier);
      window.location.href = spotifyAuthURL.toString();
    }
  }, [services.spotify.access_token, updateAppConfig]);

  const handleReset = useCallback(() => {
    function redirect() {
      navigate(routes.landing.main);
    }
    resetApp(redirect);
  }, [navigate]);

  return (
    <PageWrapper>
      <Modal
        isOpen={isOpen}
        modalType={ModalType.CONFIRM}
        modalProps={{
          message: "This action will disconnect all your services and will fully reset the app.",
          onCancel: hideModal,
          onConfirm: handleReset,
        }}
      />
      <Typography.H1>App Settings</Typography.H1>
      <div className={S.wrapper}>
        <SectionWrapper name="Appearance">
          <div className={S.option}>
            <Typography.SPAN>Show floating objects in background (Cubes etc.)</Typography.SPAN>
            <Switch onChange={() => updateAppConfig({ floatingObjects: !appearance.floatingObjects })} checked={appearance.floatingObjects} />
          </div>
        </SectionWrapper>
        <SectionWrapper name="Spotify" message="requires Spotify premium">
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
        {/* //TODO: Connect SOUNDCLOUD */}
        <SectionWrapper name="SoundCloud">
          <div className={S.option}>
            <StatusChip status={ServiceStatus.Active} />
          </div>
        </SectionWrapper>
        <SectionWrapper name="YouTube" unactive>
          <div className={S.option}>
            <StatusChip status={services.youTube.status} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>{services.youTube.token ? "Disconnect" : "Connect"}</Button>
          </div>
        </SectionWrapper>
        <SectionWrapper name="Danger area" danger>
          <div className={S.option}>
            <Typography.SPAN>In case if something went really wrong</Typography.SPAN>
            <Button danger secondary onClick={showModal}>
              Reset webapp
            </Button>
          </div>
        </SectionWrapper>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
