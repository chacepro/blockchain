// comments hkhgkhj
// owner...ert

const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
      return SHA256(this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
      ).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
    console.log("NONCE: " + this.nonce)
  }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis block by Chone himself!!", "0");
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
    isValidBlockStructure(block) {
      return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string';
    }
}

//############################################################################
//##  execute code - This is for testing only.
//############################################################################

let cchain = new Blockchain();

for (let i = 1; i <= 5; i++) {
  cchain.addBlock(new Block(i, Date.now(), { sender: 'chace', receiver: 'jerry rice', amount: 0.002 }));
}

var output = cchain.listblockchain();
console.log(output);
console.log('Blockchain valid: ' + cchain.isChainValid());
