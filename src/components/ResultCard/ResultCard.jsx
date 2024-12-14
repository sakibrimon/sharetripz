import { HiTicket } from "react-icons/hi";
import { convertTo12HourFormat, formatBDT } from "../../utils";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { GiCommercialAirplane } from "react-icons/gi";
import PropTypes from "prop-types";

const ResultCard = ({ result }) => {
    // const { } = result;
    return (
        <div>
            {/* for larger screens */}
            <div className="mt-5 mx-2 rounded-lg card# bg-base-100 w-96# shadow-xl hidden lg:block">
                <div className="p-8 card-body# flex justify-between items-center">
                    <div className="space-y-5 w-[80%]">
                        <div className="flex# justify-between# items-start# grid grid-cols-5 gap-4">
                            <div className="self-center">
                                <img className="w-9 h-9" src={`https://airlines.a4aero.com/images/${result.flights[0].flightSegments[0].airline.code}.png`} alt="airlines-logo" />
                            </div>
                            <div>
                                {/* <p className="font-bold">DAC - CXB</p> */}
                                <p className="font-bold">{result.flights[0].flightSegments[0].segmentInfoId}</p>
                                {/* <p>NOVOAIR</p> */}
                                {/* <p>{result.validatingCarrier}</p> */}
                                <p>{result.flights[0].flightSegments[0].airline.name.slice(0, 16)}...</p>
                                {/* <p className="font-light">1hr 5min</p> */}
                                <p className="font-light">{result.flights[0].flightSegments[0].elapsedTime}</p>
                            </div>
                            <div>
                                {/* <p className="font-bold">8:00 PM</p> */}
                                {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                <p className="font-bold">{convertTo12HourFormat(result.flights[0].flightSegments[0].departure.depTime)}</p>
                                {/* <p>2 Dec, Mon</p> */}
                                {/* <p>{result.flights[0].flyDate}</p> */}
                                <p>{result.flights[0].flightSegments[0].departure.depDate}</p>
                                {/* <p className="font-light">Hazrat Shahjalal...</p> */}
                                <p className="font-light">{result.flights[0].flightSegments[0].departure.airport.airportName.slice(0, 16)}...</p>
                            </div>
                            <div>
                                {/* <p className="font-bold">9:05 PM</p> */}
                                {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                <p className="font-bold">{convertTo12HourFormat(result.flights[0].flightSegments[0].arrival.arrTime)}</p>
                                {/* <p>2 Dec, Mon</p> */}
                                {/* <p>YYYY-MM-DD</p> */}
                                <p>{result.flights[0].flightSegments[0].arrival.arrDate}</p>
                                {/* <p className="font-light">Cox&apos;s Bazar Airp...</p> */}
                                <p className="font-light">{result.flights[0].flightSegments[0].arrival.airport.airportName.slice(0, 16)}...</p>
                            </div>
                            <div>
                                <p className="font-bold">Non-Stop</p>
                                {/* <p>CXB</p> */}
                                <p>{result.flights[0].flightSegments[0].arrival.airport.airportCode}</p>
                            </div>
                        </div>
                        {
                            result.flights.length > 1 &&
                            (
                                <div className="flex# justify-between# items-start# grid grid-cols-5 gap-4">
                                    <div className="self-center">
                                        <img className="w-9 h-9" src={`https://airlines.a4aero.com/images/${result.flights[1].flightSegments[0].airline.code}.png`} alt="airlines-logo" />
                                    </div>
                                    <div>
                                        {/* <p className="font-bold">DAC - CXB</p> */}
                                        <p className="font-bold">{result.flights[1].flightSegments[0].segmentInfoId}</p>
                                        {/* <p>NOVOAIR</p> */}
                                        {/* <p>{result.validatingCarrier}</p> */}
                                        <p>{result.flights[1].flightSegments[0].airline.name.slice(0, 16)}...</p>
                                        {/* <p className="font-light">1hr 5min</p> */}
                                        <p className="font-light">{result.flights[1].flightSegments[0].elapsedTime}</p>
                                    </div>
                                    <div>
                                        {/* <p className="font-bold">9:35 PM</p> */}
                                        {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                        <p className="font-bold">{convertTo12HourFormat(result.flights[1].flightSegments[0].departure.depTime)}</p>
                                        {/* <p>4 Dec, Wed</p> */}
                                        {/* <p>{result.flights[1].flyDate}</p> */}
                                        <p>{result.flights[1].flightSegments[0].departure.depDate}</p>
                                        {/* <p className="font-light">Cox&apos;s Bazar Airp...</p> */}
                                        <p className="font-light">{result.flights[1].flightSegments[0].departure.airport.airportName.slice(0, 16)}...</p>
                                    </div>
                                    <div>
                                        {/* <p className="font-bold">10:40 PM</p> */}
                                        {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                        <p className="font-bold">{convertTo12HourFormat(result.flights[1].flightSegments[0].arrival.arrTime)}</p>
                                        {/* <p>4 Dec, Wed</p> */}
                                        {/* <p>YYYY-MM-DD</p> */}
                                        <p>{result.flights[1].flightSegments[0].arrival.arrDate}</p>
                                        {/* <p className="font-light">Hazrat Shahjalal...</p> */}
                                        <p className="font-light">{result.flights[1].flightSegments[0].arrival.airport.airportName.slice(0, 16)}...</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Non-Stop</p>
                                        {/* <p>CXB</p> */}
                                        <p>{result.flights[1].flightSegments[0].arrival.airport.airportCode}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="pt-2 pr-2 pb-8 pl-8 rounded-lg text-right bg-sky-100">
                        <p className="flex gap-2 items-center">
                            <HiTicket className="text-green-400" /> <span className="font-medium">AMEX1124</span>
                        </p>
                        {/* <p className="mt-8 font-bold text-lg">{formatBDT(8710)}</p> */}
                        <p className="mt-8 font-bold text-lg">{formatBDT(result.totalFare.totalFare)}</p>
                        {/* <p><s className="text-gray-400 text-sm">{formatBDT(9998)}</s></p> */}
                        <p><s className="text-gray-400 text-sm">{formatBDT(result.totalFare.totalFare * 1.1)}</s></p>
                        <div className="mt-4 btn btn-info text-white flex items-center">
                            <span>Select</span><MdOutlineKeyboardArrowRight className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* for smaller screens */}
            <div className="mt-5 mx-2 rounded-lg card# bg-base-100 w-96# shadow-xl lg:hidden">
                <div className="p-8">
                    <div className="space-y-5 w-full">
                        <div className="flex# justify-between# items-start# grid grid-cols-3 gap-2">
                            <div>
                                {/* <p className="font-bold">8:00 PM</p> */}
                                {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                <p className="font-bold">{convertTo12HourFormat(result.flights[0].flightSegments[0].departure.depTime)}</p>
                                {/* <p>Dhaka</p> */}
                                <p>{result.flights[0].flightSegments[0].departure.airport.cityName}</p>
                                {/* <p className="font-light">2 Dec, Mon</p> */}
                                {/* <p className="font-light">{result.flights[0].flyDate}</p> */}
                                <p className="font-light">{result.flights[0].flightSegments[0].departure.depDate}</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                {/* <p className="font-bold">1hr 5min</p> */}
                                <p className="font-bold">{result.flights[0].flightSegments[0].elapsedTime}</p>
                                {/* <p className="text-blue-400"><GiCommercialAirplane /></p> */}
                                {/* <p>{result.validatingCarrier}</p> */}
                                {/* <p>{result.flights[0].flightSegments[0].airline.name.slice(0, 16)}...</p> */}
                                {/* <p>{result.flights[0].flightSegments[0].airline.code}</p> */}
                                <img className="w-[18px] h-[18px]" src={`https://airlines.a4aero.com/images/${result.flights[0].flightSegments[0].airline.code}.png`} alt="airlines-logo" />
                                <p className="font-light">Non-Stop</p>
                            </div>
                            <div className="text-right">
                                {/* <p className="font-bold">9:05 PM</p> */}
                                {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                <p className="font-bold">{convertTo12HourFormat(result.flights[0].flightSegments[0].arrival.arrTime)}</p>
                                {/* <p>Cox&apos;s Bazar</p> */}
                                <p>{result.flights[0].flightSegments[0].arrival.airport.cityName}</p>
                                {/* <p className="font-light">2 Dec, Mon</p> */}
                                {/* <p className="font-light">YYYY-MM-DD</p> */}
                                <p className="font-light">{result.flights[0].flightSegments[0].arrival.arrDate}</p>
                            </div>
                        </div>
                        {
                            result.flights.length > 1 &&
                            (
                                <div className="flex# justify-between# items-start# grid grid-cols-3 gap-2">
                                    <div>
                                        {/* <p className="font-bold">9:35 PM</p> */}
                                        {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                        <p className="font-bold">{convertTo12HourFormat(result.flights[1].flightSegments[0].departure.depTime)}</p>
                                        {/* <p>Cox&apos;s Bazar</p> */}
                                        <p>{result.flights[1].flightSegments[0].departure.airport.cityName}</p>
                                        {/* <p className="font-light">4 Dec, Wed</p> */}
                                        {/* <p className="font-light">{result.flights[1].flyDate}</p> */}
                                        <p className="font-light">{result.flights[1].flightSegments[0].departure.depDate}</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        {/* <p className="font-bold">1hr 5min</p> */}
                                        <p className="font-bold">{result.flights[1].flightSegments[0].elapsedTime}</p>
                                        {/* <p className="text-blue-400"><GiCommercialAirplane /></p> */}
                                        {/* <p>{result.validatingCarrier}</p> */}
                                        {/* <p>{result.flights[1].flightSegments[0].airline.name.slice(0, 16)}...</p> */}
                                        {/* <p>{result.flights[1].flightSegments[0].airline.code}</p> */}
                                        <img className="w-[18px] h-[18px]" src={`https://airlines.a4aero.com/images/${result.flights[1].flightSegments[0].airline.code}.png`} alt="airlines-logo" />
                                        <p className="font-light">Non-Stop</p>
                                    </div>
                                    <div className="text-right">
                                        {/* <p className="font-bold">10:40 PM</p> */}
                                        {/* <p className="font-bold">HH:MM AM/PM</p> */}
                                        <p className="font-bold">{convertTo12HourFormat(result.flights[1].flightSegments[0].arrival.arrTime)}</p>
                                        {/* <p>Dhaka</p> */}
                                        <p>{result.flights[1].flightSegments[0].arrival.airport.cityName}</p>
                                        {/* <p className="font-light">4 Dec, Wed</p> */}
                                        {/* <p className="font-light">YYYY-MM-DD</p> */}
                                        <p className="font-light">{result.flights[1].flightSegments[0].arrival.arrDate}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="py-2 px-8 bg-base-200 flex justify-between items-center">
                    <div>
                        <p className="flex gap-2 items-center">
                            <HiTicket className="text-green-400" /> <span className="font-medium">AMEX1124</span>
                        </p>
                        <p className="space-x-1">
                            <span className="font-bold text-lg">
                                {/* {formatBDT(8710)} */}
                                {formatBDT(result.totalFare.totalFare)}
                            </span>
                            {/* <s className="text-gray-400 text-sm">{formatBDT(9998)}</s> */}
                            <s className="text-gray-400 text-sm">{formatBDT(result.totalFare.totalFare * 1.1)}</s>
                        </p>
                    </div>
                    <div className="btn btn-info text-white flex items-center">
                        <span>Select</span><MdOutlineKeyboardArrowRight className="text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

ResultCard.propTypes = {
    result: PropTypes.object.isRequired,
}

export default ResultCard;