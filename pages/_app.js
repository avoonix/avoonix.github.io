// import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/global.css";
import "../utils/i18n";

export default function App({ Component, pageProps }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(process.env.NEXT_PUBLIC_I18N_LOCALE);
  }, []);
  return <Component {...pageProps} />;
}
