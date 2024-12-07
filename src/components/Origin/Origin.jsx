import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Origin = ({ defOrigin, airports }) => {
    return (
        <div>
            <AutocompleteSearch defValue={defOrigin} airports={airports} />
        </div>
    );
};

Origin.propTypes = {
    defOrigin: PropTypes.string.isRequired,
    airports: PropTypes.array.isRequired,
}

export default Origin;