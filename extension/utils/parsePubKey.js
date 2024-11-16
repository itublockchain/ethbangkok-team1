// Base64 string olarak public key
const pubkeyBase64 = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgyYqQmUAmDn9J7dR5xl-HlyAA0R2XV5sgQRnSGXbLt_xCrEdD1IVvvkyTmRD16y9p3C2O4PTZ0OF_ZYD2JgTVA==";

// Base64 çözümleme
const pubkeyBytes = Buffer.from(pubkeyBase64, 'base64');

// DER formatını çözümleme
function parseDERPublicKey(pubkey) {
  // DER yapısı: İlk baytlar header bilgisi içerir
  const headerLength = 26; // DER formatındaki başlık genellikle sabittir (26 bayt)
  const keyStart = headerLength; // Asıl public key header'dan sonra başlar

  // Uncompressed key olup olmadığını kontrol et
  if (pubkey[keyStart] !== 0x04) {
    throw new Error("Geçersiz public key formatı: uncompressed değil!");
  }

  // x ve y koordinatlarını çıkar
  const x = pubkey.slice(keyStart + 1, keyStart + 33); // İlk 32 bayt x koordinatı
  const y = pubkey.slice(keyStart + 33, keyStart + 65); // Sonraki 32 bayt y koordinatı

  return [x, y];
}

function toBytes32(hexString) {
  // Başlangıçta "0x" yoksa ekle
  if (!hexString.startsWith("0x")) {
    hexString = "0x" + hexString;
  }

  // 32 byte (64 hex karakter) uzunluğunda olduğundan emin ol
  if (hexString.length !== 66) {
    throw new Error("Geçersiz hex string uzunluğu: " + hexString);
  }

  return hexString;
}

try {
  // x ve y koordinatlarını al
  const [x, y] = parseDERPublicKey(pubkeyBytes);

  // Bytes32[2] formatına dönüştür
  const bytes32Array = [x.toString('hex'), y.toString('hex')];
  console.log("bytes32[2]:", bytes32Array);
  const pubkeyBytes32 = bytes32Array.map(toBytes32);
  console.log("Bytes32[2]:", pubkeyBytes32);
} catch (err) {
  console.error("Hata:", err.message);
}

