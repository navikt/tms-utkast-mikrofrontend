import { HttpResponse, http } from "msw";
import { utkastApiUrl } from "../api/urls";

const ingenUtkastHandler = () => {
  return [
    http.get(utkastApiUrl, () => {
      return HttpResponse.json([]);
    }),
  ];
};

export const handlersNoContent = [...ingenUtkastHandler()];
