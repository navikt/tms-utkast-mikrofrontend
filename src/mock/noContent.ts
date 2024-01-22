import { HttpResponse, http } from "msw";
import { featureToggleUrl, utkastApiUrl } from "../api/urls";

const ingenUtkastHandler = () => {
  return [
    http.get(utkastApiUrl, () => {
      return HttpResponse.json([]);
    }),
  ];
};

export const featureToggleHandler = () => {
  return [
    http.get(featureToggleUrl, () => {
      return HttpResponse.json({});
    }),
  ];
};

export const handlersNoContent = [...ingenUtkastHandler(), ...featureToggleHandler()];
