import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Destination = ({ defDestination, airports }) => {
    return (
        <div>
            <AutocompleteSearch defValue={defDestination} airports={airports} />
        </div>
    );
};

Destination.propTypes ={
    defDestination: PropTypes.string.isRequired,
    airports: PropTypes.array.isRequired,
}

export default Destination;