import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { digisosApiUrl, utkastApiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";
import "@navikt/ds-css";
import style from "./App.module.css";
import { Link } from "react-router-dom";

function App() {
  const { status: utkastApiStatus, data: utkastApiData = [] } = useQuery(utkastApiUrl, fetcher);
  const { status: digisosApiStatus, data: digisosApiData = [] } = useQuery(digisosApiUrl, fetcher);

  const showErrorMessage = utkastApiStatus == "error" && digisosApiStatus == "error";
  const loading = utkastApiStatus == "loading" || digisosApiStatus == "loading";

  const utkastlist = digisosApiData.concat(utkastApiData);

  return (
    <main className={style.main}>
      <Link to="..." relative="path">
        Test Link
      </Link>
      <div className={style.app}>
        {showErrorMessage ? <ErrorDescription /> : <Utkast utkast={utkastlist} loading={loading} />}
      </div>
    </main>
  );
}

export default App;
