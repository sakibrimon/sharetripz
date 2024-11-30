import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Destination = ({ defDestination }) => {
    return (
        <div>
            <AutocompleteSearch defValue={defDestination} />
        </div>
    );
};

Destination.propTypes ={
    defDestination: PropTypes.string.isRequired,
}

export default Destination;