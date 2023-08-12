export function Cart(){
    return (
       <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Cart</h1>
            
            <section className="flex items-center justify-between border-b-2 border-gray-300">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVTbaXQbP7raAD00k3s8ZjZelZ0cTb_rx4w&usqp=CAU"
                    className="w-28" 
                />
                <strong>Price: R$1.000</strong>

                <div className="flex justify-center items-center gap-3">
                    <button 
                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        -
                    </button>
                    2
                    <button 
                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        +
                    </button>
                </div>
                <strong className="float-right">SubTotal: R$1.000</strong>
            </section>
            <p className="font-bold mt-4">Total: $20000</p>
       </div>
    )
}