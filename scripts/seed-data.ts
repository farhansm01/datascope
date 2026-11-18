import { faker } from "@faker-js/faker";

export const COUNTRIES = [
  "Germany", "United States", "United Kingdom", "France", "Canada",
  "Australia", "India", "Bangladesh", "Japan", "Brazil",
  "Spain", "Italy", "Netherlands", "Singapore", "Sweden",
];

export type DatasetDef = {
  name: string;
  description: string;
  category: string;
  source: string;
  total: number;
  statuses: string[];
  categories: string[];
  roles: string[]; // roles allowed to open this dataset (admin can open all)
};

export const DATASET_DEFS: DatasetDef[] = [
  {
    name: "Customers",
    description: "Customer accounts with country, status and revenue.",
    category: "Sales",
    source: "CRM export",
    total: 100000,
    statuses: ["active", "inactive", "pending"],
    categories: ["Enterprise", "SMB", "Startup", "Government"],
    roles: ["analyst", "viewer"],
  },
  {
    name: "Sales Leads",
    description: "Potential customers moving through the sales pipeline.",
    category: "Sales",
    source: "Marketing platform",
    total: 20000,
    statuses: ["new", "contacted", "qualified", "lost"],
    categories: ["Website", "Referral", "Event", "Cold outreach"],
    roles: ["analyst"], // viewers cannot see this one
  },
  {
    name: "Support Tickets",
    description: "Customer support requests and their progress.",
    category: "Support",
    source: "Helpdesk system",
    total: 10000,
    statuses: ["open", "in_progress", "resolved", "closed"],
    categories: ["Billing", "Technical", "Account", "Feature request"],
    roles: ["analyst", "viewer"],
  },
];

// The columns every dataset has. Used for dynamic filters and table columns.
export const FIELD_DEFS = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "country", label: "Country", type: "select" },
  { key: "status", label: "Status", type: "select" },
  { key: "category", label: "Category", type: "select" },
  { key: "revenue", label: "Revenue", type: "number" },
  { key: "createdAt", label: "Created", type: "date" },
];

export const TEST_USERS = [
  { name: "Admin User", email: "admin@datascope.test", role: "admin" },
  { name: "Analyst User", email: "analyst@datascope.test", role: "analyst" },
  { name: "Viewer User", email: "viewer@datascope.test", role: "viewer" },
];

export const TEST_PASSWORD = "Password123!";

// Makes one fake record for a dataset
export function makeRecord(def: DatasetDef, datasetId: string) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const createdAt = faker.date.between({
    from: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000), // 2 years ago
    to: new Date(),
  });

  return {
    datasetId,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    country: faker.helpers.arrayElement(COUNTRIES),
    status: faker.helpers.arrayElement(def.statuses),
    category: faker.helpers.arrayElement(def.categories),
    revenue: Math.round(faker.number.float({ min: 0, max: 50000 }) * 100) / 100,
    createdAt,
    updatedAt: createdAt,
  };
}   
