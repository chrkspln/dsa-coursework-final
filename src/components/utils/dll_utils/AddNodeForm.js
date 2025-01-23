import React, { useState } from 'react';

const AddNodeForm = ({ onAddNode}) => {
    const [node, setNode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (node) {
            onAddNode(node);
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
                Додати
            </button>
        </form>
    );
};

export default AddNodeForm;