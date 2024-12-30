import React, { useState, useEffect, useContext } from "react";
import { productos } from "./db.js";
import { BarcodeContext } from "../context/BarcodeContext.jsx";

function Checkout() {
  const { barcode } = useContext(BarcodeContext);
  const [listaProductos, setListaProductos] = useState([]);

  const buscarProducto = (codigo) => {
    if (!codigo) return; // Si no hay un código válido, no ejecutamos la búsqueda

    const codigoTrimmed = codigo.trim(); // Elimina los espacios en blanco alrededor del código escaneado
    console.log("Código escaneado:", codigoTrimmed); // Verifica el código escaneado

    const elemento = productos.find((item) => item.barcode === codigoTrimmed);

    console.log("Elemento encontrado:", elemento); // Muestra el producto encontrado, si hay

    if (elemento) {
      // Verificar si el producto ya está en la lista
      setListaProductos((prevLista) => {
        // Verificar si el producto ya existe en la lista
        const productoExistente = prevLista.find(
          (producto) => producto.barcode === codigoTrimmed
        );

        if (productoExistente) {
          // Si el producto ya existe, incrementar la cantidad
          return prevLista.map((producto) =>
            producto.barcode === codigoTrimmed
              ? { ...producto, cantidad: producto.cantidad + 1} // Incrementa cantidad
              : producto
          );
        } else {
          // Si el producto no está en la lista, agregarlo con cantidad 1
          return [...prevLista, { ...elemento, cantidad: 2 }];
        }
      });
    } else {
      console.log("Producto no encontrado");
    }
  };

  useEffect(() => {
    if (barcode) {
      buscarProducto(barcode); // Solo ejecutamos la búsqueda si el barcode es válido
    }
  }, [barcode]); // Dependencia: se ejecuta cada vez que barcode cambia

  return (
    <div>
      <div>
        <h1>Lista de productos escaneados</h1>
        {listaProductos.length > 0 ? (
          listaProductos.map((producto, index) => (
            <p key={index}>
              {producto.product_name} - Cantidad: {producto.cantidad}
            </p> // Mostrar el nombre del producto y la cantidad
          ))
        ) : (
          <p>No se han escaneado productos</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
