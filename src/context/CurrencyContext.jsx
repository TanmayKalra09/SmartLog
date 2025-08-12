import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [locale, setLocale] = useState("en-IN");

  return (
    <CurrencyContext.Provider value={{ currency, locale, setCurrency, setLocale }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
