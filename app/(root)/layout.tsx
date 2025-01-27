import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import ThemeToggle from "@/components/sidebar/ThemeToggle";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Management",
  description: "Event Management Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${nunito.className}  antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings />
                    <ThemeToggle />
                    <NavUser
                      user={{
                        name: "Kebba Waiga",
                        email: "kebbawaiga@gmail.com",
                        avatar: "https://example.com/john-doe.jpg",
                      }}
                    />
                  </div>
                </header>
                <Separator />
                <div className="p-5 overflow-hidden">{children}</div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
