import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { apiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import "@navikt/ds-css";
import style from "./App.module.css";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";

function App() {
  const { isError, data } = useQuery(apiUrl, fetcher);
  return (
    <main className={style.main}>
      <div className={style.app}>{isError ? <ErrorDescription /> : <Utkast utkast={data} dataError={isError} />}</div>
    </main>
  );
}

export default App;
