const asn1 = require('asn1.js');

// DER structure definition for an ECDSA signature
const ECSignature = asn1.define('ECSignature', function () {
  this.seq().obj(
    this.key('r').int(),
    this.key('s').int()
  );
});

function convertDerToBytes(derSignature) {
  // Decode the DER-encoded signature
  const decoded = ECSignature.decode(Buffer.from(derSignature, 'base64'), 'der');

  // Convert `r` and `s` to 32-byte buffers
  const r = Buffer.from(decoded.r.toString(16).padStart(64, '0'), 'hex');
  const s = Buffer.from(decoded.s.toString(16).padStart(64, '0'), 'hex');

  if (r.length !== 32 || s.length !== 32) {
    throw new Error('Invalid r or s length after padding!');
  }

  // Concatenate `r` and `s` to create the signature bytes
  const signature = Buffer.concat([r, s]);
  return signature.toString('hex'); // Return as a hex string
}

// Example DER-encoded ECDSA signature
const derSignature = "MEYCIQC1FA7k7j7zf50ar9STzkanna16IkZdIYHwLNeWYWxCRwIhAITEOUcqnMC9_EHmjRxzoq3K-Titr3nWSZKY9n1yC_cL";

try {
  const signatureBytes = convertDerToBytes(derSignature);
  console.log("Signature as hex:", signatureBytes);
} catch (error) {
  console.error("Error:", error.message);
}
