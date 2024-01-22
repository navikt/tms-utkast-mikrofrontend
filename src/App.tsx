import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { utkastApiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";
import style from "./App.module.css";

function App() {
  const { status: utkastApiStatus, data: utkastApiData } = useQuery(utkastApiUrl, fetcher);
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
}

export default App;
