import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="dark" className="dark">
      <Head />
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
