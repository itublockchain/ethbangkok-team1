import { ethers } from "ethers";

export function getFatSignature (auth) {
    const authenticatorData = Buffer.from(auth.response.authenticatorData.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64");
    const clientData = Buffer.from(auth.response.clientDataJSON.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64");
    const signatureParsed = derToRS(Buffer.from(auth.response.signature.toString().replace(/\-/g, "+").replace(/_/g, "/"), "base64"));
    const rs = [
        ethers.BigNumber.from("0x".concat([... new Uint8Array(signatureParsed[0])].map((b) => b.toString(16).padStart(2, "0")).join(""))),
        ethers.BigNumber.from("0x".concat([... new Uint8Array(signatureParsed[1])].map((b) => b.toString(16).padStart(2, "0")).join(""))),
    ];

    const prefix = Buffer.from('{"type":"webauthn.get","challenge":"', "utf8");
    let clientDataSuffix = clientData.slice(prefix.length).toString();
    const quoteIndex = clientDataSuffix.indexOf('"');
    clientDataSuffix = clientDataSuffix.slice(quoteIndex);

    return ethers.utils.defaultAbiCoder.encode(
        ["bytes", "string", "bytes32[2]"],
        [authenticatorData, clientDataSuffix, rs],
    );
}

function derToRS (der: Buffer) : Array<Buffer> {
    let offset = 3;
    let dataOffset: number;

    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const r = der.slice(dataOffset, dataOffset + 32);
    offset = offset + der[offset] + 1 + 1;
    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const s = der.slice(dataOffset, dataOffset + 32);
    return [r, s];
}