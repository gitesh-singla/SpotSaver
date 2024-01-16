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
    return date.toLocaleString("en-IN", options);
  }

  return (
    <div className="border-t-2 border-lightgray mb-2">
      <div className="flex gap-2 items-center mt-2">
        <img src="/user-review.svg" alt="#" width={"24px"} />
        <div className="font-bold">{props.name}</div>
      </div>
      <Rating
        SVGclassName={"inline-block w-[22px]"}
        initialValue={props.rating}
        readonly
      />
      <div className="font-semibold text-gray">
        Reviewed on {formatDateString(props.datePosted)}
      </div>
      <div className="text-darkgray font-semibold">{props.review}</div>
    </div>
  );
}
