import legalProfileData from "./legal-profile.json";

export const SITE_URL = "https://xn----7sbd3bcejew7i.xn--p1ai";
export const SITE_NAME = "КАПСУЛА";
export const SITE_TITLE = "Выпускные альбомы 2027 в Луганске | КАПСУЛА";
export const SITE_DESCRIPTION =
  "Выпускные альбомы для 4, 9 и 11 классов в Луганске и области. Пять тарифов, съёмка в школе, студии или парке.";

export const contacts = [
  {
    name: "Алёна Ашихмина",
    phone: "+7 (959) 123-68-76",
    phoneE164: "+79591236876",
  },
  {
    name: "Екатерина Ерохина",
    phone: "+7 (959) 162-18-07",
    phoneE164: "+79591621807",
  },
] as const;

/**
 * Единственное место для реквизитов, которые должен подтвердить владелец.
 * Не заменяйте null догадками: эти значения выводятся на правовой странице.
 */
type LegalProfile = {
  siteUpdatedAt: string;
  serviceArea: string;
  paymentRecipient: string | null;
  contractorFullName: string | null;
  contractorInn: string | null;
  contractorEmail: string | null;
  contractorPostalAddress: string | null;
  businessHours: string | null;
  priceUnit: string | null;
  productionTime: string | null;
  prepaymentTerms: string | null;
  dataStorageTerm: string | null;
  dataStorageLocation: string | null;
};

export const legalProfile: LegalProfile = legalProfileData;

export const missingLegalFields = [
  ["Кто принимает оплату и заключает договор", legalProfile.paymentRecipient],
  ["Полное ФИО исполнителя", legalProfile.contractorFullName],
  ["ИНН исполнителя", legalProfile.contractorInn],
  ["E-mail для юридически значимых обращений", legalProfile.contractorEmail],
  ["Адрес для претензий", legalProfile.contractorPostalAddress],
  ["Режим работы", legalProfile.businessHours],
  ["Единица цены в тарифах", legalProfile.priceUnit],
  ["Срок изготовления", legalProfile.productionTime],
  ["Предоплата и окончательный расчёт", legalProfile.prepaymentTerms],
  ["Срок хранения исходников и макетов", legalProfile.dataStorageTerm],
  ["Место хранения файлов", legalProfile.dataStorageLocation],
] as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "КАПСУЛА — Алёна Ашихмина и Екатерина Ерохина",
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  areaServed: {
    "@type": "AdministrativeArea",
    name: legalProfile.serviceArea,
  },
  contactPoint: contacts.map((contact) => ({
    "@type": "ContactPoint",
    name: contact.name,
    telephone: contact.phoneE164,
    contactType: "customer service",
    areaServed: "RU",
    availableLanguage: "Russian",
  })),
};
