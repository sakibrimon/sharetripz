import SearchCard from '../../components/SearchCard/SearchCard';
import bannerImage from '/src/assets/ocean-island.jpg'

const Home = () => {
    return (
        <div>
            <div className='w-full h-[280px]'>
                <img className='w-full h-full object-cover' src={bannerImage} alt="Ocean Island" />
            </div>
            <div className='-mt-48 w-[98%] lg:w-[80%] mx-auto'>
                <h1 className='text-[40px] text-white font-bold text-center lg:text-left'>Welcome to <span className='font-extrabold'>ShareTripz!</span></h1>
                <p className='text-white font-bold text-center lg:text-left'>Find Flights, Hotels, Visa & Holidays</p>
                <SearchCard />
            </div>
        </div>
    );
};

export default Home;