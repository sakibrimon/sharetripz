import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Origin = ({ defOrigin, airports, setFlightDetails }) => {
    return (
        <div>
            <AutocompleteSearch portType="origin" defValue={defOrigin} airports={airports} setFlightDetails={setFlightDetails} />
        </div>
    );
};

Origin.propTypes = {
    defOrigin: PropTypes.string.isRequired,
    airports: PropTypes.array.isRequired,
    setFlightDetails: PropTypes.func.isRequired,
}

export default Origin;