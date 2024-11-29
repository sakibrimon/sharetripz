import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Origin from "../Origin/Origin";
import Destination from "../Destination/Destination";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Flights from "../Flights/Flights";
import Flight from "../Flight/Flight";
import { addDays } from "date-fns";

const SearchCard = () => {
    const tomorrow = addDays(new Date(), 1); // Calculate tomorrow
    const dayAfterDayAfterTomorrow = addDays(tomorrow, 2); // Calculate the day after tomorrow

    const [travelType, setTravelType] = useState("Round Trip");
    const [ports, setPorts] = useState({
        origin: <Origin key="origin" />,
        destination: <Destination key="destination" />,
    });

    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        kids: 0,
        infants: 0,
    });

    const [ticketClass, setTicketClass] = useState("Economy"); // State for ticket class

    const maxTravelers = 7;

    const swapPorts = () => {
        setPorts((prevPorts) => ({
            origin: prevPorts.destination,
            destination: prevPorts.origin,
        }));
    };

    const updateTravelers = (type, action) => {
        setTravelers((prev) => {
            const totalGroupTravelers = prev.adults + prev.children + prev.kids;

            if (action === "increment") {
                if (type === "infants" && prev.infants < prev.adults) {
                    return { ...prev, [type]: prev[type] + 1 };
                }

                if (type !== "infants" && totalGroupTravelers < maxTravelers) {
                    return { ...prev, [type]: prev[type] + 1 };
                }
            }

            if (action === "decrement") {
                if (type === "adults" && prev.adults > 1 && totalGroupTravelers > 1) {
                    return { ...prev, [type]: prev[type] - 1 };
                }

                if (type !== "adults" && prev[type] > 0) {
                    return { ...prev, [type]: prev[type] - 1 };
                }

                if (type === "infants" && prev[type] > 0) {
                    return { ...prev, [type]: prev[type] - 1 };
                }
            }

            return prev;
        });
    };

    const getTotalTravelers = () => {
        return travelers.adults + travelers.children + travelers.kids + travelers.infants;
    };

    return (
        <div className="mt-8 card bg-base-100 w-96# shadow-xl">
            <div className="card-body">
                <div className="flex items-center dark:bg-gray-100# dark:text-gray-800#">
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-violet-600 dark:text-violet-600">Flight</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Hotel</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Holiday</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Visa</a>
                    <div className="px-5 py-1 border-b-2 dark:border-gray-300 w-full">&nbsp;</div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="mt-5 flex gap-2">
                        <label className="btn btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                name="radio-1"
                                value="One Way"
                                className="radio radio-sm"
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>One Way</span>
                        </label>
                        <label className="btn btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                name="radio-1"
                                value="Round Trip"
                                className="radio radio-sm"
                                defaultChecked
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>Round Trip</span>
                        </label>
                        <label className="btn btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                name="radio-1"
                                value="Multi City"
                                className="radio radio-sm"
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>Multi City</span>
                        </label>
                    </div>

                    <div>
                        {/* Traveler Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm w-[150px] m-1 flex items-center">
                                <span>{getTotalTravelers()} Traveler{getTotalTravelers() > 1 ? "s" : ""}</span> <MdOutlineKeyboardArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[350px] p-2 shadow">
                                {["adults", "children", "kids", "infants"].map((type) => (
                                    <li key={type} className="flex flex-row justify-between items-center">
                                        <span>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}{type === "infants" ? " (under 2 years)" : ""}
                                        </span>
                                        <div>
                                            <CiCircleMinus className="text-2xl cursor-pointer"
                                                onClick={() => updateTravelers(type, "decrement")} />
                                            <span className="mx-2">{travelers[type]}</span>
                                            <CiCirclePlus className="text-2xl cursor-pointer"
                                                onClick={() => updateTravelers(type, "increment")} />
                                        </div>
                                    </li>
                                ))}
                                <button className="btn btn-block">Done</button>
                            </ul>
                        </div>

                        {/* Ticket Class Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm w-[200px] m-1 flex items-center">
                                <span>{ticketClass}</span> <MdOutlineKeyboardArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                {["Economy", "Premium Economy", "Business Class", "First Class"].map((cls) => (
                                    <li key={cls}>
                                        <label className="cursor-pointer flex items-center gap-2">
                                            <input type="radio"
                                                name="ticket-class"
                                                className="radio radio-sm"
                                                checked={ticketClass === cls}
                                                onChange={() => setTicketClass(cls)}
                                            />
                                            <span>{cls}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {travelType === "Multi City" ? (
                    <Flights travelType={travelType} defOrigin0='DAC' defDestination0='CXB' defStartDate0={tomorrow} defOrigin1='CXB' defDestination1='JFK' defStartDate1={dayAfterDayAfterTomorrow} />
                ) : (
                    <Flight travelType={travelType} defOrigin='DAC' defDestination='CXB' defStartDate={tomorrow} defEndDate={dayAfterDayAfterTomorrow} />
                )}

                <div className="mt-5 flex gap-5">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input type="radio" name="radio-3" className="radio radio-sm" defaultChecked />
                        <span>Regular Fare</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input type="radio" name="radio-3" className="radio radio-sm" />
                        <span>Student Fare</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
