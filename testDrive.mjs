import BinarySearchTree from "./BinarySearchTree.mjs";

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
