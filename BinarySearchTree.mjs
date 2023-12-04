import TNode from "./TNode.mjs";
import prettyPrintBST from "./prettyPrintBST.mjs";
import NodeLocation from "./NodeLocation.mjs";

export default class BinarySearchTree {
  #root;

  constructor(array) {
    const cleanedInputData = [...new Set(array)].sort((a, b) => a - b);
    this.#root = this.#buildTree(cleanedInputData);
  }

  #buildTree(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex > endIndex) return null;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const newTNode = new TNode(array[midIndex]);
    newTNode.left = this.#buildTree(array, startIndex, midIndex - 1);
    newTNode.right = this.#buildTree(array, midIndex + 1, endIndex);
    return newTNode;
  }

  prettyPrint() {
    prettyPrintBST(this.#root);
  }

  #locateNode(value) {
    let parent;
    let side;
    let depth = 0;
    let node = this.#root;
    while (node !== null) {
      if (node.value === value) break;
      depth += 1;
      parent = node;
      side = node.value < value ? "right" : "left";
      if (side === "right") node = node.right;
      else node = node.left;
    }
    return new NodeLocation(parent, node, side, depth);
  }

  insert(value) {
    const { parent, node, side } = this.#locateNode(value);
    if (node != null && node.value === value) return this;
    const newTNode = new TNode(value);
    if (parent == null) this.#root = newTNode;
    else if (side === "right") parent.right = newTNode;
    else parent.left = newTNode;
    return this;
  }

  #deleteNode(nodeLocation) {
    const { parent, node, side } = nodeLocation;
    if (node == null) return null;
    if (node.left == null && node.right == null) {
      if (side === "right") parent.right = null;
      else parent.left = null;
      return node;
    }
    if (node.left != null && node.right != null) {
      let prevNode = node;
      let nextNode = node.right;
      let nextNodeSide = "right";
      while (nextNode.left != null) {
        nextNodeSide = "left";
        prevNode = nextNode;
        nextNode = nextNode.left;
      }
      const nextNodeLocation = new NodeLocation(
        prevNode,
        nextNode,
        nextNodeSide
      );
      this.#deleteNode(nextNodeLocation);
      node.value = nextNode.value;
      return node;
    }
    if (node.right != null) parent[side] = node.right;
    else parent[side] = node.left;
    return node;
  }

  delete(value) {
    const nodeLocation = this.#locateNode(value);
    this.#deleteNode(nodeLocation);
    return this;
  }

  contains(value) {
    return !!this.#locateNode(value).node;
  }

  levelOrder(callbackFn = (x) => x) {
    const q = [this.#root];
    const output = [];
    while (q.length !== 0) {
      const itemToProcess = q.shift();
      if (itemToProcess.left != null) q.push(itemToProcess.left);
      if (itemToProcess.right != null) q.push(itemToProcess.right);
      output.push(callbackFn(itemToProcess.value));
    }
    return output;
  }

  inOrder(callbackFn = (x) => x, root = this.#root) {
    const output = [];
    if (root.left != null) output.push(...this.inOrder(callbackFn, root.left));
    output.push(callbackFn(root.value));
    if (root.right != null) {
      output.push(...this.inOrder(callbackFn, root.right));
    }
    return output;
  }

  preOrder(callbackFn = (x) => x, root = this.#root) {
    const output = [];
    output.push(callbackFn(root.value));
    if (root.left != null) output.push(...this.preOrder(callbackFn, root.left));
    if (root.right != null) {
      output.push(...this.preOrder(callbackFn, root.right));
    }
    return output;
  }

  postOrder(callbackFn = (x) => x, root = this.#root) {
    const output = [];
    if (root.left != null) {
      output.push(...this.postOrder(callbackFn, root.left));
    }
    if (root.right != null) {
      output.push(...this.postOrder(callbackFn, root.right));
    }
    output.push(callbackFn(root.value));
    return output;
  }

  #height(node) {
    if (node == null) return -1;
    return Math.max(this.#height(node.left), this.#height(node.right)) + 1;
  }

  isBalanced(root = this.#root) {
    if (root == null) return true;
    if (this.#height(root.left) - this.#height(root.right) > 1) return false;
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    const sortedArray = this.inOrder();
    this.#root = this.#buildTree(sortedArray);
  }
}

const randomArray = [...Array(20)].map(() => Math.floor(Math.random() * 15));

const constArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new BinarySearchTree(constArray);

bst.prettyPrint();
console.log(bst.isBalanced());

bst.insert(1000).insert(2000).insert(10000).insert(5000);

bst.prettyPrint();
console.log(bst.isBalanced());

bst.rebalance();
bst.prettyPrint();
console.log(bst.isBalanced());
