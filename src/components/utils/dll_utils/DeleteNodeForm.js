import React, {useState} from "react";

const DeleteNodeForm = ({ onDeleteNode}) => {
    const [node, setNode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (node) {
            onDeleteNode(node);
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
                Видалити
            </button>
        </form>
    );
};

export default DeleteNodeForm;