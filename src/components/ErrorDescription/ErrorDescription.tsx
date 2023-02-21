import React from "react";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";
import KattIBoks from "../../img/KattIBoks";
import { BodyLong, Heading } from "@navikt/ds-react";
import { text } from "../../language/text";

const ErrorDescription = () => {
  return (
    <div className={styles.errorDiv} data-testid="errordiv">
      <Heading size={"xlarge"}>{text.errorHeading["nb"]}</Heading>
      <KattIBoks alt={text.errorKitten["nb"]} />
      <BodyLong>
        <strong>{text.errorText["nb"]}</strong>
      </BodyLong>
      <BodyLong>
        {text.errorHelp["nb"]} <a href={baseUrl}>{text.minSide["nb"]}</a>
      </BodyLong>
    </div>
  );
};

export default ErrorDescription;
