import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Flights from "../Flights/Flights";
import Flight from "../Flight/Flight";
import { addDays } from "date-fns";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const SearchCard = () => {
    const [airports, setAirports] = useState([]); // Airports data
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const storedAirports = localStorage.getItem('airports');
        if (storedAirports) {
            setAirports(JSON.parse(storedAirports)); // Parse and set stored airports
            setIsLoading(false); // Mark loading as complete
            return;
        }

        // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://ota-api.a4aero.com/api/settings/airports')}`)
        // fetch('https://proxy.cors.sh/https://ota-api.a4aero.com/api/settings/airports', {
        //     headers: {
        //         'x-cors-api-key': 'temp_e8a001540d0e7452d257d647f5adc0ca',
        //     },
        // })
        // fetch('https://corsproxy.io/?key=9c3881e4&?url=https://ota-api.a4aero.com/api/settings/airports')
        fetch("https://cors-anywhere.herokuapp.com/https://ota-api.a4aero.com/api/settings/airports", {
            method: "GET", // or POST, depending on your needs
            headers: {
                // 'x-cors-api-key': 'temp_e8a001540d0e7452d257d647f5adc0ca',
                "Content-Type": "application/json",
                // Add any additional headers here
                // "Origin": "https://your-frontend-domain.com", // Replace with your domain or a placeholder
                "X-Requested-With": "XMLHttpRequest", // Commonly used header for AJAX requests
            },
            // body: JSON.stringify({
            //     // Your POST request body here
            //     // key: "value", // Replace with your actual payload
            // }),
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                setAirports(data.data); // Set fetched airports
                localStorage.setItem('airports', JSON.stringify(data.data)); // Store airports in localStorage
                // const obj = JSON.parse(data.contents);
                // console.log("objjjjj", obj);
                // setAirports(obj.data); // Set fetched airports
                // localStorage.setItem('airports', JSON.stringify(obj.data)); // Store airports in localStorage
                console.log("all the airports (0):", airports);
                setIsLoading(false); // Mark loading as complete
            })
            .catch((err) => {
                console.error('Failed to fetch airports:', err);
                setIsLoading(false); // Ensure loading is marked as complete even if fetch fails
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Log airports after it is updated
    useEffect(() => {
        if (airports.length > 0) {
            console.log("all the airports (1):", airports);
        }
    }, [airports]);

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

    const [flightDetails, setFlightDetails] = useState({
        departureAirport: 'DAC',
        arrivalAirport: 'CXB',
        startFlyDate: tomorrow,
        endFlyDate: dayAfterDayAfterTomorrow
    });

    const handleSearchFlight = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            departure: flightDetails.departureAirport,
            arrival: flightDetails.arrivalAirport,
            startDate: flightDetails.startFlyDate.toISOString().split("T")[0], // Formats date to YYYY-MM-DD
            ...(travelType === "Round Trip" && {
                endDate: flightDetails.endFlyDate.toISOString().split("T")[0],
            }),
            travelType,
            adults: travelers.adults,
            children: travelers.children,
            infants: travelers.infants,
            ticketClass,
        });

        navigate(`/flight-search?${queryParams.toString()}`);
    };

    // Show a loading spinner or message while fetching
    if (isLoading) {
        return (
            <div className="text-center lg:text-left">
                <p className="text-white font-bold">Loading airports...</p>
                <p>
                    <span className="loading loading-bars loading-lg"></span>
                </p>
            </div>
        );
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
                                {/* Adults */}
                                <li className="flex flex-row justify-between items-center">
                                    <span>Adults (12 and above)</span>
                                    <div>
                                        <CiCircleMinus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("adults", "decrement")}
                                        />
                                        <span className="mx-2">{travelers.adults}</span>
                                        <CiCirclePlus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("adults", "increment")}
                                        />
                                    </div>
                                </li>

                                {/* Children */}
                                <li className="flex flex-row justify-between items-center">
                                    <span>Children (2 to u12)</span>
                                    <div>
                                        <CiCircleMinus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("children", "decrement")}
                                        />
                                        <span className="mx-2">{travelers.children}</span>
                                        <CiCirclePlus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("children", "increment")}
                                        />
                                    </div>
                                </li>

                                {/* Kids */}
                                {/* <li className="flex flex-row justify-between items-center">
                                    <span>Kids (from 2 to under 5)</span>
                                    <div>
                                        <CiCircleMinus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("kids", "decrement")}
                                        />
                                        <span className="mx-2">{travelers.kids}</span>
                                        <CiCirclePlus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("kids", "increment")}
                                        />
                                    </div>
                                </li> */}

                                {/* Infants */}
                                <li className="flex flex-row justify-between items-center">
                                    <span>Infants (under 2 years)</span>
                                    <div>
                                        <CiCircleMinus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("infants", "decrement")}
                                        />
                                        <span className="mx-2">{travelers.infants}</span>
                                        <CiCirclePlus
                                            className="text-2xl cursor-pointer"
                                            onClick={() => updateTravelers("infants", "increment")}
                                        />
                                    </div>
                                </li>

                                {/* Done Button */}
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
                    <Flights travelType={travelType} defOrigin0={flightDetails.departureAirport} defDestination0={flightDetails.arrivalAirport} defStartDate0={tomorrow} defOrigin1={flightDetails.arrivalAirport} defDestination1='JFK' defStartDate1={dayAfterDayAfterTomorrow} airports={airports} setFlightDetails={setFlightDetails} />
                ) : (
                    <Flight travelType={travelType} defOrigin={flightDetails.departureAirport} defDestination={flightDetails.arrivalAirport} defStartDate={tomorrow} defEndDate={dayAfterDayAfterTomorrow} airports={airports} setFlightDetails={setFlightDetails} />
                )}
                {travelType !== "Multi City" && (
                    <button className="mt-5 btn btn-warning" type="submit">
                        <span className="flex justify-center items-center gap-2 font-bold">
                            <IoIosSearch className="text-2xl" />
                            <span>Search Flight</span>
                        </span>
                    </button>
                )}

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
