import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  
  let rightContextText = "Photo Sharing App"; // Mặc định

  // Phân tích URL: nếu mảng có 3 phần tử (VD: ['', 'users', '123'])
  if (pathParts.length === 3) {
    const routeType = pathParts[1];
    const userId = pathParts[2];
    const user = models.userModel(userId);

    if (user) {
      if (routeType === "users") {
        rightContextText = `${user.first_name} ${user.last_name}`;
      } else if (routeType === "photos") {
        rightContextText = `Photos of ${user.first_name} ${user.last_name}`;
      }
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Phần bên trái: Đổi thành tên thật của bạn */}
        <Typography variant="h5" color="inherit">
          Your Name
        </Typography>

        {/* Phần bên phải: Ngữ cảnh App */}
        <Typography variant="h6" color="inherit" fontWeight="regular">
          {rightContextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;