import { useEffect, useState } from "react";
import ReviewTile from "./ReviewTile";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewSection() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getreviews?id=${id}`)
      .then(({ data }) => {
        setRatings(data);
        console.log(ratings);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="Reviews mt-8 max-h-[600px] overflow-y-auto">
      <h2 id="reviews" className="text-xl font-semibold mb-2">Reviews</h2>
      {ratings && ratings.map(element => {
        return <ReviewTile key={element._id} rating={element.rating} review={element.review} name={element.name} datePosted={element.createdAt}/>
      })}
      {ratings.length == 0 && <h3 className="text-lg text-darkgray ml-2">No reviews yet!</h3>}
    </div>
  );
}
