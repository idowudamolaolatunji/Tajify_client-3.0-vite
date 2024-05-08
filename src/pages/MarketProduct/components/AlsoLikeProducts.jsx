import React from 'react'
import CardsSkeleton from '../../Market/components/CardsSkeleton'
import Card from './Card'

function AlsoLikeProducts({ isLoading, products }) {

    console.log(products)
    return (
        <section className='product--cards-section' style={{ boxShadow: 'none' }}>
            <div className="top--part">
                <span className='cards-section-title' style={{ fontSize: '2rem' }}>You might also like</span>
            </div>

            <div className='bottom--part'>
                {isLoading && (
                    <CardsSkeleton extra={true} />
                )}
                <div className="product--cards-grid">
                    {products?.length > 0 && products?.map(product => (
                        <Card item={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AlsoLikeProducts
