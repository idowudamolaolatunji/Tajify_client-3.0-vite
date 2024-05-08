import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
// import CatsProductCards from './components/CatsProductCards';

function index() {

    const { categorySlug, categoryName } = useParams();
    console.log(categorySlug)


    useEffect(function() {
        async function fetchCategoryProducts() {
            try {

            } catch(err) {

            } finally {

            }
        }

        fetchCategoryProducts();
    }, [])

    return (
        <>
            <Header />

            <section className="">
                <div className="cat--top">
                    <p>{categoryName}</p>
                </div>

                <div className="cat--products">
                    <div className="products--top-filter"><span>filter</span> <span>tools</span></div>

                    <div className="product--grid">
                        {/* <CatsProductCards /> */}
                    </div>
                </div>
            </section>

        </>
    )
}

export default index
