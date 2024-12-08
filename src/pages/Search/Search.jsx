import { MdOutlineKeyboardArrowLeft, MdOutlineModeEdit } from "react-icons/md";
import ResultCard from "../../components/ResultCard/ResultCard";
import { FaArrowRight } from "react-icons/fa6";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const Search = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const requestData = {
            OriginDestinationOptions: [
                {
                    DepartureAirport: searchParams.get("departure"),
                    ArrivalAirport: searchParams.get("arrival"),
                    FlyDate: searchParams.get("startDate"),
                },
                ...(searchParams.get("travelType") === "Round Trip"
                    ? [
                        {
                            DepartureAirport: searchParams.get("arrival"),
                            ArrivalAirport: searchParams.get("departure"),
                            FlyDate: searchParams.get("endDate"),
                        },
                    ]
                    : []),
            ],
            Passengers: [
                { PassengerType: "ADT", Quantity: parseInt(searchParams.get("adults"), 10) || 0 },
                { PassengerType: "CHD", Quantity: parseInt(searchParams.get("children"), 10) || 0 },
                { PassengerType: "INF", Quantity: parseInt(searchParams.get("infants"), 10) || 0 },
            ],
            ApiId: 1003,
        };

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA5NDc3NzM1LWFhZWMtNGVmZS04ZjhjLTQxYzc0YTlkNDQxNiIsInVuaXF1ZV9uYW1lIjoiQVBQIiwiZW1haWwiOiJtYWlsLnBhcnZlemFsYW1AZ21haWwuY29tIiwianRpIjoiNGE0MTk0YzktZGVlYy00OWUwLTkzNWUtM2I0YzA4ZjdkNjRkIiwiVXNlcklkIjoiMSIsIkFwcElkIjoiMiIsIlJvbGVJZHMiOiJBcHAiLCJOYW1lIjoiQXBwIiwiR3NhSWQiOiIxMDEiLCJBZ2VudElkIjoiMTAwMyIsIkdzYSI6IiIsIkFnZW50IjoiIiwiZXhwIjoxNzY0ODM5NDE0LCJpc3MiOiJBNEEgT1RBIEFQUCIsImF1ZCI6IkFwcFVJIn0.kkX48bjL6VWMRR7LclnU3KDDgFfoumIWS0yN7FO95B4";

        fetch("https://proxy.cors.sh/https://ota-api.a4aero.com/api/flights/search", {
            method: "POST",
            headers: {
                'x-cors-api-key': 'temp_e8a001540d0e7452d257d647f5adc0ca',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch flight search results");
                }
                return response.json();
            })
            .then((data) => {
                setSearchResults(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching flight data:", err);
                setIsLoading(false);
            });
    }, [location.search]);

    if (isLoading) {
        return <p>Loading search results...</p>;
    }

    return (
        <div>
            <h1>Flight Search Results</h1>
            {searchResults ? (
                <pre>{JSON.stringify(searchResults, null, 2)}</pre>
            ) : (
                <p>No results found.</p>
            )}
            
            {/* <div className="bg-base-300">
                <div className="py-3 lg:w-[80%] mx-auto flex justify-between items-center">
                    <div className="hidden lg:inline">
                        <h3 className="font-bold text-lg text-left">Dhaka (DAC) — Cox&apos;s Bazar (CXB)</h3>
                        <p className="text-left flex gap-5 font-light">
                            <span>Round Trip</span>
                            <span>•</span>
                            <span>02 Dec - 04 Dec</span>
                            <span>•</span>
                            <span>2 Travelers</span>
                            <span>•</span>
                            <span>Economy</span>
                        </p>
                    </div>
                    <div className="lg:hidden flex items-center gap-5">
                        <MdOutlineKeyboardArrowLeft className="text-2xl cursor-pointer" />
                        <div>
                            <h3 className="font-bold text-lg text-left flex items-center gap-1">DAC <FaArrowRight className="text-base" /> CXB <FaArrowRight className="text-base" /> DAC</h3>
                            <p className="text-left flex gap-5 font-light">
                                <span>02 Dec - 04 Dec</span>
                                <span>•</span>
                                <span>2 Travelers</span>
                            </p>
                        </div>
                    </div>
                    <div className="btn btn-warning"><MdOutlineModeEdit /></div>
                </div>
            </div> */}

            {/* <div className="mt-5 lg:w-[80%] mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-left">114 Available Flights</h3>
                    <p className="text-gray-400">*Price Includes VAT & Tax</p>
                </div>
                <ResultCard />
                <ResultCard />
            </div> */}
        </div>
    );
};

export default Search;