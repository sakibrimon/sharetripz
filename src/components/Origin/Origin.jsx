import PropTypes from "prop-types";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Origin = ({ defOrigin }) => {
    return (
        <div>
            <AutocompleteSearch defValue={defOrigin} />
        </div>
    );
};

Origin.propTypes = {
    defOrigin: PropTypes.string.isRequired,
}

export default Origin;