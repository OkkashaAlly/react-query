"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import "./globals.css";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="p-3">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-6 p-3 bg-yellow-300 underline">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/superheros">Superheros</Link>
        </li>
        <li>
          <Link href="/RQsuperheros">RQSuperheros</Link>
        </li>
      </ul>
    </nav>
  );
};