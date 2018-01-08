const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }
  calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis block by Chone himself!!", "0");
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        console.log("Transaction hash: " + this.getLatestBlock().hash)
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    listblockchain() {
        return this.chain;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

//execute code
let cchain = new Blockchain();

for (let i = 1; i <= 10000; i++) {
  cchain.addBlock(new Block(i, Date.now(), { sender: 'chace', receiver: 'jerry rice', amount: 0.002 }));
}

var output = cchain.listblockchain();
console.log(output);
console.log('Blockchain valid: ' + cchain.isChainValid());
