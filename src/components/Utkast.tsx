import React from "react";
import { BodyShort, Heading } from "@navikt/ds-react";
import style from "./Utkast.module.css";
import UtkastListElement from "./UtkastListeElement/UtkastListElement";
import { useIntl } from "react-intl";

interface Props {
  utkast: UtkastElement[];
}

interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
}

const Utkast = ({ utkast }: Props) => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });

  return (
    <div className={style.utkast}>
      <Heading size={"large"}> {translate("utkast.hovedoverskrift")} </Heading>
      <BodyShort className={style.description}>{translate("utkast.description")}</BodyShort>
      <BodyShort>Sist oppdaert x minutter siden</BodyShort>
      <ul>
        {utkast?.map((u) => (
          <UtkastListElement
            key={u.utkastId}
            tittel={u.tittel}
            link={u.link}
            opprettet={u.opprettet}
            sistEndret={u.sistEndret}
          />
        ))}
      </ul>
    </div>
  );
};

export default Utkast;
