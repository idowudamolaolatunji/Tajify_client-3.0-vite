import React from 'react';

import VehicleImage from '../../../assets/images/pngs/vehicle.png';
import { BiBookmark } from 'react-icons/bi'

function MarketFigure() {
  return (
    <figure className="products__figure">
        <div className="product__image">
            <img src={VehicleImage} alt={VehicleImage} />
        </div>
        <div className="product__bookmark">
            <BiBookmark />
        </div>
        <div className="product__info">
            <h5>Toyota Highlander 2018 ..</h5>
            <p>₦ 28,000,000</p>
        </div>
    </figure>
  )
}

export default MarketFigure;
