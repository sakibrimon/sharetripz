import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Flights from "../Flights/Flights";
import Flight from "../Flight/Flight";
import { addDays } from "date-fns";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const SearchCard = () => {
    const tomorrow = addDays(new Date(), 1); // Calculate tomorrow
    const dayAfterDayAfterTomorrow = addDays(tomorrow, 2); // Calculate the day after tomorrow

    const [travelType, setTravelType] = useState("Round Trip");

    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        kids: 0,
        infants: 0,
    });

    const [ticketClass, setTicketClass] = useState("Economy"); // State for ticket class

    const maxTravelers = 7;

    const navigate = useNavigate();

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

    const handleSearchFlight = () => {
        navigate(`/flight-search`);
    }

    return (
        <div className="mt-8 card bg-base-100 w-96# shadow-xl">
            <form className="card-body" onSubmit={handleSearchFlight}>
                <div className="flex items-center dark:bg-gray-100# dark:text-gray-800#">
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-violet-600 dark:text-violet-600">Flight</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Hotel</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Holiday</a>
                    <a rel="noopener noreferrer" href="#" className="px-5 py-1 border-b-2 dark:border-gray-300">Visa</a>
                    <div className="px-5 py-1 border-b-2 dark:border-gray-300 w-full">&nbsp;</div>
                </div>

                <div className="mt-5 flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between lg:items-end">
                    <div className="flex gap-2">
                        <label className="btn btn-xs lg:btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                // name="radio-1"
                                name="travelType"
                                value="One Way"
                                className="radio radio-xs lg:radio-sm"
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>One Way</span>
                        </label>
                        <label className="btn btn-xs lg:btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                // name="radio-1"
                                name="travelType"
                                value="Round Trip"
                                className="radio radio-xs lg:radio-sm"
                                defaultChecked
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>Round Trip</span>
                        </label>
                        <label className="btn btn-xs lg:btn-sm cursor-pointer flex items-center gap-2">
                            <input type="radio"
                                // name="radio-1"
                                name="travelType"
                                value="Multi City"
                                className="radio radio-xs lg:radio-sm"
                                onChange={(e) => setTravelType(e.target.value)}
                            />
                            <span>Multi City</span>
                        </label>
                    </div>

                    <div>
                        {/* Traveler Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-xs lg:btn-sm m-1 flex items-center">
                                <span>{getTotalTravelers()} Traveler{getTotalTravelers() > 1 ? "s" : ""}</span> <MdOutlineKeyboardArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[310px] p-2 shadow">
                                {["adults", "children", "kids", "infants"].map((type) => (
                                    <li key={type} className="flex flex-row justify-between items-center">
                                        <span>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                            {
                                                type === "adults" ? " (12 and above)" :
                                                    type === "children" ? " (5 to u12)" :
                                                        type === "kids" ? " (from 2 to u5)" :
                                                            type === "infants" ? " (under 2 years)" :
                                                                ""
                                            }
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
                                <div className="btn btn-block">Done</div>
                            </ul>
                        </div>

                        {/* Ticket Class Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-xs lg:btn-sm m-1 flex items-center">
                                <span>{ticketClass}</span> <MdOutlineKeyboardArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                {["Economy", "Premium Economy", "Business Class", "First Class"].map((cls) => (
                                    <li key={cls}>
                                        <label className="cursor-pointer flex items-center gap-2">
                                            <input type="radio"
                                                name="ticketClass"
                                                className="radio radio-sm"
                                                value={cls}
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
                <button className="mt-5 btn btn-warning" type="submit">
                    <span className="flex justify-center items-center gap-2 font-bold">
                        <IoIosSearch className="text-2xl" />
                        <span>Search Flight</span>
                    </span>
                </button>

                <div className="mt-5 flex gap-5">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="radio"
                            // name="radio-3"
                            name="fareType"
                            value="Regular Fare"
                            className="radio radio-sm"
                            defaultChecked />
                        <span>Regular Fare</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="radio"
                            // name="radio-3"
                            name="fareType"
                            value="Student Fare"
                            className="radio radio-sm" />
                        <span>Student Fare</span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default SearchCard;
