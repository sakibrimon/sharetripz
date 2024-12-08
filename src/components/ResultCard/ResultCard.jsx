import { HiTicket } from "react-icons/hi";
import { formatBDT, getCityNameByCode, getHalf } from "../../utils";
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
                        <div className="flex justify-between items-start">
                            <div>
                                {/* <p className="font-bold">DAC - CXB</p> */}
                                <p className="font-bold">{result.flights[0].flightInfoId}</p>
                                {/* <p>NOVOAIR</p> */}
                                <p>{result.validatingCarrier}</p>
                                {/* <p className="font-light">1hr 5min</p> */}
                                <p className="font-light">{result.flights[0].totalElapsedTime}</p>
                            </div>
                            <div>
                                {/* <p className="font-bold">8:00 PM</p> */}
                                <p className="font-bold">HH:MM AM/PM</p>
                                {/* <p>2 Dec, Mon</p> */}
                                <p>{result.flights[0].flyDate}</p>
                                {/* <p className="font-light">Hazrat Shahjalal...</p> */}
                                <p className="font-light">{getHalf(result.flights[0].flightInfoId, "first")}</p>
                            </div>
                            <div>
                                {/* <p className="font-bold">9:05 PM</p> */}
                                <p className="font-bold">HH:MM AM/PM</p>
                                {/* <p>2 Dec, Mon</p> */}
                                <p>YYYY-MM-DD</p>
                                {/* <p className="font-light">Cox&apos;s Bazar Airp...</p> */}
                                <p className="font-light">{getHalf(result.flights[0].flightInfoId, "second")}</p>
                            </div>
                            <div>
                                <p className="font-bold">Non-Stop</p>
                                {/* <p>CXB</p> */}
                                <p>{getHalf(result.flights[0].flightInfoId, "second")}</p>
                            </div>
                        </div>
                        {result.flights.length > 1 &&
                            (<div className="flex justify-between items-start">
                                <div>
                                    {/* <p className="font-bold">DAC - CXB</p> */}
                                    <p className="font-bold">{result.flights[1].flightInfoId}</p>
                                    {/* <p>NOVOAIR</p> */}
                                    <p>{result.validatingCarrier}</p>
                                    {/* <p className="font-light">1hr 5min</p> */}
                                    <p className="font-light">{result.flights[1].totalElapsedTime}</p>
                                </div>
                                <div>
                                    {/* <p className="font-bold">9:35 PM</p> */}
                                    <p className="font-bold">HH:MM AM/PM</p>
                                    {/* <p>4 Dec, Wed</p> */}
                                    <p>{result.flights[1].flyDate}</p>
                                    {/* <p className="font-light">Cox&apos;s Bazar Airp...</p> */}
                                    <p className="font-light">{getHalf(result.flights[1].flightInfoId, "first")}</p>
                                </div>
                                <div>
                                    {/* <p className="font-bold">10:40 PM</p> */}
                                    <p className="font-bold">HH:MM AM/PM</p>
                                    {/* <p>4 Dec, Wed</p> */}
                                    <p>YYYY-MM-DD</p>
                                    {/* <p className="font-light">Hazrat Shahjalal...</p> */}
                                    <p className="font-light">{getHalf(result.flights[1].flightInfoId, "second")}</p>
                                </div>
                                <div>
                                    <p className="font-bold">Non-Stop</p>
                                    {/* <p>CXB</p> */}
                                    <p>{getHalf(result.flights[1].flightInfoId, "second")}</p>
                                </div>
                            </div>)}
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
                <div className="p-8 flex justify-between">
                    <div className="space-y-5 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                {/* <p className="font-bold">8:00 PM</p> */}
                                <p className="font-bold">HH:MM AM/PM</p>
                                {/* <p>Dhaka</p> */}
                                <p>{getCityNameByCode(getHalf(result.flights[0].flightInfoId, "first"))}</p>
                                {/* <p className="font-light">2 Dec, Mon</p> */}
                                <p className="font-light">{result.flights[0].flyDate}</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                {/* <p className="font-bold">1hr 5min</p> */}
                                <p className="font-bold">{result.flights[0].totalElapsedTime}</p>
                                {/* <p className="text-blue-400"><GiCommercialAirplane /></p> */}
                                <p>{result.validatingCarrier}</p>
                                <p className="font-light">Non-Stop</p>
                            </div>
                            <div className="text-right">
                                {/* <p className="font-bold">9:05 PM</p> */}
                                <p className="font-bold">HH:MM AM/PM</p>
                                {/* <p>Cox&apos;s Bazar</p> */}
                                <p>{getCityNameByCode(getHalf(result.flights[0].flightInfoId, "second"))}</p>
                                {/* <p className="font-light">2 Dec, Mon</p> */}
                                <p className="font-light">YYYY-MM-DD</p>
                            </div>
                        </div>
                        {result.flights.length > 1 &&
                            (<div className="flex justify-between items-start">
                                <div>
                                    {/* <p className="font-bold">9:35 PM</p> */}
                                    <p className="font-bold">HH:MM AM/PM</p>
                                    {/* <p>Cox&apos;s Bazar</p> */}
                                    <p>{getCityNameByCode(getHalf(result.flights[1].flightInfoId, "first"))}</p>
                                    {/* <p className="font-light">4 Dec, Wed</p> */}
                                    <p className="font-light">{result.flights[1].flyDate}</p>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    {/* <p className="font-bold">1hr 5min</p> */}
                                    <p className="font-bold">{result.flights[1].totalElapsedTime}</p>
                                    {/* <p className="text-blue-400"><GiCommercialAirplane /></p> */}
                                    <p>{result.validatingCarrier}</p>
                                    <p className="font-light">Non-Stop</p>
                                </div>
                                <div className="text-right">
                                    {/* <p className="font-bold">10:40 PM</p> */}
                                    <p className="font-bold">HH:MM AM/PM</p>
                                    {/* <p>Dhaka</p> */}
                                    <p>{getCityNameByCode(getHalf(result.flights[1].flightInfoId, "second"))}</p>
                                    {/* <p className="font-light">4 Dec, Wed</p> */}
                                    <p className="font-light">YYYY-MM-DD</p>
                                </div>
                            </div>)}
                    </div>
                </div>
                <div className="py-2 pl-8 bg-base-200 flex justify-between items-center">
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