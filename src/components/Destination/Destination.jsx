import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

const Destination = ({ defDestination }) => {
    return (
        <div>
            <AutocompleteSearch defValue={defDestination} />
        </div>
    );
};

export default Destination;