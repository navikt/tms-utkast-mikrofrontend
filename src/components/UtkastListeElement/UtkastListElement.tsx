import React from "react";
import { Heading } from "@navikt/ds-react";

interface Props {
  link: string;
  tittel: string;
}

const UtkastListElement = ({ link, tittel }: Props) => {
  return (
    <li>
      <a href={link}>
        <Heading size={"small"} level={"2"}>
          {tittel}
        </Heading>
        <p>Påbegynt xxx</p>
      </a>
    </li>
  );
};

export default UtkastListElement;
