import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { digisosApiUrl, utkastApiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";
import "@navikt/ds-css";
import style from "./App.module.css";

function App({ language }: { language: "en" | "nb" }) {
  const { status: utkastApiStatus, data: utkastApiData = [] } = useQuery(utkastApiUrl, fetcher);
  const { status: digisosApiStatus, data: digisosApiData = [] } = useQuery(digisosApiUrl, fetcher);

  const showErrorMessage = utkastApiStatus == "error" && digisosApiStatus == "error";
  const loading = utkastApiStatus == "loading" || digisosApiStatus == "loading";

  const utkastlist = digisosApiData.concat(utkastApiData);

  return (
    <main className={style.main}>
      <div className={style.app}>
        {showErrorMessage ? (
          <ErrorDescription language={language} />
        ) : (
          <Utkast utkast={utkastlist} language={language} loading={loading} />
        )}
      </div>
    </main>
  );
}

export default App;
