import amplitude from "amplitude-js";
import { MetricValues } from "../components/Utkast";

export const initializeAmplitude = () => {
  amplitude.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export function logAmplitudeEvent(skjemaurl: string, metrics: MetricValues | null | undefined) {
  if (metrics) {
    amplitude.getInstance().logEvent("skjema åpnet", {
      skjemaurl,
      ...metrics,
    });
  } else {
    amplitude.getInstance().logEvent("skjema åpnet", {
      skjemaurl,
    });
  }
}
