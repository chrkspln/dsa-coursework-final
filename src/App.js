import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import GraphPage from "./components/Graph/GraphPage";
import DoublyLinkedList from "./components/DoublyLinkedList/DoublyLinkedListPage";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Coursework</h1>
                    <nav className="App-menu">
                        <Link to="/graph" className="App-link">Min Cut in Graph</Link>
                        <Link to="/doubly-linked-list" className="App-link">Doubly Linked List</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/graph" element={<GraphPage />} />
                    <Route path="/doubly-linked-list" element={<DoublyLinkedList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
