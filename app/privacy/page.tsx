import type { Metadata } from "next";
import PrivacyPage from "../../components/PrivacyPage";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | КАПСУЛА",
  description: "Политика обработки персональных данных при заказе школьных фотосессий и выпускных альбомов КАПСУЛА.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return <PrivacyPage />;
}
