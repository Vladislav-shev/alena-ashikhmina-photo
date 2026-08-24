#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROFILE_FILE = path.join(PROJECT_ROOT, "content/legal-profile.json");

const required = {
  paymentRecipient: "кто заключает договор и принимает оплату",
  contractorFullName: "полное ФИО исполнителя",
  contractorInn: "ИНН исполнителя",
  contractorEmail: "e-mail для обращений",
  contractorPostalAddress: "адрес для претензий",
  businessHours: "режим работы",
  priceUnit: "единица цены в тарифах",
  productionTime: "срок изготовления",
  prepaymentTerms: "условия оплаты",
  dataStorageTerm: "срок хранения материалов",
  dataStorageLocation: "место хранения материалов",
};

export async function checkLegalProfile({ strict = true } = {}) {
  const profile = JSON.parse(await readFile(PROFILE_FILE, "utf8"));
  const missing = Object.entries(required).filter(([key]) => !String(profile[key] ?? "").trim());

  if (!missing.length) {
    console.log("Юридический профиль заполнен полностью.");
    return { missing: [] };
  }

  console.warn(`\nЮридическая основа подготовлена, но не заполнено полей: ${missing.length}`);
  missing.forEach(([, label]) => console.warn(`- ${label}`));
  console.warn("Ответы внесите в content/legal-profile.json и пересоберите сайт: npm run rebuild:deploy");

  if (strict) throw new Error("Юридический профиль пока не готов для приёма заказов.");
  return { missing: missing.map(([key]) => key) };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  checkLegalProfile().catch((error) => {
    console.error(`\nОшибка: ${error.message}`);
    process.exitCode = 1;
  });
}
