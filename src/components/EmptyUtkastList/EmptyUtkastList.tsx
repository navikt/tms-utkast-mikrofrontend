import { BodyLong, Heading } from "@navikt/ds-react";
import TomtKatt from "../../img/TomtKatt";
import style from "./EmptyUtkastList.module.css";
import globalStyles from "../../App.module.css";
import { text } from "../../language/text";
import { LanguageContext } from "../../provider/LanguageProvider";
import { useContext } from "react";

const EmptyUtkastList = () => {
  const language = useContext(LanguageContext);
  return (
    <div className={`${style.ingenUtkast} ${globalStyles.tekstinnhold}`}>
      <div className={style.ingenUtkastTekst}>
        <Heading size="small" level="2">
          {text.ingenUtkastTittel[language]}
        </Heading>
        <BodyLong size="medium">{text.ingenUtkastIngress[language]}</BodyLong>
        <a href={"https://www.nav.no/tjenester"} className={style.lenke}>
          {" "}
          {text.ingenUtkastLenketekst[language]}
        </a>
      </div>
      <TomtKatt alt={text.emptyKitten[language]} />
    </div>
  );
};

export default EmptyUtkastList;
