import { useIntl } from "react-intl";
import { Heading } from "@navikt/ds-react";
import utkastKatt from "../../img/utkast-katt.svg";
import style from "./EmptyUtkastList.module.css";

const EmptyUtkastList = () => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });
  return (
    <div className={style.ingenUtkast}>
      <img src={utkastKatt} alt={translate("utkast.empty.kitten")} />
      <Heading size={"medium"}>{translate("utkast.empty.subheading")}</Heading>
      <a href={"https://nrk.no"}> {translate("utkast.empty.otherServices")}</a>
    </div>
  );
};

export default EmptyUtkastList;
