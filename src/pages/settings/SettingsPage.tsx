import { FC } from "react";

import Button from "~/components/button";
import PageWrapper from "~/components/page-wrapper";
import StatusChip from "~/components/status-chip";
import Switch from "~/components/switch";
import Typography from "~/components/typography";
import SectionWrapper from "./section-wrapper";

import { useConfig } from "~/hooks/useConfig";

import { ServiceStatus } from "~/types";
import * as S from "./styles";

const SettingsPage: FC = () => {
  const { appearance, updateAppConfig } = useConfig();

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
            <StatusChip status={ServiceStatus.Unactive} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>Connect</Button>
          </div>
        </SectionWrapper>
        <SectionWrapper name="SoundCloud">
          <div className={S.option}>
            <StatusChip status={ServiceStatus.Unactive} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>Connect</Button>
          </div>
        </SectionWrapper>
        <SectionWrapper name="YouTube">
          <div className={S.option}>
            <StatusChip status={ServiceStatus.Unactive} />
          </div>
          <div className={S.option}>
            <Typography.SPAN>Service action</Typography.SPAN>
            <Button secondary>Connect</Button>
          </div>
        </SectionWrapper>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
