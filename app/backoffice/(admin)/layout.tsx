import type { ReactNode } from "react";
import type { Metadata } from "next";

import { BackofficeShell } from "@/components/backoffice/backoffice-shell";
import { requireBackofficeSession } from "@/lib/backoffice-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Backoffice",
  robots: {
    index: false,
    follow: false
  }
};

export default async function BackofficeLayout({ children }: { children: ReactNode }) {
  await requireBackofficeSession();

  return <BackofficeShell>{children}</BackofficeShell>;
}
