import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ReviewModal({setReviewModalOpen, reservation_id, spot_id}) {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");


  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:4000/addreview",
        { rating, review, spot_id, reservation_id },
        { withCredentials: true }
      );
      setRating(0);
      setReview("");
      setReviewModalOpen(false);
    } catch (error) {
      console.log(error.response, "in ReviewModal:handleSubmit");
    }
  };

  return (
    <div className="modal">
      <div className="bg-white p-4 rounded border-primary border-2 text-gray min-w-[300px] modal-content flex flex-col">
        <div className="flex justify-between">
          <h2 className="font-semibold text-primary text-lg">Add a review</h2>
          <button className="bg-red-500 rounded-full text-white px-2 active:scale-95" onClick={() => setReviewModalOpen(false)}>X</button>
        </div>
        <h3 className="text-gray">Rating:</h3>
        <Rating
          onClick={handleRating}
          SVGclassName={"inline-block"}
          initialValue={rating}
        />
        <textarea
          name="review"
          id="review"
          cols="30"
          rows="4"
          className="resize-none border-2 mt-4 outline-none px-2 rounded mb-2"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></textarea>
        <button onClick={handleSubmit} className="bg-primary hover:bg-primary active:scale-95 transition duration-200 text-white text-lg rounded py-2">Submit</button>
      </div>
    </div>
  );
}
