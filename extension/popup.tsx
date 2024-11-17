import { useEffect, useState } from "react";

import { encryptPassword, decryptPassword } from 'utils/cryptography';
import { registerPasskey, authenticatePasskey } from "utils/passkey";
import { randomChallangeGenerator } from "utils/challangeGenerator";
import { getFatSignature } from "utils/authResponseOrganize";

import { Storage } from "@plasmohq/storage";
import { addPassword, getPasswords } from "~utils/smartAccount";
import { createAccount, takeAccount } from "~utils/createAccount";

const localStorage = new Storage({area: "local"})
const sessionStorage = new Storage({area: "session"})

export default function IndexPopup () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  
  const [publicKey, setPublicKey] = useState("");
  const [userId, setUserId] = useState("");
  const [salt, setSalt] = useState("");

  const [auth, setAuth] = useState({id: "", rawId: "", response: {authenticatorData: "", clientDataJSON: "", signature: ""}});

  const [challange, setChallange] = useState("");

  useEffect(() => {setChallange(randomChallangeGenerator());}, []);

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={async () => {
        const credentials = await registerPasskey(name, challange);
        await localStorage.set("public_key", credentials[name].publicKey);
        await localStorage.set("user_id", credentials[name].id);
        createAccount({
          signature: '0xb5140ee4ee3ef37f9d1aafd493ce46a79dad7a22465d2181f02cd796616c424784c439472a9cc0bdfc41e68d1c73a2adcaf938adaf79d6499298f67d720bf70b',
          publicKeyBytes32: [
            '0x83262a4265009839fd27b751e7197e1e5c800344765d5e6c8104674865db2edf',
            '0xf10ab11d0f5215bef9324e6443d7acbda770b63b83d3674385fd9603d8981354'
          ],
          authenticatorData: '4fb20856f24a6ae7dafc2781090ac8477ae6e2bd072660236cc614c6fb7c2ea01d00000000'
        }, publicKey);
      }}>Sign Up</button>
      <button onClick={async () => {


        setAuth(await authenticatePasskey(challange));
        sessionStorage.set("salt", auth.id); setSalt(auth.id);
        console.log("Get Fat Signature: ", getFatSignature(auth, publicKey));
        takeAccount(publicKey).then((address) => {
          console.log("Address: ", address);
        });



      }}>Log In</button>
      <p>Encrypted: {encryptedPassword}</p>
      <p>Decrypted: {decryptedPassword}</p>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => setEncryptedPassword(encryptPassword(password, salt))}>Encrypt</button>
      <button onClick={() => setDecryptedPassword(decryptPassword(encryptedPassword, salt))}>Decrypt</button>
      <p>Public Key: {publicKey}</p>
      <p>User ID: {userId}</p>
      <p>Salt: {salt}</p>
      <button onClick={async () => {setPublicKey(await localStorage.get("public_key"))}}>Fetch pubkey</button>
      <button onClick={async () => {setUserId(await localStorage.get("user_id"))}}>Fetch userId</button>
      <button onClick={async () => {setSalt(await sessionStorage.get("salt"))}}>Fetch salt</button>
      <p>Challange {challange}</p>
      <button onClick={() => addPassword(auth, password, name, "google.com")}>add password</button>
      <button onClick={async () => {let x = await getPasswords(auth, publicKey, name); console.log(x); return x;}}>getPassword by Name</button>
    </div>
  )
}