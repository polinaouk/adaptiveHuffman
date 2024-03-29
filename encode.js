const {HuffmanNode} = require('./huffman')
const {lookTree} = require('./lookTree')
const {updateTree} = require('./updateTree')
const {printSteps} = require('./printing')
const {printInitile} = require('./printing')


const dugger = String.fromCharCode(-1)

function encode(initString){
    // INITIALISING ////////////////////////////////////////
    const nodes = [new HuffmanNode(dugger,0)]
    printInitile(nodes)
    let tempOutput = ''

    // first letter will be always in asci
    let output = initString[0].charCodeAt(0).toString(2) 
    
    // constructed initial tree with letter and dugger ax
    nodes.push(new HuffmanNode(initString[0],1))
    let huffmanTree = new HuffmanNode(dugger+ initString[0],1)
    huffmanTree.left = nodes[1]
    huffmanTree.right = nodes[0] // dugger

    // STEP ONE///////////////////////////////////////////////
    printSteps(1,huffmanTree,initString[0],output,nodes, output)

    // NEXT STEPS
    for(let i = 1;i<initString.length;i++){
        let isNew = false 
        const letter = initString[i]

        // check in hash table if it exists or not
        for(let i =0;i<nodes.length;i++){
            // if same letter has already been it increments value 
           if(nodes[i].tag === letter){
               nodes[i].value=nodes[i].value+1
               break
            }
            // if it went throught all hash table tags and has't found the same letter
            if(i === nodes.length-1){ 

                nodes.push(new HuffmanNode(letter,1))

                if(huffmanTree){
                    // calculating dugger 
                    let encondingHuffman = lookTree(huffmanTree, dugger)
                    isNew = true
                    // adding asci value to output as it is a new value with dugger
                    output = output+ encondingHuffman+ letter.charCodeAt(0).toString(2)   
                    tempOutput =  encondingHuffman + ' ' + letter.charCodeAt(0).toString(2)      
                }
                break
            }
        }
        if(!isNew){
            output = output+lookTree(huffmanTree,letter)
            tempOutput = lookTree(huffmanTree,letter)
            }
 
            const updatedTree = updateTree(nodes)
            huffmanTree = updatedTree
            printSteps(i+1,huffmanTree,letter,output,nodes, tempOutput)  
    }
    return output
}
module.exports.encode = encode