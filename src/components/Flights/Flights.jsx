import { useState } from "react";
import Flight from "../Flight/Flight";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useLoaderData } from "react-router";
import { addDays } from "date-fns";

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
            const defDestination = airports[prevFlights.length - 1]?.iata_code || ""; // Get the iata_code based on the length
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
                    {flight}

                    {/* Show Remove Button for Flights Beyond the First Two */}
                    {index >= 2 && (
                        <button
                            className="absolute top-1/2 left-1/2# right-0 transform -translate-x-1/2 -translate-y-1/2"
                            onClick={() => handleRemoveFlight(index)}
                            title="Remove Flight"
                        >
                            <MdCancel className="text-xl" />
                        </button>
                    )}
                </div>
            ))}

            {/* Buttons */}
            <div className="mt-5 flex justify-between items-center">
                <button
                    className="btn btn-ghost flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAddFlights}
                    disabled={flights.length >= 5} // Disable if flights are already 5
                >
                    <FaPlus />
                    <span>Add more flights</span>
                </button>
                <button className="btn flex items-center">
                    <IoIosSearch className="text-2xl" />
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

export default Flights;
