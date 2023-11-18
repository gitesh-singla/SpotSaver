import { Link, Navigate } from "react-router-dom";

function List({ distance, address, _id, slots, price, setHoveredIndex, hoveredIndex,  index }) {
  const hoverClass = `list-cards shadow-sh rounded-lg block w-[95%] bg-white relative m-[0.625em] p-[0.625em] duration-300 ${index == hoveredIndex ? 'scale-105' : ''}`;

  return (
    <>
      <Link
        className={hoverClass}
        to={`/listing/${_id}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="list-card-header bg-[#2963a3] text-white flex justify-between p-[0.625em] rounded-md ">
          <div className="list-card-title text-xl font-semibold">{address}</div>
          <div className="list-card-spots text-xl  font-semibold">{slots} spots</div>
        </div>
        <div className="list-card-detail flex text-[#211e1e]">
          <div className="list-card-detail-money flex flex-col w-1/2 text-center p-[0.375em] text-2xl">
            <div className="text-3xl p-0.5">₹{price}</div>
            <div className="text-lg ">per hour</div>
          </div>
          <div className="list-card-detail-time  flex flex-col w-1/2 text-center p-[0.375em] text-2xl">
            <div className="text-3xl p-0.5">{distance}</div>
            <div className="text-lg ">Km Away</div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default List;
