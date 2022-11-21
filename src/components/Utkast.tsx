import React from "react";
import { BodyShort, Heading, Panel } from "@navikt/ds-react";
import "./Utkast.css";

interface Props {
  tekst: string;
}

const Utkast = ({ tekst }: Props) => {
  return (
    <div className="utkast">
      <Heading size={"large"}> Utkast </Heading>
      <BodyShort className="description">
        {" "}
        Her finner du påbegynte søknader og andre skjemaer du ikke har sendt inn enda
      </BodyShort>
      <BodyShort>Sist oppdaert x minutter siden</BodyShort>
      <ul></ul>
    </div>
  );
};

export default Utkast;
