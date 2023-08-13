import { useContext } from "react"
import { carContext } from "../../contexts/CartContext"
import { Link } from "react-router-dom"

export function Cart(){
    const {cart, total, removeItemCart, handleAddProducts} = useContext(carContext)

    return (
       <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Cart</h1>


            {cart.length === 0 && (
                <>
                    <p className="flex items-center justify-center font-medium">Ops!!! Cart is empty</p>
                    <Link to="/"><p className="flex items-center justify-center font-medium">Back to Home</p></Link>
                </>
               
            )}
            
            {cart.map((item) => (
                <section 
                    key={item.id}
                    className="flex items-center justify-between border-b-2 border-gray-300"
                >
                <img 
                    src={item.cover}
                    className="w-28" 
                />
                <strong>Price: {item.price}</strong>

                <div className="flex justify-center items-center gap-3">
                    <button 
                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                        onClick={() => removeItemCart(item)}
                        >
                        -
                    </button>
                    {item.amount}
                    <button 
                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                        onClick={() => handleAddProducts(item)}
                        >
                        +
                    </button>
                </div>
                <strong className="float-right">
                        SubTotal: {item.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency:"BRL"
                    })}
                </strong>
            </section>
            ))}
            {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
       </div>
    )
}