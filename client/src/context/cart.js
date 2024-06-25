import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        let lc = localStorage.getItem('ecart');
        if (lc) {
            let pdata = JSON.parse(lc);
            setCart(pdata);
        }
    }, [])


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//CUSTOM HOOKS
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
