import { MdOutlineKeyboardArrowLeft, MdOutlineModeEdit } from "react-icons/md";
import ResultCard from "../../components/ResultCard/ResultCard";
import { FaArrowRight } from "react-icons/fa6";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getCityNameByCode } from "../../utils";

const Search = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = new URLSearchParams(location.search);

    // Check for missing parameters
    const requiredParams = ["departure", "arrival", "startDate", "travelType", "adults", "children", "infants", "ticketClass"];
    const hasMissingParams = requiredParams.some(param => !searchParams.get(param));

    useEffect(() => {
        // console.log("search paramsssss", searchParams);
        if (hasMissingParams) {
            setIsLoading(false);
            return; // Skip the API call if parameters are missing
        }

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
                console.log("search resultsssss", data);
            })
            .catch((err) => {
                console.error("Error fetching flight data:", err);
                setIsLoading(false);
            });
    }, [location.search]);

    if (isLoading) {
        return (
            <div className="text-center">
                <p className="font-bold">Loading search results...</p>
                <p>
                    <span className="loading loading-bars loading-lg"></span>
                </p>
            </div>
        );
    }

    if (hasMissingParams) {
        return null; // Return nothing if required params are missing
    }

    return (
        <div>
            {/* <h1>Flight Search Results</h1>
            {searchResults ? (
                <pre>{JSON.stringify(searchResults, null, 2)}</pre>
            ) : (
                <p>No results found.</p>
            )} */}

            <div className="bg-base-300">
                <div className="py-3 lg:w-[80%] mx-auto flex justify-between items-center">
                    <div className="hidden lg:inline">
                        {/* <h3 className="font-bold text-lg text-left">Dhaka (DAC) — Cox&apos;s Bazar (CXB)</h3> */}
                        <h3 className="font-bold text-lg text-left">{getCityNameByCode(searchParams.get("departure"))} ({searchParams.get("departure")}) — {getCityNameByCode(searchParams.get("arrival"))} ({searchParams.get("arrival")})</h3>
                        <p className="text-left flex gap-5 font-light">
                            <span>{searchParams.get("travelType")}</span>
                            <span>•</span>
                            <span>{searchParams.get("startDate")} {searchParams.get("endDate") && ` -- ${searchParams.get("endDate")}`}</span>
                            <span>•</span>
                            <span>{parseInt(searchParams.get("adults")) + parseInt(searchParams.get("children")) + parseInt(searchParams.get("infants"))} Traveler{(parseInt(searchParams.get("adults")) + parseInt(searchParams.get("children")) + parseInt(searchParams.get("infants"))) === 1 ? "" : "s"}</span>
                            <span>•</span>
                            <span>{searchParams.get("ticketClass")}</span>
                        </p>
                    </div>
                    <div className="lg:hidden flex items-center gap-5">
                        <MdOutlineKeyboardArrowLeft className="text-2xl cursor-pointer" />
                        <div>
                            <h3 className="font-bold text-lg text-left flex items-center gap-1">{searchParams.get("departure")}
                                <FaArrowRight className="text-base" /> {searchParams.get("arrival")}
                                {searchParams.get("travelType") === "Round Trip" && (
                                    <>
                                        <FaArrowRight className="text-base" />
                                        {searchParams.get("departure")}
                                    </>
                                )}</h3>
                            <p className="text-left flex gap-5 font-light text-sm">
                                <span>{searchParams.get("startDate")} {searchParams.get("endDate") && ` -- ${searchParams.get("endDate")}`}</span>
                                <span>•</span>
                                <span>{parseInt(searchParams.get("adults")) + parseInt(searchParams.get("children")) + parseInt(searchParams.get("infants"))} Traveler{(parseInt(searchParams.get("adults")) + parseInt(searchParams.get("children")) + parseInt(searchParams.get("infants"))) === 1 ? "" : "s"}</span>
                            </p>
                        </div>
                    </div>
                    <div className="btn btn-warning"><MdOutlineModeEdit /></div>
                </div>
            </div>

            <div className="mt-5 lg:w-[80%] mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-left">{searchResults.results.length} Available Flight{searchResults.results.length === 1 ? "" : "s"}</h3>
                    <p className="text-gray-400">*Price Includes VAT & Tax</p>
                </div>
                {searchResults.results.map((result, index) => (
                    <ResultCard key={index} result={result} />
                ))}
                {/* End of Results Divider */}
                <div className="text-center my-10">
                    <hr className="border-gray-300 mb-4" />
                    <p className="text-gray-500">End of Results</p>
                </div>
            </div>
        </div>
    );
};

export default Search;