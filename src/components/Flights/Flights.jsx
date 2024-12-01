import { useState } from "react";
import Flight from "../Flight/Flight";
import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useLoaderData } from "react-router";
import { addDays } from "date-fns";
import PropTypes from "prop-types";
import { getOrdinalSuffix } from "../../utils";

const Flights = ({ travelType, defOrigin0, defDestination0, defStartDate0, defOrigin1, defDestination1, defStartDate1 }) => {
    const [flights, setFlights] = useState([
        <Flight
            key={0}
            travelType={travelType}
            defOrigin={defOrigin0}
            defDestination={defDestination0}
            defStartDate={defStartDate0}
        />,
        <Flight
            key={1}
            travelType={travelType}
            defOrigin={defOrigin1}
            defDestination={defDestination1}
            defStartDate={defStartDate1}
        />,
    ]);

    const airports = useLoaderData();

    const handleAddFlights = () => {
        setFlights((prevFlights) => {
            const lastFlight = prevFlights[prevFlights.length - 1];
            const defOrigin = lastFlight.props.defDestination; // Set defOrigin to the last flight's defDestination
            const defDestination = airports[prevFlights.length + 1]?.iata_code || ""; // Get the iata_code based on the length
            const newFlight = (
                <Flight
                    key={prevFlights.length}
                    travelType={travelType}
                    defOrigin={defOrigin}
                    defDestination={defDestination}
                    defStartDate={addDays(lastFlight.props.defStartDate, 3)}
                />
            );

            return [...prevFlights, newFlight];
        });
    };

    const handleRemoveFlight = (index) => {
        setFlights((prevFlights) => prevFlights.filter((_, i) => i !== index));
    };

    return (
        <div>
            {/* Render Flights */}
            {flights.map((flight, index) => (
                <div key={flight.key} className="relative">
                    <div className="mt-5 flex justify-between items-center lg:hidden">
                        <div className="btn btn-xs btn-info">{getOrdinalSuffix(index + 1)} Flight</div>

                        {/* Show Remove Button for Flights Beyond the First Two - on Smaller Screens */}
                        {index >= 2 && (
                            <button onClick={() => handleRemoveFlight(index)}
                                title="Remove Flight"
                            >
                                <MdCancel className="text-xl" />
                            </button>
                        )}
                    </div>

                    {flight}

                    {/* Show Remove Button for Flights Beyond the First Two - on Larger Screens */}
                    {index >= 2 && (
                        <div
                            className="absolute top-1/2 left-1/2# right-0 transform -translate-x-1/2 -translate-y-1/2 hidden lg:inline"
                            onClick={() => handleRemoveFlight(index)}
                            title="Remove Flight"
                        >
                            <MdCancel className="text-xl" />
                        </div>
                    )}
                </div>
            ))}

            <div
                className="mt-5 btn btn-outline btn-info lg:btn-ghost inline-flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddFlights}
                disabled={flights.length >= 5} // Disable if flights are already 5
            >
                <FaPlus />
                <span>Add more flights</span>
            </div>
        </div>
    );
};

Flights.propTypes = {
    defOrigin0: PropTypes.string.isRequired,
    travelType: PropTypes.string.isRequired,
    defDestination0: PropTypes.string.isRequired,
    defStartDate0: PropTypes.instanceOf(Date).isRequired,
    defOrigin1: PropTypes.string.isRequired,
    defDestination1: PropTypes.string.isRequired,
    defStartDate1: PropTypes.instanceOf(Date).isRequired,
    defEndDate1: PropTypes.instanceOf(Date).isRequired,
}

export default Flights;
