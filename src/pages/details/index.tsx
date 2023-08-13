import {useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api"
import {BsCartPlus} from "react-icons/bs"
import { carContext } from "../../contexts/CartContext";

interface PropsDetails{
    title: string;
    description: string;
    price: number;
    cover: string;
    id: number;
}

export function Details(){
 const [products, setProducts] = useState({} as PropsDetails)
 const {handleAddProducts} = useContext(carContext)
 const {id} = useParams()
 
 useEffect(() => {
    async function getCartDetails(){
        const response = await api.get(`/products/${id}`)
        setProducts(response.data)
    }


    getCartDetails()
 } ,[])

  function handleItem(products:PropsDetails){
    handleAddProducts(products)
  }

    return (
        <>
          <h1 className="text-center font-medium mt-3">Product Details</h1>
          <div className="flex justify-between w-full max-w-7xl px-4 mx-auto mt-10">
            <section>
                <img src={products.cover}/>
            </section>
            <section className="p-3">
                <h2 className="font-medium mb-3">{products.title}</h2>
                <p className="font-medium mb-3">{products.description}</p>
                <p className="font-medium">Price: {products.price}
                    <button 
                        className="bg-zinc-900 p-1 rounded ml-2"
                        onClick={() => handleItem({
                            title: products.title,
                            cover: products.cover,
                            price: products.price,
                            id: products.id,
                            description: products.description
                        })}
                        >
                        <Link to="/cart"><BsCartPlus size={20} color="#fff"/></Link>
                    </button>
                </p>
            </section>
            
           </div>
        </>
    )
}