import { MdOutlineKeyboardArrowLeft, MdOutlineModeEdit } from "react-icons/md";
import ResultCard from "../../components/ResultCard/ResultCard";
import { FaArrowRight } from "react-icons/fa6";

const Search = () => {
    return (
        <div>
            <div className="bg-base-300">
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
                    <button className="btn btn-warning"><MdOutlineModeEdit /></button>
                </div>
            </div>

            <div className="mt-5 lg:w-[80%] mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-left">114 Available Flights</h3>
                    <p className="text-gray-400">*Price Includes VAT & Tax</p>
                </div>
                <ResultCard />
                <ResultCard />
            </div>
        </div>
    );
};

export default Search;