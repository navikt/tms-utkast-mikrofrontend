import { useIntl } from "react-intl";
import { BodyShort, Heading } from "@navikt/ds-react";
import utkastKatt from "../../img/utkast-katt.svg";
import style from "./EmptyUtkastList.module.css";
import globalStyles from "../../App.module.css";

const EmptyUtkastList = () => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });
  return (
    <div className={`${style.ingenUtkast} ${globalStyles.tekstinnhold}`}>
      <img src={utkastKatt} alt={translate("utkast.empty.kitten")} />
      <div className={style.ingenUtkastTekst}>
        <BodyShort>
          <strong>{translate("utkast.empty.subheading")}</strong>
        </BodyShort>
        <a href={"https://nrk.no"}> {translate("utkast.empty.otherServices")}</a>
      </div>
    </div>
  );
};

export default EmptyUtkastList;
