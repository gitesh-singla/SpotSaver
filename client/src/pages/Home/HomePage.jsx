import { Link } from "react-router-dom";
import RangePicker from "./RangePicker";
import { useContext } from "react";
import { DateContext } from "../../DateContext";

export default function HomePage() {
  const {startTime, endTime} = useContext(DateContext);

  return (
    <>
      <div className=" bg-cover h-3/4 border-b-8 border-[#a0c5d8] border-solid">
        <div className="heading text-[#495057]">
          <h1 className="heading-title text-[6.25rem] tracking-widest text-center font-black mb-[-3.125rem]">
            <span className="text-[11.25rem]">S</span>POTSAVER
          </h1>
          <p className="motto text-center text-[#ffaf1a] text-7xl">
            <span className="text-[#495057] text-4xl font-black">SAVE</span>.
            <span className="text-[#495057] text-4xl font-black">SPOT</span>.
            <span className="text-[#495057] text-4xl font-black">ANYWHERE</span>
            .
          </p>
        </div>
        <div className="description p-8">
          <p className="text-center text-[#43525a] text-4xl">
            Finding parking shouldn't be a hassle.
          </p>
          <p className="text-center text-[#43525a] text-4xl">
            Let's get you parked and on to the bigger things.
          </p>
        </div>
        <div className="find-parking text-white rounded-e  flex flex-col items-center">
          <Link className="flex items-center justify-center px-8 py-4 bg-[#f2555c] shadow-xl border-[#f2555c] rounded-full mt-1 mb-4"
          to={"/listings"}>
            <img className="h-8" src="./direction-arrow.svg" alt="" />
            <p className="text-2xl font-bold text-white pl-4">
              Find parking near me!
            </p>
          </Link>
          <RangePicker  />
        </div>
        <div></div>
      </div>
    </>
  );
}
