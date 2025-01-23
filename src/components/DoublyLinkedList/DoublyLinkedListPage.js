import DoublyLinkedList from "../utils/dll_utils/DoublyLinkedList";
import React, {useState} from "react";
import DoublyLinkedListVisualization from "../utils/dll_utils/DoublyLinkedListVisualization";
import AddNodeForm from "../utils/dll_utils/AddNodeForm";
import DeleteNodeForm from "../utils/dll_utils/DeleteNodeForm";

function DoublyLinkedListPage() {
    const [dll, setDoublyLinkedList] = useState(new DoublyLinkedList());

    return (
        <div className="DoublyLinkedList">
            <h1>
                Візуалізація додавання, видалення та пошуку елементів із двозв'язного списку
            </h1>

            <div className="dll-container">
                <div className="controls">
                    <div>
                        <div className="ars-dll">
                            <h2>
                                Додати елемент у двозв'язний список
                            </h2>
                            <AddNodeForm
                                onAddNode={(node) => {
                                    const updatedDoublyLinkedList = new DoublyLinkedList();
                                    Object.assign(updatedDoublyLinkedList, dll);
                                    updatedDoublyLinkedList.addNode(node);
                                    setDoublyLinkedList(updatedDoublyLinkedList);
                                }}
                            />
                            <h2>
                                Видалити елемент із двозв'язного списку
                            </h2>
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
                            <button
                                onClick={() => {
                                    setDoublyLinkedList(new DoublyLinkedList());
                                }}
                            >
                                Скинути двозв'язний список
                            </button>
                        </div>
                        <div className="example-dll">
                            <button
                                onClick={() => {
                                    const updatedDoublyLinkedList = new DoublyLinkedList();
                                    Object.assign(updatedDoublyLinkedList, dll);
                                    updatedDoublyLinkedList.exampleDoublyLinkedList();
                                    setDoublyLinkedList(updatedDoublyLinkedList);
                                }}
                            >
                                Приклад двозв'язного списку
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