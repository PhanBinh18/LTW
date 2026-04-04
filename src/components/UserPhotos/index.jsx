import React, { useState, useEffect } from "react";
import { Typography, Card, CardMedia, CardContent, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => setPhotos(data))
      .catch((err) => console.error("Error fetching photos:", err));
  }, [userId]);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">Loading photos...</Typography>;
  }

  return (
    <Box>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="User uploaded"
            sx={{ maxHeight: 500, objectFit: 'contain', bgcolor: '#f5f5f5' }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Posted on: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Comments
            </Typography>

            {photo.comments ? (
              photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1976d2' }}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    : {comment.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;