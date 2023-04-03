export default class BITNbInv {
    /**
     * Allow to get the sum of element between 0 and the index in the original array
     * @param {Array<int>} BITree is the representation in a Binary Indexed Tree (Fenwick Tree)
     * @param {int} index is the end index of the sum
     * @returns the sum between 0 and the index
     * Complexity: C = O(log(n))
     */
    getSum(BITree, index) {
        let sum = 0;
        while (index > 0) {
            sum += BITree[index];
            // Go to parent
            index -= index & (-index);
        }
        return sum;
    }

    /**
     * Allow to update the BIT 
     * @param {Array<int>} BITree is the Binary Indexed Tree to udpdate
     * @param {int} n is the size of the BIT
     * @param {int} index is the index to update
     * @param {int} val is the new value of BITree[i]
     * Complexity: C = O(log(n))
     */
    updateBIT(BITree, n, index, val) {
        while (index <= n) {
            BITree[index] += val;
            index += index & (-index);
        }
    }

    /**
     * Allow to get the number of inversion in an Array fill by integer between [1,n]
     * @param {Array<int>} arr is the input array
     * @param {int} n is the size of the array
     * @returns the number of inversion in the input array
     * Complexity: C = O(n+n*2*log(n)) = O(nlog(n))
     */
    getInvCount(arr, n = arr.length) {
        let invNb = 0;

        // Creation of the BIT 
        let BIT = new Array(n + 1);

        // Initialization of the BIT
        for (let i = 1; i <= n; i++) {
            BIT[i] = 0;
        }

        // Fullfilling of the BIT by the right 
        for (let i = n - 1; i >= 0; i--) {
            // Count the smaller element already marked
            invNb += this.getSum(BIT, arr[i] - 1);
            // Mark the bigger element with +1
            this.updateBIT(BIT, n, arr[i], 1);
        }
        return invNb;
    }

}