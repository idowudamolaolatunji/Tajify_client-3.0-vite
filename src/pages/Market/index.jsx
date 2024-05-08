import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import MarketCategorySidebar from './components/MarketCategorySidebar';
import MarketHeroSlider from './components/MarketHeroSlider';

import './main.css';
import ProductCards from './components/ProductCards';
import MarketCategory from './components/MarketCategory';
import ImgBanner from './components/ImgBanner';

function index() {
    const [isLoading, setIsLoading] = useState({
        category: true,
        // ads: true,
        ads: false,
        top: true,
        hot: true,
        phone: true,
        healthbeauty: true,
    });

    const [ads, setAds] = useState([]);
    const [topProducts, setTopProducts] = useState([])
    const [hotProducts, setHotProducts] = useState([])
    const [phonesProducts, setPhonesProducts] = useState([])
    const [healthbeautyProducts, setHealthbeautyProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    function findCategoryByName(name) {
        return categories?.filter(cat => cat.categoryName === name)
    }

    useEffect(function() {
        async function handleFetchCategories() {
            try {

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/market/all-category`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Something went wrong');
                const data = await res.json();
                if(data.status !== 'success') throw new Error(data.message);

                setCategories(data?.data?.categories)

            } catch(err) {
                console.log(err.message)
            } finally {
                setIsLoading(prev => ({
                    ...prev,
                    category: false
                }));
            }
        }
        handleFetchCategories();
    }, []);


    useEffect(function() {
        async function fetchAllProducts() {
            const baseUrl = import.meta.env.VITE_SERVER_URL;
            const headers = {
                "Content-Type": "application/json",
            }
            const method = 'GET'
            try {

                const [topProductsRes, hotProductsRes, phonesProductsRes, healthbeautyProductsRes] = await Promise.all([
                    fetch(`${baseUrl}/market/products/top-selling`, { method, headers }),
                    fetch(`${baseUrl}/market/products/hot-deals`, { method, headers }),
                    fetch(`${baseUrl}/market/products/other-category-section/${findCategoryByName('Phone & Tablets')[0]?.slug}`, { method, headers }),
                    fetch(`${baseUrl}/market/products/other-category-section/${findCategoryByName('Health & Beauty')[0]?.slug}`, { method, headers }),
                ])
    
                if (!topProductsRes.ok || !hotProductsRes.ok || !phonesProductsRes.ok || !healthbeautyProductsRes.ok) {
                    throw new Error('Something went wrong');
                }

                const [topProductsData, hotProductsData, phonesProductsData, healthbeautyProductsData] = await Promise.all([
                    topProductsRes.json(),
                    hotProductsRes.json(),
                    phonesProductsRes.json(),
                    healthbeautyProductsRes.json(),
                ]);

                setTopProducts(topProductsData?.data?.products);
                setHotProducts(hotProductsData?.data?.products);
                setPhonesProducts(phonesProductsData?.data?.products);
                setHealthbeautyProducts(healthbeautyProductsData?.data?.products);
    
            } catch(err) {
                console.log(err.message)
            } finally {
                setIsLoading(prev => ({
                    ...prev,
                    top: false,
                    hot: false,
                    phone: false,
                    healthbeauty: false,
                }));
            }
        }

        if(categories) {
            fetchAllProducts();
        }
    }, [categories]);


    console.log(hotProducts)

    return (
        <>
            <Header />

            <main className='market--container'>
                <div className="market--hero">
                    <MarketCategorySidebar isLoading={isLoading?.category} categories={categories} />
                    <MarketHeroSlider />
                </div>

                <MarketCategory isLoading={isLoading?.category} categories={categories} />
                <ProductCards title={'Top selling product'} isLoading={isLoading.top} products={topProducts} />

                <ImgBanner isLoading={isLoading.ads} img={ads[0]} />
                <ProductCards title={'Hot Deals'} isLoading={isLoading.hot} products={hotProducts} />
                <ProductCards title={'Phones and accesseries'} isLoading={isLoading.phone} products={phonesProducts} />

                <ImgBanner isLoading={isLoading.ads} img={ads[1]} />
                <ProductCards title={'Health & Beauty Deals'} isLoading={isLoading.healthbeauty} products={healthbeautyProducts} />
            </main>

        </>
    )
}

export default index