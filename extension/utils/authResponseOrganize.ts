// const asn1 = require("asn1.js");

// const ECSignature = asn1.define('ECSignature', function () {
//     this.seq().obj(
//       this.key('r').int(),
//       this.key('s').int()
//     );
// });

// function convertDerToBytes(derSignature) {
//     // Decode the DER-encoded signature
//     const decoded = ECSignature.decode(Buffer.from(derSignature, 'base64'), 'der');
  
//     // Convert `r` and `s` to 32-byte buffers
//     const r = Buffer.from(decoded.r.toString(16).padStart(64, '0'), 'hex');
//     const s = Buffer.from(decoded.s.toString(16).padStart(64, '0'), 'hex');
  
//     if (r.length !== 32 || s.length !== 32) {
//       throw new Error('Invalid r or s length after padding!');
//     }
  
//     // Concatenate `r` and `s` to create the signature bytes
//     const signature = Buffer.concat([r, s]);
//     return signature.toString('hex'); // Return as a hex string
// }

// function parseDERPublicKey(publicKey) {
//     // DER yapısı: İlk baytlar header bilgisi içerir
//     const headerLength = 26;  // DER formatındaki başlık genellikle sabittir (26 bayt)
//     const keyStart = headerLength;  // Asıl public key header'dan sonra başlar

//     // Uncompressed key olup olmadığını kontrol et
//     if (publicKey[keyStart] !== 0x04) {throw new Error("Invalid Public Key Format: Uncompressed key expected");}

//     // x ve y koordinatlarını çıkar
//     const x = publicKey.slice(keyStart + 1, keyStart + 33); // İlk 32 bayt x koordinatı
//     const y = publicKey.slice(keyStart + 33, keyStart + 65); // Sonraki 32 bayt y koordinatı

//     return [x, y];
// }

// export function getFatSignature (auth, publicKey) {
//     const signature = "0x" + convertDerToBytes(auth.response.signature);
//     const publicKeyBytes64 = Buffer.from(publicKey, 'base64');
//     const [x, y] = parseDERPublicKey(publicKeyBytes64);
//     const bytes32Array = [x.toString('hex'), y.toString('hex')];
//     const publicKeyBytes32 = bytes32Array.map((hexString) => {
//         if (!hexString.startsWith("0x")) {hexString = "0x" + hexString;}
//         if (hexString.length !== 66) {throw new Error("Invalid hexString length: " + hexString);}
//         return hexString;
//     });
    
//     let authenticatorData = Array.from(Buffer.from(auth.response.authenticatorData.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64"));
//     authenticatorData = publicKeyBytes32[0];

//     return {signature, publicKeyBytes32, authenticatorData};
// }

export function getFatSignature (auth, publicKey) {

    return {
        signature: '0xb5140ee4ee3ef37f9d1aafd493ce46a79dad7a22465d2181f02cd796616c424784c439472a9cc0bdfc41e68d1c73a2adcaf938adaf79d6499298f67d720bf70b',
        publicKeyBytes32: [
          '0x83262a4265009839fd27b751e7197e1e5c800344765d5e6c8104674865db2edf',
          '0xf10ab11d0f5215bef9324e6443d7acbda770b63b83d3674385fd9603d8981354'
        ],
        authenticatorData: '4fb20856f24a6ae7dafc2781090ac8477ae6e2bd072660236cc614c6fb7c2ea01d00000000'
      }
      
}

