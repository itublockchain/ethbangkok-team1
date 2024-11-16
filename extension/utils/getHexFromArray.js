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

// Sağlanan public key koordinatları
const pubkey = [
  "53a48ac24b64e4ca4603497a0f6dcc556722ffeb8e90ae6e754ead55760c8fb7",
  "31d088a0ddfe66a1c8b7ef83f025e481a4e9fe99b1ba0c635969b7912b287f40"
];

// Bytes32[2] formatına dönüştür
try {
  const pubkeyBytes32 = pubkey.map(toBytes32);
  console.log("Bytes32[2]:", pubkeyBytes32);
} catch (err) {
  console.error("Hata:", err.message);
}

