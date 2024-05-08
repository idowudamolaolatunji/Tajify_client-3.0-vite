import React, { useEffect, useState } from 'react'
import img from '../../assets/images/market-slide/JAMBO-386217671699001999.jpg';
import Header from '../../components/Header';
import AlsoLikeProducts from './components/AlsoLikeProducts';
import MainSpinner from '../../components/MainSpinner';
import { useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';
import { numberConverter, truncateText } from '../../utils/helper';
import { useCartContext } from '../../context/CartContext';



function index() {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingAlso, setIsLoadingAlso] = useState(true);
    const [showAllDes, setShowAllDes] = useState(false);
    const [item, setItem] = useState({});
    const [alsoLikeProducts, setAlsoLikeProducts] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const { productSlug } = useParams();
    console.log(productSlug)

    const { onAdd } = useCartContext();

    const handleAddToCart = () => {
        onAdd(item, 1);

        setIsSuccess(true);
        setMessage('Item added to Cart');
        setTimeout(function () {
            setIsSuccess(false);
            setMessage("");
        }, 2000);
    };

     // HANDLE ON FETCH FAILURE
     function handleFailure(mess) {
        setIsError(true);
        setMessage(mess)
        setTimeout(() => {
            setIsError(false);
            setMessage('')
        }, 3000);
    }

    // HANDLE FETCH STATE RESET
    function handleReset() {
        setIsError(false);
        setMessage('')
        setIsSuccess(false);
    }

    useEffect(function() {
        async function fetchProductBySlug() {
            try {
                setIsLoading(true)

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/market/products/slug/${productSlug}`, {
                    methods: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Error loading product')

                const data = await res.json();
                if(data.status !== "success") throw new Error(data.message)

                setItem(data?.data?.product)

            } catch(err) {
                handleFailure(err.messgae)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProductBySlug();

        window.scrollTo(0, 0)
    }, [productSlug]);

    useEffect(function() {
        async function fetchAlsoLikeProducts() {
            try {
                setIsLoadingAlso(true)

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/market/products/also-like/${productSlug}`, {
                    methods: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Error loading product')

                const data = await res.json();
                if(data.status !== "success") throw new Error(data.message)

                setAlsoLikeProducts(data?.data?.similarProducts)

            } catch(err) {
                handleFailure(err.messgae)
            } finally {
                setIsLoadingAlso(false)
            }
        }
        fetchAlsoLikeProducts();
    }, [productSlug]);

  return (
    <>
        <Header />

        {isLoading && (
            <MainSpinner />
        )}

        <main className="product--page-contaner">

            <section className="product--hero-section">
                <div className="product-image-box">
                    <div className='product-image'>
                        <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/products/${item?.images?.at(currIndex)}`} alt={item?.name} />
                    </div>

                    <span className='product-subimages'>
                        {item?.images?.length > 0 &&
                            item?.images?.map((img, index) => {
                                return <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/products/${img}`} className={currIndex === index ? 'active-sub' : ''} onClick={() => setCurrIndex(index)} alt={img} />
                            })
                        }
                    </span>
                </div>

                <div className="product-contect-box">
                    <p className="product--heading">{item?.name}</p>
                    <span className="product--price">₦{numberConverter(item?.price)}</span>

                    <p className='product--sub-heading'>PRODUCT DESCRIPTION</p>
                    <span>
                        {/* <p className="product--description">{showAllDes ? item?.description : truncateText(item?.description, 600)}</p> */}
                        <p className="product--description">{showAllDes ? item?.description : truncateText(item?.description, 70)}</p>

                        <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ff0066', cursor: 'pointer' }} onClick={() => setShowAllDes(!showAllDes)}>show {showAllDes ? 'less' : 'more'}..</span>
                    </span>

                    <button onClick={handleAddToCart} className="product--btn">Add to cart</button>
                </div>

                <div className="product--specs">
                    <p className="product--sub-heading" style={{ color: '#ff0066' }}>PRODUCT SPECIFICATIONS</p>

                    <ul className='product--specs-list'>
                        {item?.specifications?.length > 0 && item?.specifications?.map(spec => (
                            <li>{spec}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <AlsoLikeProducts isLoading={isLoadingAlso} products={alsoLikeProducts} />
        </main>

        {(isError || isSuccess) && (
                <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
                    {isSuccess ? (
                        <AiFillCheckCircle className="alert--icon" />
                    ) : isError && (
                        <AiFillExclamationCircle className="alert--icon" />
                    )}
                    <p>{message}</p>
                </Alert>
        )}
    </>
  )
}

export default index
