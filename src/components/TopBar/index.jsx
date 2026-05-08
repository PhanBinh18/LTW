import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar({ context, currentUser, setCurrentUser }) {
  
  const handleLogout = async () => {
    try {
      // Gọi API POST tới /admin/logout với body rỗng
      await fetchModel("/admin/logout", "POST", {});
      // Xóa state người dùng hiện tại
      setCurrentUser(null);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    } finally {
      // DÙNG KHỐI FINALLY: Dù server có báo lỗi (như ảnh của bạn) hay thành công, 
      // Frontend vẫn sẽ ép xóa state và đẩy người dùng về màn hình Login.
      setCurrentUser(null);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
      
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" color="inherit">
            Phan Thanh Binh
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <Typography variant="h6" color="inherit" fontWeight="regular">
            {context}
          </Typography>

          {currentUser ? (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Hi {currentUser.first_name}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout} size="small">
                Logout
              </Button>
            </Box>
          ) : (
            <Typography variant="subtitle1" fontWeight="bold" color="error">
              Please Login
            </Typography>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;