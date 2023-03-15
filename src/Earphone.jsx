import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export function Earphone({ data }) {

  const [value, setValue] = useState(4);
  return (
    <Card className="mobile-container">
      <div className="image-container">
        <img src={data.image} alt="" className='image-page' />
      </div>
      <CardContent>
        <div className="title-page">
          <h3>{data.title}</h3>
          <img src={data.site} alt="" className='site-page' />
        </div>
        <div className="rating-page">
          <Rating name="simple-controlled" value={value} onChange={(_event, newValue) => { setValue(newValue); }} />
          <p>{data.rading} Ratings</p>
        </div>
        <div className="price-page">
          <div className="offer-price">
            <p>offer : {data.offer}%</p>
            <h3>₹ {data.final_price}</h3>
          </div>
          <div className="final-price">
            <h3>M.R.P :₹ <span className='unprice'>{data.price}</span></h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
