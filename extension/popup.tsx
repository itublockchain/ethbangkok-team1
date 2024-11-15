import { useState } from "react";

import { encryptPassword, decryptPassword } from 'utils/cryptography';
import { registerPasskey, authenticatePasskey } from "utils/passkey";

import { Storage } from "@plasmohq/storage";

const localStorage = new Storage({area: "local"})
const sessionStorage = new Storage({area: "session"})

const challange = "eoWTjmUwZQISXPJv_PrRfX6_";

export default function IndexPopup () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  
  const [publicKey, setPublicKey] = useState("");
  const [userId, setUserId] = useState("");
  const [salt, setSalt] = useState("");

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={async () => {
        const credentials = await registerPasskey(name, challange);
        await localStorage.set("public_key", credentials[name].publicKey);
        await localStorage.set("user_id", credentials[name].id);
      }}>Sign Up</button>
      <button onClick={async () => {
        const id = await authenticatePasskey(challange);
        sessionStorage.set("salt", id); setSalt(id);
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
    </div>
  )
}