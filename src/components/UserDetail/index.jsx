import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading user details...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Description:</strong> {user.description}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;