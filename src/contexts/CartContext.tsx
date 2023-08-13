import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    handleAddProducts: (newProduct: ProductProps) => void;
    removeItemCart: (items: CartProps) => void;
    handleDetails: (item: ProductProps) => void;
    total: string;
    cartDescription: ProductProps[]
}

interface CartProps{
    id: number;
    title: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
    description: string;
}

interface CartProviderProps{
    children: ReactNode;
}

export const carContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    
    const [cart, setCart] = useState<CartProps[]>([])
    const [cartDescription, setCartDescription] = useState<ProductProps[]>([])
    const [total, setTotal] = useState("")

    function handleAddProducts(newProduct: ProductProps){
        const findItem = cart.findIndex(item => item.id === newProduct.id)

        if(findItem !== -1){
            let cartList = cart
            cartList[findItem].amount = cartList[findItem].amount + 1
            cartList[findItem].total = cartList[findItem].amount * cartList[findItem].price

            setCart(cartList)
            totalResultsCart(cartList)
            return
        }

        let data = {
            ...newProduct,
            amount: 1,
            total: newProduct.price,
        }

        setCart(current => [...current, data])
        totalResultsCart([...cart, data])
    }

    function removeItemCart(itemCart:CartProps){
        const indexItem = cart.findIndex(item => item.id === itemCart.id)

        if(cart[indexItem]?.amount > 1){
            // we should decrease
            let cartList = cart
            
            cartList[indexItem].amount = cartList[indexItem].amount - 1
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price 

            setCart(cartList)
            totalResultsCart(cartList)
            return 
        }

        const removeItem = cart.filter(item => item.id !== itemCart.id)
        setCart(removeItem)
        totalResultsCart(removeItem)
    }

    function totalResultsCart(items: CartProps[]){
        let myCart = items
        let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0)
        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(resultFormated)
    }

    function handleDetails(item: ProductProps){
       setCartDescription([
            {   id: item.id,
                title: item.title,
                description: item.description,
                cover: item.cover,
                price: item.price
            }
       ])
    }

    return(
        <carContext.Provider value={
        {
            cart, 
            cartAmount: cart.length,
            handleAddProducts,
            removeItemCart,
            handleDetails,
            total,
            cartDescription
        }
        }>
            {children}
        </carContext.Provider>
    )
}

export default CartProvider