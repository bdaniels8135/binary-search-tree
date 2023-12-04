import BinarySearchTree from "./BinarySearchTree.mjs";

const randomArray = [...Array(25)].map(() => Math.floor(Math.random() * 100));

const bst = new BinarySearchTree(randomArray);
bst.prettyPrint();
console.log(bst.isBalanced());

console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());

bst.insert(101).insert(250).insert(200).insert(155).insert(182);

bst.prettyPrint();
console.log(bst.isBalanced());

bst.rebalance();
bst.prettyPrint();
console.log(bst.isBalanced());

console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
