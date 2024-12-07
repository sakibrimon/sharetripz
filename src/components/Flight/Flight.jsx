import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Destination from "../Destination/Destination";
import Origin from "../Origin/Origin";
import RoundTripDP from "../RoundTripDP/RoundTripDP";
import OneWayDP from "../OneWayDP/OneWayDP";
import { useState } from "react";
import PropTypes from "prop-types";
import { RiArrowUpDownLine } from "react-icons/ri";

const Flight = ({ travelType, defOrigin, defDestination, defStartDate, defEndDate, airports, setFlightDetails }) => {
    const [ports, setPorts] = useState({
        origin: <Origin key="origin" defOrigin={defOrigin} airports={airports} setFlightDetails={setFlightDetails} />,
        destination: <Destination key="destination" defDestination={defDestination} airports={airports} setFlightDetails={setFlightDetails} />,
    });

    const swapPorts = () => {
        setPorts((prevPorts) => ({
            origin: prevPorts.destination,
            destination: prevPorts.origin,
        }));
        setFlightDetails((prevDetails) => ({
            ...prevDetails,
            departureAirport: prevDetails.arrivalAirport,
            arrivalAirport: prevDetails.departureAirport,
          }));
    };

    return (
        <div className="mt-5 lg:flex gap-5 items-center">
            <>
                {ports.origin}
                <FaArrowRightArrowLeft className="cursor-pointer hidden lg:inline" onClick={swapPorts} />
                <RiArrowUpDownLine className="ml-auto cursor-pointer lg:hidden" onClick={swapPorts} />
                {ports.destination}
            </>
            {travelType === "Round Trip" ? (
                <RoundTripDP defStartDate={defStartDate} defEndDate={defEndDate} setFlightDetails={setFlightDetails} />
            ) : (
                <OneWayDP defStartDate={defStartDate} setFlightDetails={setFlightDetails} />
            )}
        </div>
    );
};

Flight.propTypes = {
    travelType: PropTypes.string.isRequired,
    defOrigin: PropTypes.string.isRequired,
    defDestination: PropTypes.string.isRequired,
    defStartDate: PropTypes.instanceOf(Date).isRequired,
    defEndDate: PropTypes.instanceOf(Date).isRequired,
    airports: PropTypes.array.isRequired,
    setFlightDetails: PropTypes.func.isRequired,
}

export default Flight;