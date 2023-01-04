import dayjs from "dayjs";
import { UtkastElement } from "../components/Utkast";

export const sortByOpprettet = (a: UtkastElement, b: UtkastElement) =>
  dayjs(a.opprettet).isBefore(dayjs(b.opprettet)) ? -1 : 1;
