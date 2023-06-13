import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);

    const fetchProducts = async (filter, sortBy) => {
        const filterArray = filter? filter.join(',') : '';
        const sortByParam = sortBy ? sortBy.toLowerCase() : '';
        const url = `https://feedback-backend-lc12.onrender.com/api/products/?filter=${filterArray}&sortBy=${sortByParam}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const products = await response.json();
                setProduct(products.allProducts);
            }
            else {
                setProduct([]);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <ProductContext.Provider value={{product, fetchProducts}}>
            {children}
        </ProductContext.Provider>
    );
}

export {ProductContext, ProductProvider};