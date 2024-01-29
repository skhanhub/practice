export default class Node {
    val: any
    next: Node | null
    constructor(val: any) {
        this.val = val
        this.next = null
    }
}