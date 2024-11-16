function convertToBytes32(authenticatorData) {
    const data = authenticatorData.data;
    console.log("Data:", data.length);
    // Ensure the array length is 32 bytes
    if (data.length !== 32) {
      throw new Error("Data must be exactly 32 bytes!");
    }
  
    // Convert the array to a hexadecimal string
    const hexString = data.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  
    // Prefix with '0x' for Solidity
    return `0x${hexString}`;
  }
  
  // Input authenticatorData
  const authenticatorData = {
    type: "Buffer",
    data: [
      62, 179, 157, 247, 158, 18, 225, 126, 80, 19, 0, 72, 186, 50, 116, 231, 
      132, 247, 168, 22, 38, 172, 95, 210, 137, 14, 140, 8, 179, 255, 140, 178, 
      29, 0, 0, 0, 0
    ]
  };
  
  try {
    const bytes32Value = convertToBytes32(authenticatorData);
    console.log("Bytes32 Value:", bytes32Value);
  } catch (error) {
    console.error("Error:", error.message);
  }
  