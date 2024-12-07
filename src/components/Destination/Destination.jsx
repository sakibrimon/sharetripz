import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Destination = ({ defDestination, airports, setFlightDetails }) => {
    return (
        <div>
            <AutocompleteSearch portType="destination" defValue={defDestination} airports={airports} setFlightDetails={setFlightDetails} />
        </div>
    );
};

Destination.propTypes ={
    defDestination: PropTypes.string.isRequired,
    airports: PropTypes.array.isRequired,
    setFlightDetails: PropTypes.func.isRequired,
}

export default Destination;