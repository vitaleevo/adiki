import { fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import { getBackofficeApiKey } from "@/lib/backoffice-auth";

export async function getBackofficeDashboard() {
  return await fetchQuery(api.backoffice.dashboard, { adminKey: getBackofficeApiKey() });
}

export async function getBackofficeContentLists() {
  return await fetchQuery(api.backoffice.contentLists, { adminKey: getBackofficeApiKey() });
}

export async function getBackofficeLeads() {
  return await fetchQuery(api.backoffice.leadList, { adminKey: getBackofficeApiKey() });
}

export async function getBackofficeMedia() {
  return await fetchQuery(api.backoffice.mediaList, { adminKey: getBackofficeApiKey() });
}
