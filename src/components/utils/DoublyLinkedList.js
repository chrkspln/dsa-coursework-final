class DoublyLinkedList {
    constructor() {
        this.history = [];
        this.historyToAnimate = [];
        this.head = null;
        this.tail = null;
    }

    createNode(value) {
        return {
            id: this.history.length,
            value,
            next: null,
            prv: null,
        };
    }

    recordStep(action, data) {
        this.history.push({ action, data });
        console.log(`Action: ${action}, Data: ${JSON.stringify(data)}`);
    }

    addNode(value) {
        const newNode = this.createNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prv = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.recordStep("addNode", { id: newNode.id, value });
    }

    removeNode(value) {
        let current = this.head;

        while (current) {
            if (current.value == value) {
                if (current.prv) {
                    current.prv.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prv = current.prv;
                } else {
                    this.tail = current.prv;
                }
                this.recordStep("removeNode", { id: current.id });
                return;
            }
            current = current.next;
        }
    }

    searchNode(value) {
        let current = this.head;

        while (current) {
            this.historyToAnimate.push(
                {
                    node: current.id,
                }
            );
            if (current.value == value) {
                console.log(`Node with value ${value} found.`);
                alert(`Node with value ${value} found.`);
                return current;
            }
            current = current.next;
        }
        console.log(`Node with value ${value} not found.`);
        return null;
    }

    getNodeList() {
        const nodeList = [];
        let current = this.head;

        while (current) {
            nodeList.push(current);
            current = current.next;
        }
        return nodeList;
    }

    exampleDoublyLinkedList() {
        const values = [10, 20, 30, 40];
        values.forEach((value) => this.addNode(value));
        console.log("Example DoublyLinkedList created with values: ", values);
    }
}

export default DoublyLinkedList;
