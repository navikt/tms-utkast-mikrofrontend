import React from "react";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";
import KattIBoks from "../../img/KattIBoks";
import { BodyLong, Heading } from "@navikt/ds-react";
import { text } from "../../language/text";

const ErrorDescription = ({ language }: { language: "en" | "nb" }) => {
  return (
    <div className={styles.errorDiv} data-testid="errordiv">
      <Heading size={"xlarge"}>{text.errorHeading[language]}</Heading>
      <KattIBoks alt={text.errorKitten[language]} />
      <BodyLong>
        <strong>{text.errorText[language]}</strong>
      </BodyLong>
      <BodyLong>
        {text.errorHelp[language]} <a href={baseUrl}>{text.minSide[language]}</a>
      </BodyLong>
    </div>
  );
};

export default ErrorDescription;
