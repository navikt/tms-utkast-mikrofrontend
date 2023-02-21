import { BodyShort } from "@navikt/ds-react";
import TomtKatt from "../../img/TomtKatt";
import style from "./EmptyUtkastList.module.css";
import globalStyles from "../../App.module.css";
import { text } from "../../language/text";

const EmptyUtkastList = () => {
  return (
    <div className={`${style.ingenUtkast} ${globalStyles.tekstinnhold}`}>
      <TomtKatt alt={text.emptyKitten["nb"]} />
      <div className={style.ingenUtkastTekst}>
        <BodyShort>
          <strong>{text.emptySubheading["nb"]}</strong>
        </BodyShort>
        <a href={"https://www.nav.no/tjenester"}> {text.emptyOtherServices["nb"]}</a>
      </div>
    </div>
  );
};

export default EmptyUtkastList;
