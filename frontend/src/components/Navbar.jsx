import React from "react";
import { Box, AppBar, Toolbar, IconButton} from "@mui/material";
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import './Navbar.css'
import Adversal from '../assets/adversal-white.png'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation();


  const handleSubmit = ({ query }) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    const searchParams = new URLSearchParams(currentSearch);

    searchParams.set('query', encodeURIComponent(query));

    if (currentPath.includes("/products")) {
      navigate(`${currentPath}?${searchParams.toString()}`);
    } else {
      navigate(`/products?${searchParams.toString()}`);
    }
  };

  const isLoginPage = location.pathname.includes('login')

  if (isLoginPage) {
    return null;
  }


    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Box className='navbar'>
            <Box className='navbar-search'>
              <a href="/" className="navbar-logo-link">
                <img src={Adversal} alt='logo' className="navbar-logo"/>
              </a>
              {!location.pathname.includes('/account') &&
                <SearchBar handleSubmit={handleSubmit}/>
              }
            </Box>
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={() => {navigate(`/account`)}}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/`)}}>
              <FontAwesomeIcon icon={faHome} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/cart`)}}>
              <FontAwesomeIcon icon={faCartShopping} />
            </IconButton>
          </Toolbar>
          </Box>
        </AppBar>
      </Box>
      )
}

export default Navbar