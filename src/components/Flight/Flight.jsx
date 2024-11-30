import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Destination from "../Destination/Destination";
import Origin from "../Origin/Origin";
import RoundTripDP from "../RoundTripDP/RoundTripDP";
import OneWayDP from "../OneWayDP/OneWayDP";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";


const Flight = ({ travelType, defOrigin, defDestination, defStartDate, defEndDate }) => {
    const [ports, setPorts] = useState({
        origin: <Origin key="origin" defOrigin={defOrigin} />,
        destination: <Destination key="destination" defDestination={defDestination} />,
    });

    const swapPorts = () => {
        setPorts((prevPorts) => ({
            origin: prevPorts.destination,
            destination: prevPorts.origin,
        }));
    };

    return (
        <div className="mt-5 flex gap-5 items-center">
            <>
                {ports.origin}
                <FaArrowRightArrowLeft className="cursor-pointer" onClick={swapPorts} />
                {ports.destination}
            </>
            {travelType === "Round Trip" ? (
                <RoundTripDP defStartDate={defStartDate} defEndDate={defEndDate} />
            ) : (
                <OneWayDP defStartDate={defStartDate} />
            )}
            {travelType !== "Multi City" &&
            <button className="btn">
                <IoIosSearch className="text-2xl" />
            </button>}
        </div>
    );
};

Flight.propTypes ={
    travelType: PropTypes.string.isRequired,
    defOrigin: PropTypes.string.isRequired,
    defDestination: PropTypes.string.isRequired,
    defStartDate: PropTypes.instanceOf(Date).isRequired,
    defEndDate: PropTypes.instanceOf(Date).isRequired,
}

export default Flight;