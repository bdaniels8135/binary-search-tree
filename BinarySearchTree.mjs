import TNode from "./TNode.mjs";
import prettyPrintBST from "./prettyPrintBST.mjs";

export default class BinarySearchTree {
  #root;

  #data;

  constructor(array) {
    this.#data = [...new Set(array)].sort((a, b) => a - b);
    this.#root = this.#buildTree(this.#data);
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
    let node = this.#root;
    while (node !== null) {
      if (node.value === value) break;
      parent = node;
      side = node.value < value ? "right" : "left";
      if (side === "right") node = node.right;
      else node = node.left;
    }
    return [parent, node, side];
  }

  insert(value) {
    const [parent, node, side] = this.#locateNode(value);
    if (node != null && node.value === value) return this;
    const newTNode = new TNode(value);
    if (parent == null) this.#root = newTNode;
    else if (side === "right") parent.right = newTNode;
    else parent.left = newTNode;
    return this;
  }

  #deleteNode(nodeLocation) {
    const [parent, node, side] = nodeLocation;
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
      const nextNodeLocation = [prevNode, nextNode, nextNodeSide];
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

  find(value) {}

  levelOrder(callbackFn) {}

  inOrder(callbackFn) {}

  preOrder(callbackFn) {}

  postOrder(callbackFn) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

// const randomArray = [...Array(20)].map(() => Math.floor(Math.random() * 100));

const constArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new BinarySearchTree(constArray);

bst.insert(10).insert(9).insert(7000).delete(7).delete(9).delete(4);

bst.prettyPrint();
