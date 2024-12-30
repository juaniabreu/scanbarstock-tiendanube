import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import BarcodeScanner from "./components/BarCodeScanner";
import { BarcodeContext, BarcodeProvider } from "./context/BarcodeContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <BarcodeProvider>
        <BarcodeScanner />
        <Checkout/>
      </BarcodeProvider>
    </>
  );
}

export default App;
