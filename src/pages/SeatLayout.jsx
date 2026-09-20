import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const movie = dummyShowsData.find(
      (item) => item._id === id || String(item.id) === String(id)
    );

    if (!movie) {
      setShow(null);
      return;
    }

    const movieDateTimes = dummyDateTimeData[date] || [];
    setShow({
      movie,
      dateTime: dummyDateTimeData,
    });

    if (movieDateTimes.length > 0) {
      setSelectedTime(movieDateTimes[0]);
    }
  }, [id, date]);

  if (!show) return <Loading />;

  const timings = show.dateTime[date] || [];

  if (!timings.length) {
    return (
      <div className="px-6 md:px-16 lg:px-40 py-30 md:pt-50 text-center">
        <p className="text-xl font-semibold">No timings available for this date.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {timings.map((item) => (
            <button
              key={item.showId}
              type="button"
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">
                {new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-10 md:mt-0 md:pl-12">
        <p className="text-xl font-semibold">{show.movie.title}</p>
        <p className="mt-2 text-gray-300">Selected Date: {date}</p>
        {selectedTime && (
          <p className="mt-2 text-primary">
            Selected Time: {new Date(selectedTime.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
