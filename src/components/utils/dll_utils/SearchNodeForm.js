import React, {useState} from "react";

const SearchNodeForm = ({ onSearchNode}) => {
    const [node, setNode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (node) {
            onSearchNode(node);
            setNode('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Значення елемента"
                value={node}
                onChange={(e) => setNode(e.target.value)}
            />
            <button type="submit">
                Шукати елемент за значенням
            </button>
        </form>
    );
};

export default SearchNodeForm;