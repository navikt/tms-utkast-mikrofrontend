import React from "react";
import { BodyShort, Heading } from "@navikt/ds-react";
import style from "./Utkast.module.css";
import UtkastList from "./UtkastListeElement/UtkastListElement";
import { useIntl } from "react-intl";
import EmptyUtkastList from "./EmptyUtkastList/EmptyUtkastList";

export interface UtkastListProps {
  utkast: UtkastElement[];
}

export interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
}

const Utkast = ({ utkast }: UtkastListProps) => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });
  return (
    <div className={style.utkast}>
      <Heading size={"large"}> {translate("utkast.hovedoverskrift")} </Heading>
      <BodyShort className={style.description}>{translate("utkast.description")}</BodyShort>
      {utkast?.length > 0 ? <UtkastList utkast={utkast} /> : <EmptyUtkastList />}
    </div>
  );
};

export default Utkast;
