import { FC } from "react";
import { FaHistory as HistoryIcon } from "react-icons/fa";

import SectionHeading from "~/components/section-heading";
import HistoryItem from "~/components/history-item";
import Button from "~/components/button";
import Typography from "~/components/typography";
import CardWrapper from "~/components/card-wrapper";

import { useSearch } from "~/hooks/useSearch";

import * as S from "./styles";

const HistorySection: FC = () => {
  const { clearHistory, history } = useSearch();

  return (
    <div className={S.wrapper}>
      <SectionHeading
        title="You searched for"
        Icon={HistoryIcon}
        headingClassNames={S.headingClassNames}
        iconClassNames={S.iconClassNames}
      >
        <Button primary outline onClick={clearHistory}>
          Clear history
        </Button>
      </SectionHeading>
      <div className={S.itemsWrapper}>
        {history.length ? (
          history.map((item) => <HistoryItem key={item} queryName={item} />)
        ) : (
          <div className={S.noContentWrapper}>
            <CardWrapper className={S.cardWrapper}>
              <Typography.H4 className={S.cardText}>You didn't search for anything. Let's fix it!</Typography.H4>
            </CardWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
