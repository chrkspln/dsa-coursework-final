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
                placeholder="Назва вершини"
                value={vertex}
                onChange={(e) => setVertex(e.target.value)}
            />
            <button type="submit">Додати</button>
        </form>
    );
};

export default VertexForm;