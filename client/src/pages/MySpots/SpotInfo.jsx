export default function SpotInfo({spot}) {
  return (
    <div className="spotTile bg-tblue w-full max-w-4xl p-4 rounded-xl text-white">
        <h2>{spot.address}</h2>
        <p>{spot.description}</p>
        <span className="mr-6">Rs. {spot.price}/Hour</span><span>{spot.slots} slots</span>
    </div>
  )
}
