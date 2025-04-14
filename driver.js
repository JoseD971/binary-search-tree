import Tree from './tree.js';

// 1. Create tree from random numbers
const randomArray = getRandomArray();
const tree = new Tree(randomArray);

function getRandomArray(size = 15, max = 100) {
    const set = new Set();
    while (set.size < size) {
      set.add(Math.floor(Math.random() * max));
    }
    return [...set];
}

console.log("Generated tree:");
tree.prettyPrint();

// 2. Confirm that it is balanced
console.log("\nIs it balanced?", tree.isBalanced());

// 3. Show traversals
console.log("\nlevel-order traversal:");
tree.levelOrder(node => console.log(node.data));

console.log("\npre-order traversal:");
tree.preOrder(node => console.log(node.data));

console.log("\nin-order traversal:");
tree.inOrder(node => console.log(node.data));

console.log("\npost-order traversal:");
tree.postOrder(node => console.log(node.data));

// 4. Unbalance the tree
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);
tree.insert(160);
tree.insert(170);

console.log("\nUnbalanced tree:");
tree.prettyPrint();

// 5. Confirm that it is now NOT balanced
console.log("\nIs it balanced?", tree.isBalanced());

// 6. Rebalance the tree
console.log("\nRebalancing...");
tree.rebalance();

// 7. Confirm that it is balanced again
console.log("\nIs it balanced after rebalancing?", tree.isBalanced());

// 8. Show traversals again
console.log("\nlevel-order traversal (post-rebalance):");
tree.levelOrder(node => console.log(node.data));

console.log("\npre-order traversal (post-rebalance):");
tree.preOrder(node => console.log(node.data));

console.log("\nin-order traversal (post-rebalance):");
tree.inOrder(node => console.log(node.data));

console.log("\npost-order traversal (post-rebalance):");
tree.postOrder(node => console.log(node.data));

console.log("\nFinal tree rebalanced:");
tree.prettyPrint();