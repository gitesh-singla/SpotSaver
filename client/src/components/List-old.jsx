function List({distance, address}) {
  return (
    <>
      <div className="w-full ">
        <div className="h-28 bg-white  shadow-sm shadow-primary rounded m-2 flex">
          <img src={"parking.png"} className="rounded"></img>
          <div className="flex-col justify-around p-2">
            <h3>{address}</h3>
            <p>{distance}Km Away</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default List;
