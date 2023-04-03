export default class Queue {
    constructor() {
        this.queue = []
    }
    /**
     * Enqueue
     * @param {Node} node representing the node to add to the queue
     * @returns nothing
     * Complexity: C = O(n) with n the size of the queue
     */
    enqueue(node) {
        for (let index = 0; index < this.queue.length; ++index) {
            if (this.queue[index].priority > node.priority) {
                this.queue.splice(index, 0, node);
                return
            }
        }
        this.queue.push(node)
    }
    /**
     * Dequeue
     * @returns a node representing the highest priority node of the queue
     * Complexity: C = O(1)
     */
    dequeue() {
        if (this.isEmpty())
            return null
        return this.queue.shift();
    }
    isEmpty() {
        return this.queue.length==0
    }
}
