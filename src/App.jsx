import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MobileList } from './MobileList';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import { EarphoneList } from './EarphoneList';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const navigate = useNavigate();
  const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setsearch] = useState("")

  return (
    <Paper elevation={10} sx={bgstyle}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            {/* <Button color="inherit" >Login</Button> */}
            <img className='logo' src='https://download.logo.wine/logo/GIMP/GIMP-Logo.wine.png' alt='logo' onClick={() => navigate('/')} />
            <Button variant='contained' id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>Category</Button>
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem onClick={()=>navigate('/mobiles',handleClose())}>Mobiles</MenuItem>
                <MenuItem onClick={()=>navigate('/earphones',handleClose())}>Earphone</MenuItem>
                <MenuItem onClick={()=>navigate('/smartwatch',handleClose())}>Smartwatch</MenuItem>
            </Menu>
            <div className='search-box'>
              <input className='search' onChange={(event)=>setsearch(event.target.value)} />
              <Button variant='primary' onClick={()=>console.log(search)}><SearchIcon/></Button>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mobiles" element={<MobileList />} />
          <Route path="/earphones" element={<EarphoneList />} />
          <Route path="/smartwatch" element={<SmartwatchList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Paper>
  );
}

export default App

function Home() {
  return (
    <div className="home-page">
      <h1>the web scriaping </h1>
    </div>
  );
}

function SmartwatchList() {
  const [mobileList, setMobileList] = useState([]);

  useEffect(() => {
    fetch("https://web-scraping-nodejs.vercel.app/smartwatch", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setMobileList(data));
  }, []);


  return (
    <div>
      <div className='moblieList-container'>
        {mobileList.map((ele, index) => (<Smartwatch data={ele} key={index} />))}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={3} color="primary" renderItem={(item) => (<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}{...item}/>)}/>
        </Stack>
      </div>
    </div>
  );
}

function Smartwatch({ data }) {

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

function PageNotFound() {
  return (
    <div className="not-found">
      <img className="not-found-img" src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif" alt="Page Not Found" />
      <p className="not-fount-text">{`Page Not fount, pleace chack find the correct URL`}</p>
    </div>
  );
}



