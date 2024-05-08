import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

function CategorySkeleton() {
  return (
    <div className='category--cards-grid'>
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
        <Skeleton height={"24rem"} width={'100%'} baseColor="#eee" />
    </div>
  )
}

export default CategorySkeleton
