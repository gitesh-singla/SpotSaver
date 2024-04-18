import { Link } from "react-router-dom";

function List({
  distance,
  address,
  _id,
  type,
  slots,
  price,
  rating,
  setHoveredIndex,
  hoveredIndex,
  index,
}) {
  const hoverClass = `list-cards shadow-lg rounded-lg block relative mb-4 duration-300 ${
    index == hoveredIndex ? "scale-105" : ""
  }`;

  const ratingColor = (rating) => {
    if(rating == 0) return "bg-gray";
    if(rating < 2) return "bg-red-500";
    if(rating < 4) return "bg-amber-200";
    return "bg-green-500";
  }

  return (
      <Link
        className={hoverClass}
        to={`/listing/${_id}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="list-card-header bg-secondary text-white flex justify-between p-2 rounded-md ">
          <div className="list-card-title text-lg font-semibold text-ellipsis">
            {address}
          </div>
          <div className="list-card-spots text-lg  font-semibold">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        </div>
        <div className="list-card-detail flex justify-around text-dark">
          <div className="list-card-detail-money flex flex-col text-center p-2">
            <div className="text-2xl p-0.5">₹{price}</div>
            <div className="text-base ">per hour</div>
          </div>
          <div className="list-card-detail-dist  flex flex-col text-center p-2">
            <div className="text-2xl p-0.5">{distance}</div>
            <div className="text-base ">Km Away</div>
          </div>
          <div className="list-card-detail-rating  flex flex-col text-center p-2">
            <div className={`text-2xl p-0.5 rounded-lg ${ratingColor(rating)}`}>
              {rating>0 ? rating : '-'}
            </div>
            <div className="text-base ">stars</div>
          </div>
        </div>
      </Link>
  );
}
export default List;
