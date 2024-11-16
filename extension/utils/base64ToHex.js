const {Buffer} = require('buffer');

const main = async()=>{
    const signature="MEYCIQC1FA7k7j7zf50ar9STzkanna16IkZdIYHwLNeWYWxCRwIhAITEOUcqnMC9_EHmjRxzoq3K-Titr3nWSZKY9n1yC_cL";
    const hex= Buffer.from(signature, 'base64').toString('hex') 
    return "0x"+hex
}

main()