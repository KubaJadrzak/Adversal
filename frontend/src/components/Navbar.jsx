import React from "react";
import { Box, AppBar, Toolbar, IconButton} from "@mui/material";
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate()
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={() => {navigate(`/catalog`)}}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/`)}}>
              <FontAwesomeIcon icon={faHome} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/cart`)}}>
              <FontAwesomeIcon icon={faCartShopping} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      )
}

export default Navbar