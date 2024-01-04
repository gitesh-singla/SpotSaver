import { Rating } from "react-simple-star-rating";

export default function ReviewTile(props) {
    
  function formatDateString(dateString) {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  }

  return (
    <div className="max-w-xl">
      <div className="flex justify-between">
        <div className="font-bold text-lg">{props.name}</div>
        <div className="font-light">{formatDateString(props.datePosted)}</div>
      </div>
      <Rating
        SVGclassName={"inline-block"}
        initialValue={props.rating}
        readonly
      />
      <div>{props.review}</div>
    </div>
  );
}
