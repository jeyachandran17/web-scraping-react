import { useEffect, useState } from 'react';
import { Earphone } from "./Earphone";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

export function EarphoneList() {
  const [mobileList, setMobileList] = useState([]);

  useEffect(() => {
    fetch("https://web-scraping-nodejs.vercel.app/earphones", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setMobileList(data));
  }, []);
  return (
    <div>
      <div className='moblieList-container'>
        {mobileList.map((ele, index) => (<Earphone data={ele} key={index} />))}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={3} color="primary" renderItem={(item) => (<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}{...item}/>)}/>
        </Stack>
      </div>
    </div>
  );
}
