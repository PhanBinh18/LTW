import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ setTopBarContext }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // 1. Fetch danh sách ảnh để hiển thị ở trang này
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.log(error));

    // 2. Fetch thông tin User để lấy cái tên đưa lên TopBar
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setTopBarContext(`Photos of ${response.data.first_name} ${response.data.last_name}`);
      })
      .catch((error) => console.log(error));
      
  }, [userId, setTopBarContext]);
  if (photos.length === 0) return <Typography>Loading...</Typography>;

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <CardHeader title={`Photo created: ${photo.date_time}`} />
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
                  {comment.date_time}
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