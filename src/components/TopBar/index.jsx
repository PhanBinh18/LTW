import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./styles.css";

function TopBar({ context }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Phan Thanh Binh
        </Typography>

        <Typography variant="h6" color="inherit" fontWeight="regular">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;