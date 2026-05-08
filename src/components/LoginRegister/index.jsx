import React, { useState } from "react";
import { Typography, Button, TextField, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function LoginRegister({ setCurrentUser }) {
  const [loginName, setLoginName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi reload trang mặc định của form
    try {
      // Gọi API POST tới /admin/login với body chứa login_name
      const response = await fetchModel("/admin/login", "POST", { login_name: loginName });
      
      // Nếu thành công, cập nhật state toàn cục và xóa lỗi
      setCurrentUser(response.data);
      setErrorMsg("");
      // dieu huong
      navigate(`/users/${response.data._id}`);
      
    } catch (error) {
      // Nếu thất bại, hiển thị thông báo lỗi
      setErrorMsg("Tên đăng nhập không tồn tại. Vui lòng thử lại!");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: "0 auto", marginTop: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Đăng nhập
      </Typography>
      
      <form onSubmit={handleLogin}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Tên đăng nhập (login_name)"
            variant="outlined"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            required
            autoFocus
          />
          
          {/* Hiển thị lỗi nếu có */}
          {errorMsg && (
            <Typography color="error" variant="body2">
              {errorMsg}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default LoginRegister;