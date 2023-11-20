import React, { createContext, useEffect, useState } from 'react';
import { db } from '../Config/Config';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Products').onSnapshot(snapshot => {
      const productsData = snapshot.docs.map(doc => ({
        ProductID: doc.id,
        ProductName: doc.data().ProductName,
        ProductPrice: doc.data().ProductPrice,
        ProductImg: doc.data().ProductImg,
        ProductType: doc.data().ProductType // Add the new field
      }));

      // console.log(productsData); // Debug statement

      setProducts(productsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
