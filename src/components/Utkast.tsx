import React from "react";
import { BodyShort, Heading, Ingress, Loader } from "@navikt/ds-react";
import style from "./Utkast.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { useIntl } from "react-intl";

export interface UtkastListProps {
  status: string;
  utkast: UtkastElement[] | undefined;
}

export interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
}

const Utkast = ({ utkast, status }: UtkastListProps) => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });

  return (
    <div className={style.utkast}>
      <Heading size={"large"}> {translate("utkast.hovedoverskrift")} </Heading>
      <Ingress className={style.description}>{translate("utkast.description")}</Ingress>
      {status == "loading" ? (
        <div className={style.loadingDiv}>
          <Loader id="loader" size="3xlarge" title="venter..." />
        </div>
      ) : (
        <UtkastList utkast={utkast} status={status} />
      )}
    </div>
  );
};

export default Utkast;
