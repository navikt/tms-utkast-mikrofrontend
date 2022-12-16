import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { digisosApiUrl, utkastApiUrl } from "./api/urls";
import Utkast, { UtkastElement } from "./components/Utkast";
import "@navikt/ds-css";
import style from "./App.module.css";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";

function App() {
  const { status: utkastApiStatus, data: utkastApiData } = useQuery(utkastApiUrl, fetcher);
  const { status: digisosApiStatus, data: digisosApiData } = useQuery(digisosApiUrl, fetcher);

  const showErrorMessage = utkastApiStatus == "error" && digisosApiStatus == "error";
  const loading = utkastApiStatus == "loading" || digisosApiStatus == "loading";

  const utkastlist = [].concat(digisosApiData, utkastApiData).filter((obj) => obj != null);

  return (
    <main className={style.main}>
      <div className={style.app}>
        {showErrorMessage ? <ErrorDescription /> : <Utkast utkast={utkastlist} loading={loading} />}
      </div>
    </main>
  );
}

export default App;
