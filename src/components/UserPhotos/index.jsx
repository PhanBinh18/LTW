import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ setTopBarContext }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, photosRes] = await Promise.all ([
          fetchModel(`/user/${userId}`),
          fetchModel(`/photosOfUser/${userId}`)
        ]);
        
        setPhotos(photosRes.data);
        setTopBarContext(`Photos of ${userRes.data.first_name} ${userRes.data.last_name}`);
      } catch (error) {
        console.log(error);
        throw (error);
      }
    }

    loadData();
  }, [userId, setTopBarContext]);

  if (photos.length === 0) return <Typography>Loading...</Typography>;

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <CardHeader title={`Photo created: ${new Date(photo.date_time).toLocaleString()}`} />
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="User photo"
          />
          <CardContent>
            {photo.comments && photo.comments.map((comment) => (
              <div key={comment._id}>
                <Typography variant="body2">
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  : {comment.comment}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(comment.date_time).toLocaleString()}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;