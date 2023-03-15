import { useEffect, useState } from 'react';
import { Mobile } from './Mobile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

export function MobileList() {
  const [mobileList, setMobileList] = useState([]);

  useEffect(() => {
    fetch("https://web-scraping-nodejs.vercel.app/mobiles", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setMobileList(data));
  }, []);
  return (
    // <div className='moblieList-container'>
    //   {mobileList.map((ele, index) => (<Mobile data={ele} key={index} />))}
    // </div>
    <div>
      <div className='moblieList-container'>
        {mobileList.map((ele, index) => (<Mobile data={ele} key={index} />))}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={3} color="primary" renderItem={(item) => (<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}{...item}/>)}/>
        </Stack>
      </div>
    </div>
  );
}

