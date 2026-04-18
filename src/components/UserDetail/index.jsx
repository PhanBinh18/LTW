import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/user/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h4">{user.first_name} {user.last_name}</Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Description: {user.description}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;