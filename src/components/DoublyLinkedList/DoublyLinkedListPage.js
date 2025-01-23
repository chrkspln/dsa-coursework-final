import DoublyLinkedList from "../utils/DoublyLinkedList";
import React, {useState} from "react";
import DoublyLinkedListVisualization from "../utils/DoublyLinkedListVisualization";
import AddNodeForm from "../utils/AddNodeForm";
import DeleteNodeForm from "../utils/DeleteNodeForm";

function DoublyLinkedListPage() {
    const [dll, setDoublyLinkedList] = useState(new DoublyLinkedList());

    return (
        <div className="DoublyLinkedList">
            <h1>
                Visualization of Addition, Deletion and Search in Doubly Linked List
            </h1>

            <div className="dll-container">
                <div className="controls">
                    <div>
                        <div className="ars-dll">
                            <h2>Add Node by value to the DLL</h2>
                            <AddNodeForm
                                onAddNode={(node) => {
                                    const updatedDoublyLinkedList = new DoublyLinkedList();
                                    Object.assign(updatedDoublyLinkedList, dll);
                                    updatedDoublyLinkedList.addNode(node);
                                    setDoublyLinkedList(updatedDoublyLinkedList);
                                }}
                            />
                            <h2>Remove node by value from the DLL</h2>
                            <DeleteNodeForm
                                onDeleteNode={(node) => {
                                    const updatedDoublyLinkedList = new DoublyLinkedList();
                                    Object.assign(updatedDoublyLinkedList, dll);
                                    updatedDoublyLinkedList.removeNode(node);
                                    setDoublyLinkedList(updatedDoublyLinkedList);
                                }}
                            />
                        </div>
                    </div>
                    <div className="control-buttons">
                        <div className="reset-dll">
                            <h2>Reset DoublyLinkedList</h2>
                            <button
                                onClick={() => {
                                    setDoublyLinkedList(new DoublyLinkedList());
                                }}
                            >
                                Reset
                            </button>
                        </div>
                        <div className="example-dll">
                            <h2>Example DoublyLinkedList</h2>
                            <button
                                onClick={() => {
                                    const updatedDoublyLinkedList = new DoublyLinkedList();
                                    Object.assign(updatedDoublyLinkedList, dll);
                                    updatedDoublyLinkedList.exampleDoublyLinkedList();
                                    setDoublyLinkedList(updatedDoublyLinkedList);
                                }}
                            >
                                Randomize
                            </button>
                        </div>

                    </div>
                </div>
                <div className="visualization">
                    <DoublyLinkedListVisualization dll={dll}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default DoublyLinkedListPage;