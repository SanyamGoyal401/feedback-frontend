import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);

    const fetchProducts = async (filter, sortBy) => {
        const filterArray = filter? filter.join(',') : '';
        const sortByParam = sortBy ? sortBy.toLowerCase() : '';
        // const url = `http://localhost:8000/api/products/?filter=${filterArray}&sortBy=${sortByParam}`;
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
    useEffect(()=>{
        console.log(product);
    },[product])
    return (
        <ProductContext.Provider value={{product, fetchProducts}}>
            {children}
        </ProductContext.Provider>
    );
}

export {ProductContext, ProductProvider};