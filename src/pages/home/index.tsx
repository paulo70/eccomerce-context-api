import {BsCartPlus} from "react-icons/bs"
import { api } from "../../services/api"
import {useContext, useEffect, useState } from "react"
import { carContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home(){
    const [products, setProducts] = useState<ProductProps[]>([])
    const {handleAddProducts} = useContext(carContext)

    useEffect(() => {
    
        async function getProducts(){
            const response = await api.get("/products")
            setProducts(response.data)
        }

        getProducts()
    
    }, [])

    function handleAddItem(product: ProductProps){
        handleAddProducts(product)
    }

    return (
       <div>
            <main className="w-full max-w-7xl px-4 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products.map((product) => (
                        <section className="w-full" key={product.id}>
                            <img 
                                className="w-full rounded-lg max-h-70 mb-2" 
                                src={product.cover}/>
                            <p className="font-medium mt-1 mb-2">{product.title}</p>
                            <div className="flex gap-3 items-center">
                                <strong className="text-zinc-900 p-1 rounded">{product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>
                                <button 
                                    className="bg-zinc-900 p-1 rounded"
                                    onClick={() => handleAddItem(product)}
                                    >
                                    <BsCartPlus size={20} color="#fff"/>
                                </button>
                            </div>
                            <button><Link to={`/details/${product.id}`}>See details</Link></button>
                        </section>
                    ))} 
                    
                </div>
            </main>
       </div>
    )
}