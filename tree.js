class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const cleanedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(cleanedArray);
    }

    buildTree(array) {
        if(array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
    
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
    
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value, node = this.root) {
        if(!node) {
            return new Node(value);
        }

        if (value === node.data) return node;

        if(value < node.data) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    delete(value, node = this.root) {
        if(!node) return null;

        if(value < node.data) {
            node.left = this.delete(value, node.left);
        } else if(value > node.data) {
            node.right = this.delete(value, node.right);
        } else {
            if(!node.left && !node.right) return null; 

            if(!node.left) return node.right;
            if(!node.right) return node.left;

            const succesor = this.findMin(node.right);
            node.data = succesor.data;
            node.right = this.delete(succesor.data, node.right);
        }

        return node;
    }

    findMin(node) {
        while(node.left) node = node.left;
        return node;
    }

    find(value, node = this.root) {
        if(!node) return null;
        if(value === node.data) return node;
        if(value < node.data) return this.find(value, node.left);
        return this.find(value, node.right);
    }

    levelOrder(callback) {
        if(typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }

        const queue = [this.root];

        while(queue.length > 0) {
            const current = queue.shift();
            callback(current);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
    }

    inOrder(callback, node = this.root) {
        if(typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
        if(!node) return;
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if(typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
        if (!node) return;
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required");
        }
        if (!node) return;
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if(!node) return null;

        function getHeight(n) {
            if(!n) return -1;
            const leftHeight = getHeight(n.left);
            const rightHeight = getHeight(n.right);
            return 1 + Math.max(leftHeight, rightHeight);
        }

        return getHeight(node);
    }

    depth(value, node = this.root, currentDepth = 0) {
        if(!node) return null;

        if(value === node.data) return currentDepth;

        if(value < node.data) {
            return this.depth(value, node.left, currentDepth + 1);
        } else {
            return this.depth(value, node.right, currentDepth + 1);
        }

    }

    isBalanced(node = this.root) {
        if(!node) return true;

        const leftHeight = this.height(node.data ? node.left?.data : null);
        const rightHeight = this.height(node.data ? node.right?.data : null);

        const heightDiff = Math.abs(leftHeight - rightHeight);

        if(heightDiff > 1) return false;
        
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const values = [];
        this.inOrder(node => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

export default Tree;