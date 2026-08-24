import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Условия заказа и реквизиты | КАПСУЛА",
  description: "Правовая информация, условия заказа, оплаты и изготовления выпускных альбомов КАПСУЛА в Луганске.",
  alternates: { canonical: "/legal/" },
};

export default function Page() {
  return <LegalPage />;
}
