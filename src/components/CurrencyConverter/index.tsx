import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { CurrencyTable } from "../Table/index.tsx";
import { BasicDatePicker } from "../DatePicker/index.tsx";

const CurrencyConverter = () => {
  const selectedCurrencies: string[] = ["gbp", "usd", "eur", "jpy", "chf", "cad", "aud", "zar"];
  const [conversionData, setConversionData] = useState(null);

  useEffect(() => {
    const fetchConversions = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const defaultCurrency = "gbp";
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${today}/v1/currencies/${defaultCurrency}.json`);
        const data = await response.json();
        setConversionData(data);
      } catch (error) {
        console.error("Error fetching conversions:", error);
      }
    };

    fetchConversions();
  }, []);

  return (
    <>
      <Container maxWidth="lg" className="App-container">
        <BasicDatePicker />
        <CurrencyTable selectedCurrencies={selectedCurrencies} conversionData={conversionData} />
      </Container>
    </>
  );
};

export { CurrencyConverter };
