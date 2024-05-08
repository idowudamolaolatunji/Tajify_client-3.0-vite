import React, { useEffect, useState } from 'react';

import ProductCards from './components/ProductCards';

import img from '../../assets/images/hero-img/jobs.png'
import { IoTrashBinOutline } from 'react-icons/io5';
import { FaRegWindowMinimize } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Header from '../../components/Header';
import { useCartContext } from '../../context/CartContext';
import { numberConverter } from '../../utils/helper';

function index() {
    const [topItems, setTopItems] = useState([]);
    const [isLoading, setIsLoading] = useState({
        topItem: true
    });
    const { cartItems, onRemove, toggleCartItemQuanitity, totalPrice, totalQuantities } = useCartContext();
    useEffect(() => {
        console.log(cartItems);
    }, [])
    
    const handleQuanInc = (item, quantity) => {
        toggleCartItemQuanitity(item._id, quantity, "inc"); 
    };

    const handleQuanDec = (item, quantity) => {
        toggleCartItemQuanitity(item._id, quantity, "dec"); 
    };


    useEffect(function() {
        async function fetchTopProducts() {
            const baseUrl = import.meta.env.VITE_SERVER_URL;
            try {
                const res = await fetch(`${baseUrl}/market/products/top-selling`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if(!res.ok) throw new Error('Something went wrong');
                const data = await res.json();
                setTopItems(data?.data?.products)

            } catch(err) {
                console.log(err.message)
            } finally {
                setIsLoading(prev => ({
                    ...prev,
                    topItem: false,
                }));
            }
        }
        fetchTopProducts();
    }, []);

    return (
        <>
            <Header />

            <main className='cart--container'>
                <div className="cart--main">
                    <div className="cart--products">
                        <p className='cart-heading'>Cart ({cartItems?.length})</p>

                        <div className="cart--items">
                            {cartItems?.length > 0 && cartItems?.map(item =>
                                <figure className='cart--item' key={item?._id}>
                                    <div className="cart--top">
                                        <span>
                                            <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/products/${item?.images[0]}`} alt='ncdmnckd' />
                                            <p className='cart-item-name'>{item?.name}</p>
                                        </span>

                                        <p className='cart-item-price'>₦{numberConverter(item?.price)}</p>
                                    </div>

                                    <div className="cart--bottom">
                                        <button className='cart--bin' onClick={() => onRemove(item)}>
                                            <IoTrashBinOutline />
                                            Remove
                                        </button>

                                        {/* <div className='cart--quantity'>
                                            <button className='cart--icon' onClick={() => handleQuanInc(item, item?.quantity)}> <FiMinus /> </button>
                                            <span className='cart--num'> {item?.quantity} </span>
                                            <button className='cart--icon' onClick={() => handleQuanDec(item, item?.quantity)}> <FiPlus /> </button>
                                        </div> */}
                                    </div>
                                </figure>
                            )}

                            {cartItems.length === 0 && (
                                <p className='cart-item-name'>You have no item in cart (0)</p>
                            )}
                        </div>
                    </div>



                    <div className="cart--subtotal">
                        <p className='cart-sub-heading'>Checkout Price</p>
                        <span className='cart--info'>
                            <span>SUBTOTAL:</span>
                            <p>₦{numberConverter(totalPrice)}</p>
                        </span>
                        <button className='cart-checkout-btn'>Checkout</button>
                    </div>
                </div>

                <ProductCards title={'Top selling items'} isLoading={isLoading.topItem} products={topItems} />
            </main>

        </>
    )
}

export default index
