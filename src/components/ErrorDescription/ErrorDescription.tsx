import React from "react";
import { useIntl } from "react-intl";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";

const ErrorDescription = () => {
  const translate = (id: string) => useIntl().formatMessage({ id: id });

  return (
    <div className={styles.errorDiv}>
      <p>{translate("error")}</p>
      <a href={baseUrl}>Tilbake til min side</a>
    </div>
  );
};

export default ErrorDescription;
