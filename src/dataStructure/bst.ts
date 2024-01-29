import Queue from "./queue"

export class Node {
    val: any
    left: Node | null
    right: Node | null
    constructor(val: any) {
        this.val = val
        this.left = null
        this.right = null
    }
}


export default class BST {

    root: Node | null

    constructor() {
        this.root = null
    }

    incert(val: any) {
        const newNode = new Node(val)
        if (!this.root) {
            this.root = newNode
            return this
        }
        let current = this.root
        while (current) {
            if (newNode.val === current.val) {
                return false
            }
            if (newNode.val < current.val) {
                if (!current.left) {
                    current.left = newNode
                    return this
                }
                current = current.left
            } else {
                if (!current.right) {
                    current.right = newNode
                    return this
                }
                current = current.right
            }
        }
        return true

    }

    find(val: any) {
        let current = this.root
        while (current) {
            if (current.val === val)
                return true
            if (val < current.val)
                current = current.left
            else
                current = current.right
        }
        return false
    }

    print() {
        const queue = new Queue()
        queue.enque(this.root)

        while (queue.size > 0) {
            const current = queue.deque()
            console.log(current.val);
            if (current.left)
                queue.enque(current.left)
            if (current.right)
                queue.enque(current.right)
        }
    }
}

const tree = new BST()

tree.incert(5)

tree.incert(2)
tree.incert(7)
tree.incert(3)
tree.incert(1)
tree.incert(9)


console.log(tree.find(1));
console.log(tree.find(10));
console.log(tree.find(9));

tree.print()