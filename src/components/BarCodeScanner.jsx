import React, { useContext, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { BarcodeContext } from "../context/BarcodeContext";

function BarcodeScanner() {
  const { barcode, setBarcode } = useContext(BarcodeContext);

  useEffect(() => {
    // Verifica que no se haya inicializado previamente
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      readerElement.innerHTML = ""; // Limpia el contenedor
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }, // Ajusta el tamaño según sea necesario
      },
      false
    );

    scanner.render(
      (decodedText) => {
        // Solo actualizamos el barcode si el valor es diferente del actual
        if (decodedText !== barcode) {
          setBarcode(decodedText); // Actualiza el estado del barcode
          alert(`Código escaneado: ${decodedText}`);
        }
      },
      (errorMessage) => {
        console.debug("Error en el escaneo:", errorMessage); // Menos intrusivo
      }
    );

    // Limpiar recursos al desmontar
    return () => {
      scanner
        .clear()
        .catch((error) => console.error("Error al limpiar el escáner:", error));
    };
  }, []); // Dependencia del barcode para evitar cambios innecesarios

  return (
    <div
      id="reader"
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "10px",
      }}
    ></div>
  );
}

export default BarcodeScanner;
