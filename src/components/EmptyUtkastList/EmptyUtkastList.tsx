import { useIntl } from "react-intl";
import { Heading } from "@navikt/ds-react";

const EmptyUtkastList = () => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });
  return (
    <div>
      <img src={"utkast-katt.svg"} alt={translate("utkast.empty.kitten")} />
      <Heading size={"medium"}>{translate("utkast.empty.subheading")}</Heading>
      <a href={"https://nrk.no"}> {translate("utkast.empty.otherServices")}</a>
    </div>
  );
};

export default EmptyUtkastList;
