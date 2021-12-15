import React from 'react'
import Header from '../components/Header'
import CheckoutProdut from '../components/CheckoutProdut';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import { useSession } from 'next-auth/react';
import Currency from 'react-currency-formatter';

function Checkout() {
    const items = useSelector(selectItems)
    const {data: session} = useSession();
    const total = useSelector(selectTotal)

    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen=2xl mx-auto'>
                {/*left side*/}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? "Your Basket is Empty." : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProdut 
                                key={i}                                
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>

                </div>

                {/*right side*/}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items) : {" "}
                                <span className='font-bold'>
                                    <Currency quantity={total} currency='GBP'/>
                                </span>
                            </h2>
                            {console.log("session: ", session)}
                            <button 
                                disabled={!session}
                                className={`button mt-2
                                ${!session && 
                                'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                                }`}>
                                {!session ? 'Sign in to checkout': 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
