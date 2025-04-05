import "./globals.css";

export const metadata = {
  title: "Exigent",
  description: "こんにちは、皆さん",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
