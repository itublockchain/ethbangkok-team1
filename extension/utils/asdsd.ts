// const asn1 = require("asn1.js");
// const ethers = require("ethers");

// // DER structure definition for an ECDSA signature
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

// // function parseDERPublicKey(publicKey) {
// //     // DER yapısı: İlk baytlar header bilgisi içerir
// //     const headerLength = 26; // DER formatındaki başlık genellikle sabittir (26 bayt)
// //     const keyStart = headerLength; // Asıl public key header'dan sonra başlar
  
// //     // Uncompressed key olup olmadığını kontrol et
// //     if (publicKey[keyStart] !== 0x04) {
// //       throw new Error("Invalid Public Key Format: Uncompressed key expected");
// //     }
  
// //     // x ve y koordinatlarını çıkar
// //     const x = publicKey.slice(keyStart + 1, keyStart + 33); // İlk 32 bayt x koordinatı
// //     const y = publicKey.slice(keyStart + 33, keyStart + 65); // Sonraki 32 bayt y koordinatı
  
// //     return [x, y];
// // }

// // /*export*/ function getFatSignature (auth, publicKey) {
// //     const signature = "0x" + convertDerToBytes(auth.response.signature);
// //     const publicKeyBytes64 = Buffer.from(publicKey, 'base64');
// //     const [x, y] = parseDERPublicKey(publicKeyBytes64);
// //     const bytes32Array = [x.toString('hex'), y.toString('hex')];
// //     const publicKeyBytes32 = bytes32Array.map((hexString) => {
// //         if (!hexString.startsWith("0x")) {hexString = "0x" + hexString;}
// //         if (hexString.length !== 66) {throw new Error("Invalid hexString length: " + hexString);}
// //         return hexString;
// //     });




// //     return {signature, publicKeyBytes32};

// // }




// /*export*/ function getFatSignature (auth, publicKey) {
//     const signature = "0x" + convertDerToBytes(auth.response.signature);
//     const authenticatorData = new Array(Buffer.from(auth.response.authenticatorData.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64")[1]);
//     const signatureParsed = derToRS(Buffer.from(auth.response.signature.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64"));
//     const rs = [
//         ethers.BigNumber.from("0x".concat([... new Uint8Array(signatureParsed[0])].map((b) => b.toString(16).padStart(2, "0")).join(""))),
//         ethers.BigNumber.from("0x".concat([... new Uint8Array(signatureParsed[1])].map((b) => b.toString(16).padStart(2, "0")).join(""))),
//     ];

//     return {authenticatorData, rs, signature};
// }

// function derToRS (der) {
//     let offset = 3;
//     let dataOffset;

//     if (der[offset] == 0x21) {
//         dataOffset = offset + 2;
//     } else {
//         dataOffset = offset + 1;
//     }
//     const r = der.slice(dataOffset, dataOffset + 32);
//     offset = offset + der[offset] + 1 + 1;
//     if (der[offset] == 0x21) {
//         dataOffset = offset + 2;
//     } else {
//         dataOffset = offset + 1;
//     }
//     const s = der.slice(dataOffset, dataOffset + 32);
//     return [r, s];
// }

// console.log(getFatSignature({
//     "clientExtensionResults": {},
//     "id": "XZg7VBiVGFZzHmC4OrTXNQ",
//     "rawId": "XZg7VBiVGFZzHmC4OrTXNQ==",
//     "type": "public-key",
//     "authenticatorAttachment": "platform",
//     "response": {
//       "authenticatorData": "T7IIVvJKaufa_CeBCQrIR3rm4r0HJmAjbMYUxvt8LqAdAAAAAA==",
//       "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiYmYxOWQ3ZjktZjk3ZS00NjEyLTg0MjYtNDYwZTExZmExOTBmIiwib3JpZ2luIjoiaHR0cHM6Ly93ZWJhdXRobi5wYXNzd29yZGxlc3MuaWQiLCJjcm9zc09yaWdpbiI6ZmFsc2V9",
//       "signature": "MEYCIQC1FA7k7j7zf50ar9STzkanna16IkZdIYHwLNeWYWxCRwIhAITEOUcqnMC9_EHmjRxzoq3K-Titr3nWSZKY9n1yC_cL",
//       "userHandle": "ZDUzMGYxMGQtZmI2ZS00ZjdkLTgzMTMtZWQ5N2QzYTU2ZDQ4"
//     }
//   }, "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgyYqQmUAmDn9J7dR5xl-HlyAA0R2XV5sgQRnSGXbLt_xCrEdD1IVvvkyTmRD16y9p3C2O4PTZ0OF_ZYD2JgTVA=="));