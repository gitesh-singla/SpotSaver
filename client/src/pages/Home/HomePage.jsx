import { Link } from "react-router-dom";
import RangePicker from "./RangePicker";
import { useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";

export default function HomePage() {
  const { startTime, endTime } = useContext(DateContext);

  return (
    <section className="section-container bg-bottom bg-contain bg-no-repeat mt-6 noselect" style={{backgroundImage: "url('home-city.jpg')"}}>
      <div className="max-w-content mb-20" se>
        <div className="heading text-dark mb-12">
          <h1 className="heading-title text-[6.25rem] tracking-widest text-center font-black mb-[-3.125rem]">
            <span className="text-[11.25rem]">S</span>POTSAVER
          </h1>
          <p className="motto text-center text-dark text-7xl">
            <span className="text-secondary text-4xl font-black">SAVE</span>.
            <span className="text-secondary text-4xl font-black">SPOT</span>.
            <span className="text-secondary text-4xl font-black">ANYWHERE</span>.
            <span className="text-secondary text-4xl font-black">ANYTIME</span>
          </p>
        </div>
        <div className="description mb-12">
          <p className="text-center text-darkgray text-4xl">
            Finding parking shouldn't be a hassle.
          </p>
          <p className="text-center text-darkgray text-4xl">
            Let's get you parked and on to the bigger things.
          </p>
        </div>
        <div className="find-parking text-white rounded-e  flex flex-col items-center">
          <RangePicker />
          <Link
            className="flex items-center justify-center px-8 py-4 bg-primary shadow-xl rounded-full mt-1 mb-4  hover:scale-105 active:scale-100 transition duration-200"
            to={"/listings"}
          >
            <img className="h-8" src="./direction-arrow.svg" alt="" />
            <p className="text-2xl font-bold text-white pl-4">
              Find parking near me!
            </p>
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
}
