import { useEffect, useState } from 'react'
import './App.css'
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mobiles" element={<MobileList />} />
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

function Mobile({data}) {

  const [value, setValue] = useState(4);
  return (
    <Card className="mobile-container" >
      <div className="image-container">
        <img src={data.image} alt="" className='image-page' />
      </div>
      <CardContent>
        <div className="title-page">
          <h3>{data.title}</h3>
          <img src={data.site} alt="" className='site-page'/>
        </div>
        <div className="rating-page">
          <Rating name="simple-controlled" value={value} onChange={(event, newValue) => {setValue(newValue)}}/>
          <p>{ data.rading } Ratings</p>
        </div>
        <div className="price-page">
          <div className="offer-price">
            <p>offer : {data.offer}%</p>
            <h3>₹ { data.final_price}</h3>
          </div>
          <div className="final-price">
            <h3>M.R.P :₹ <span className='unprice'>{data.price}</span></h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MobileList() {
    const [mobileList, setMobileList] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:4000/mobiles", {
      method: 'GET',
    })
      .then((response) => response.json( ))
      .then((data) => setMobileList(data))
  },[])
  return (
    <div className='moblieList-container'>
      {mobileList.map((ele,index) => (<Mobile data={ ele } key={index} />))}
    </div>
  );
}