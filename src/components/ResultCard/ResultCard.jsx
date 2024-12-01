import { HiTicket } from "react-icons/hi";
import { formatBDT } from "../../utils";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GiCommercialAirplane } from "react-icons/gi";

const ResultCard = () => {
    return (
        <div>
            <div className="mt-5 mx-2 rounded-lg card# bg-base-100 w-96# shadow-xl hidden lg:block">
                <div className="p-8 card-body# flex justify-between">
                    <div className="space-y-5 w-[80%]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">DAC - CXB</p>
                                <p>NOVOAIR</p>
                                <p className="font-light">1hr 5min</p>
                            </div>
                            <div>
                                <p className="font-bold">8:00 PM</p>
                                <p>2 Dec, Mon</p>
                                <p className="font-light">Hazrat Shahjalal...</p>
                            </div>
                            <div>
                                <p className="font-bold">9:05 PM</p>
                                <p>2 Dec, Mon</p>
                                <p className="font-light">Cox&apos;s Bazar Airp...</p>
                            </div>
                            <div>
                                <p className="font-bold">Non-Stop</p>
                                <p>CXB</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">DAC - CXB</p>
                                <p>NOVOAIR</p>
                                <p className="font-light">1hr 5min</p>
                            </div>
                            <div>
                                <p className="font-bold">9:35 PM</p>
                                <p>2 Dec, Mon</p>
                                <p className="font-light">Cox&apos;s Bazar Airp...</p>
                            </div>
                            <div>
                                <p className="font-bold">10:40 PM</p>
                                <p>2 Dec, Mon</p>
                                <p className="font-light">Hazrat Shahjalal...</p>
                            </div>
                            <div>
                                <p className="font-bold">Non-Stop</p>
                                <p>CXB</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 pr-2 pb-8 pl-8 rounded-lg text-right bg-sky-100">
                        <p className="flex gap-2 items-center">
                            <HiTicket className="text-green-400" /> <span className="font-medium">AMEX1124</span>
                        </p>
                        <p className="mt-8 font-bold text-lg">{formatBDT(8710)}</p>
                        <p><s className="text-gray-400 text-sm">{formatBDT(9998)}</s></p>
                        <div className="mt-4 btn btn-info text-white flex items-center">
                            <span>Select</span><MdOutlineKeyboardArrowRight className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 mx-2 rounded-lg card# bg-base-100 w-96# shadow-xl lg:hidden">
                <div className="p-8 flex justify-between">
                    <div className="space-y-5 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">8:00 PM</p>
                                <p>Dhaka</p>
                                <p className="font-light">2 Dec, Mon</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold">1hr 5min</p>
                                <p className="text-blue-400"><GiCommercialAirplane /></p>
                                <p className="font-light">Non-Stop</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">9:05 PM</p>
                                <p>Cox&apos;s Bazar</p>
                                <p className="font-light">2 Dec, Mon</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">9:35 PM</p>
                                <p>Dhaka</p>
                                <p className="font-light">2 Dec, Mon</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold">1hr 5min</p>
                                <p className="text-blue-400"><GiCommercialAirplane /></p>
                                <p className="font-light">Non-Stop</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">10:40 PM</p>
                                <p>Cox&apos;s Bazar</p>
                                <p className="font-light">2 Dec, Mon</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-2 pl-8 bg-base-200 flex justify-between items-center">
                    <div>
                        <p className="flex gap-2 items-center">
                            <HiTicket className="text-green-400" /> <span className="font-medium">AMEX1124</span>
                        </p>
                        <p className="space-x-1">
                            <span className="font-bold text-lg">
                                {formatBDT(8710)}
                            </span>
                            <s className="text-gray-400 text-sm">{formatBDT(9998)}</s>
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

export default ResultCard;