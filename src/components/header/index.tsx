import {FiShoppingCart} from "react-icons/fi"
import { Link } from "react-router-dom"

import { carContext } from "../../contexts/CartContext"
import { useContext } from "react"

export function Header(){
    const {cartAmount} = useContext(carContext)
    return (
        <header className="w-full px-1 bg-slate-200">
            <nav className="w-full flex justify-between max-w-7xl h-14 items-center px-5 mx-auto">
                <Link to="/" className="font-bold text-2xl">Dev Shop</Link>
                <Link to="/cart" className="relative">
                    <FiShoppingCart size={24} color="#121212"/>
                    {cartAmount > 0 && (
                        <span className="absolute rounded-full bg-sky-600 px-2.5 text-white w-6 h-6 flex items-center justify-center text-xs -top-3 -right-3">{cartAmount}</span>
                    )}
                </Link>
            </nav>
        </header>
    )
}