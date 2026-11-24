import withBasePath from "@/utils/with-base-path";
import { AnalyticsOrder } from "./types";

export const recentOrdersData: AnalyticsOrder[] = [
  {
    id: 1,
    name: "TailGrids",
    category: "UI Kits",
    country: withBasePath("/images/flag/usa.png"),
    cr: "3.8%",
    value: "12,499",
  },
  {
    id: 2,
    name: "GrayGrids",
    category: "Templates",
    country: withBasePath("/images/flag/yemen.png"),
    cr: "2.6%",
    value: "5,498",
  },
  {
    id: 3,
    name: "Uideck",
    category: "Templates",
    country: withBasePath("/images/flag/sudan.png"),
    cr: "4.1%",
    value: "4,621",
  },
  {
    id: 4,
    name: "FormBold",
    category: "SaaS",
    country: withBasePath("/images/flag/bangladesh.png"),
    cr: "5.2%",
    value: "13,843",
  },
  {
    id: 5,
    name: "NextAdmin",
    category: "Templates",
    country: withBasePath("/images/flag/switzerland.png"),
    cr: "3.4%",
    value: "7,523",
  },
  {
    id: 6,
    name: "Form Builder",
    category: "Templates",
    country: withBasePath("/images/flag/norway.png"),
    cr: "1.8%",
    value: "1,377",
  },
  {
    id: 7,
    name: "AyroUI",
    category: "Templates",
    country: withBasePath("/images/flag/france.png"),
    cr: "2.3%",
    value: "599.00",
  },
];
