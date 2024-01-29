import Node from "./node"

export default class Queue {
    first: Node | null
    last: Node | null
    size: number
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    enque(val: any): number {
        const newNode = new Node(val)
        if (!this.first) {
            this.first = newNode
            this.last = newNode
        } else {
            this.last!.next = newNode
            this.last = newNode
        }

        this.size++
        return this.size
    }

    deque(): any {
        let val = null
        if (this.first === this.last)
            this.last = null
        if (this.first) {
            val = this.first.val
            this.first = this.first.next
            this.size--

        }

        // console.log(val);

        return val
    }

    print(): void {
        let temp = this.first
        let vals = ""
        while (temp) {
            vals += `${temp.val} `
            temp = temp.next

        }
        console.log(vals);
    }
}

const queue = new Queue()

queue.enque(4)
queue.enque(6)
queue.enque(2)
queue.enque(1)
queue.enque(0)

queue.print()

queue.deque()
queue.deque()
queue.print()