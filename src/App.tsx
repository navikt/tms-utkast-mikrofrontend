import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { apiUrl } from "./api/urls";
import Utkast from "./components/Utkast";
import "@navikt/ds-css";
import style from "./App.module.css";

function App() {
  const { status, data } = useQuery(apiUrl, fetcher);
  return (
    <div className={style.main}>
      <div className={style.app}>
        <Utkast utkast={data} status={status} />
      </div>
    </div>
  );
}

export default App;
