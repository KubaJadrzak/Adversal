import React from "react";
import { Link } from "react-router-dom"
import { Box, AppBar, Toolbar, IconButton} from "@mui/material";
import { faUser } from '@fortawesome/free-solid-svg-icons'
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
            </Toolbar>
          </AppBar>
        </Box>
      )
}

export default Navbar