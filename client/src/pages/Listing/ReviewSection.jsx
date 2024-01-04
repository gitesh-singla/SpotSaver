import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import ReviewTile from "./ReviewTile";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewSection() {
  const userExists = true;
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getreviews?id=${id}`)
      .then(({ data }) => {
        setRatings(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {userExists && <ReviewModal />}
      {!userExists && <div>Login to add a review!</div>}
      {ratings && ratings.map(element => {
        <ReviewTile key={element._id} rating={element.rating} review={element.review} name={element.name} datePosted={element.createdAt}/>
      })}
    </div>
  );
}
