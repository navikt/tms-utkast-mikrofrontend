import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { digisosApiDeprecatedUrl, featureToggleUrl, utkastApiDeprecatedUrl, utkastApiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";
import style from "./App.module.css";

function App() {
  const { data: featureToggles } = useQuery(featureToggleUrl, fetcher);
  const { status: utkastApiStatus, data: utkastApiData } = useQuery(utkastApiUrl, fetcher);

  const { status: utkastApiDeprecatedStatus, data: utkastApiDeprecatedData } = useQuery(
    utkastApiDeprecatedUrl,
    fetcher,
  );
  const { status: digisosApiStatus, data: digisosApiData } = useQuery(digisosApiDeprecatedUrl, fetcher);

  if (featureToggles?.data.UtkastApiV2) {
    const showErrorMessage = utkastApiStatus == "error";
    const loading = utkastApiStatus == "loading";
    const utkastlist = utkastApiData?.data;

    return (
      <main className={style.main}>
        <div className={style.app}>
          {showErrorMessage ? (
            <ErrorDescription />
          ) : (
            <Utkast utkast={utkastlist} loading={loading} isPartialContent={utkastApiData?.statusCode == 207} />
          )}
        </div>
      </main>
    );
  } else {
    const showErrorMessage = utkastApiDeprecatedStatus == "error" && digisosApiStatus == "error";
    const loading = utkastApiDeprecatedStatus == "loading" || digisosApiStatus == "loading";

    const utkastlist = digisosApiData?.data.concat(utkastApiDeprecatedData?.data);

    return (
      <main className={style.main}>
        <div className={style.app}>
          {showErrorMessage ? (
            <ErrorDescription />
          ) : (
            <Utkast utkast={utkastlist} loading={loading} isPartialContent={false} />
          )}
        </div>
      </main>
    );
  }
}

export default App;
