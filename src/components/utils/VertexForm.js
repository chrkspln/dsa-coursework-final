import React, { useState } from 'react';

const VertexForm = ({ onAddVertex }) => {
    const [vertex, setVertex] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vertex) {
            onAddVertex(vertex);
            setVertex('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="vertex"
                value={vertex}
                onChange={(e) => setVertex(e.target.value)}
            />
            <button type="submit">submit</button>
        </form>
    );
};

export default VertexForm;