import { renderToString } from "react-dom/server";
import Home from "../app/page";
import LegalPage from "../components/LegalPage";
import PrivacyPage from "../components/PrivacyPage";

export type StaticRoute = "/" | "/legal/" | "/privacy/";

export function renderRoute(route: StaticRoute) {
  if (route === "/legal/") return renderToString(<LegalPage />);
  if (route === "/privacy/") return renderToString(<PrivacyPage />);
  return renderToString(<Home />);
}
