import type { Metadata } from "next";
import { NewsAdminManager } from "@/components/admin/NewsAdminManager";

export const metadata: Metadata = {
  title: "News & Events Manager",
  description: "Owner dashboard to manage VJ PRANA homepage news and events.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminNewsPage() {
  return <NewsAdminManager />;
}
