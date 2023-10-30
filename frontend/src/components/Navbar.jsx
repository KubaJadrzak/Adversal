import React from "react";
import { Link } from "react-router-dom"
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
            </Toolbar>
          </AppBar>
        </Box>
      )
}

export default Navbar