import { BodyShort, Heading } from "@navikt/ds-react";
import tomtKatt from "../../img/tomt-katt.svg";
import style from "./EmptyUtkastList.module.css";
import globalStyles from "../../App.module.css";
import { translate } from "../../providers/LanguageProvider";

const EmptyUtkastList = () => {
  return (
    <div className={`${style.ingenUtkast} ${globalStyles.tekstinnhold}`}>
      <img src={tomtKatt} alt={translate("utkast.empty.kitten")} />
      <div className={style.ingenUtkastTekst}>
        <BodyShort>
          <strong>{translate("utkast.empty.subheading")}</strong>
        </BodyShort>
        <a href={"https://www.nav.no/tjenester"}> {translate("utkast.empty.otherServices")}</a>
      </div>
    </div>
  );
};

export default EmptyUtkastList;
