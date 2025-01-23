import React, { useState } from 'react';

const EdgeForm = ({ onAddEdge }) => {
    const [vertex1, setVertex1] = useState('');
    const [vertex2, setVertex2] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vertex1 && vertex2 && weight) {
            onAddEdge(vertex1, vertex2, parseInt(weight, 10));
            setVertex1('');
            setVertex2('');
            setWeight('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Вершина 1"
                value={vertex1}
                onChange={(e) => setVertex1(e.target.value)}
            />
            <input
                type="text"
                placeholder="Вершина 2"
                value={vertex2}
                onChange={(e) => setVertex2(e.target.value)}
            />
            <input
                type="number"
                placeholder="Вага ребра"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <button type="submit">Додати</button>
        </form>
    );
};

export default EdgeForm;