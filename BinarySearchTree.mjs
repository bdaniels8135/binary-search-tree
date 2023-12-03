import TNode from "./TNode.mjs";
import prettyPrintBST from "./prettyPrintBST.mjs";

export default class BinarySearchTree {
  #root;

  #data;

  constructor(array) {
    this.#data = [...new Set(array)].sort((a, b) => a - b);
    this.#root = this.buildTree(this.#data);
  }

  buildTree(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex > endIndex) return null;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const newTNode = new TNode(array[midIndex]);
    newTNode.left = this.buildTree(array, startIndex, midIndex - 1);
    newTNode.right = this.buildTree(array, midIndex + 1, endIndex);
    return newTNode;
  }

  prettyPrint() {
    prettyPrintBST(this.#root);
  }

  insert(value) {}

  delete(value) {}

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

const data = [...Array(20)].map(() => Math.floor(Math.random() * 100));

const bst = new BinarySearchTree(data);

bst.prettyPrint();
console.log(data);
