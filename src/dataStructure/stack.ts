import Node from "./node"

export default class Stack {
    first: Node | null
    last: Node | null
    size: number
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    push(val: any): number {
        const newNode = new Node(val)
        if (!this.first) {
            this.first = newNode
            this.last = newNode
        } else {
            newNode.next = this.first
            this.first = newNode
        }

        this.size++
        return this.size
    }

    pop(): any {
        let val = null
        if (this.first) {
            val = this.first.val
            this.first = this.first.next
            this.size--
        }
        console.log(val);

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

const stack = new Stack()

stack.push(4)
stack.push(6)
stack.push(2)
stack.push(1)
stack.push(0)

stack.print()

stack.pop()
stack.pop()
stack.print()