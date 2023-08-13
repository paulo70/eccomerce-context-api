import {useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import {BsCartPlus} from "react-icons/bs"
import { carContext } from "../../contexts/CartContext";
import { toast } from "react-hot-toast";

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

 const navigate = useNavigate()
 
 useEffect(() => {
    async function getCartDetails(){
        const response = await api.get(`/products/${id}`)
        setProducts(response.data)
    }


    getCartDetails()
 } ,[id])

  function handleItem(products:PropsDetails){
    handleAddProducts(products)
    toast.success("Product added succesfully")
    navigate("/cart")
  }

    return (
        <>
          <h1 className="text-center font-medium mt-6 text-3xl">Product Details</h1>
          <div className="flex flex-col lg:flex-row w-full max-w-7xl px-4 mx-auto mt-10">
            <section>
                <img className="flex-1 w-full max-72 object-contain" src={products.cover}/>
            </section>
            <section className="p-3">
                <h2 className="font-medium mb-3 text-2xl">{products.title}</h2>
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
                        <BsCartPlus size={20} color="#fff"/>
                    </button>
                </p>
            </section>
            
           </div>
        </>
    )
}