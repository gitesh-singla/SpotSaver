import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ReviewModal() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { id } = useParams();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:4000/addreview",
        { rating, review, spot_id: id },
        { withCredentials: true }
      );
      setRating(0);
      setReview("");
    } catch (error) {
      console.log(error.response, "in ReviewModal:handleSubmit");
    }
  };

  return (
    <div className="flex flex-col w-80">
      <div>Add a review</div>
      <Rating
        onClick={handleRating}
        SVGclassName={"inline-block"}
        initialValue={rating}
      />
      <textarea
        name="review"
        id="review"
        cols="30"
        rows="2"
        className="resize-none border-2"
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    // SVGclassName={"inline-block"} fixes stars aligned vertically
  );
}
