import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  // Trạng thái ban đầu là một mảng rỗng
  const [users, setUsers] = useState([]);

  // useEffect gọi API 1 lần duy nhất khi component vừa render
  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching user list:", err));
  }, []);

  if (users.length === 0) {
    return <Typography>Loading users...</Typography>;
  }

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;