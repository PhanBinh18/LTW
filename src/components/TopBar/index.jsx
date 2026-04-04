import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [rightContextText, setRightContextText] = useState("Photo Sharing App");

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    
    if (pathParts.length === 3) {
      const routeType = pathParts[1];
      const userId = pathParts[2];

      // Gửi request lấy thông tin người dùng dựa vào ID trên URL
      fetchModel(`/user/${userId}`)
        .then((user) => {
          if (routeType === "users") {
            setRightContextText(`${user.first_name} ${user.last_name}`);
          } else if (routeType === "photos") {
            setRightContextText(`Photos of ${user.first_name} ${user.last_name}`);
          }
        })
        .catch((err) => {
          console.error("Error fetching context:", err);
          setRightContextText("Photo Sharing App"); // Fallback nếu lỗi
        });
    } else {
      setRightContextText("Photo Sharing App");
    }
  }, [location]); // Chạy lại API mỗi khi URL (location) thay đổi

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Your Name
        </Typography>

        <Typography variant="h6" color="inherit" fontWeight="regular">
          {rightContextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;