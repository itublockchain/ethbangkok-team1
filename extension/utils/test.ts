import { createAccount, takeAccount } from "./createAccount";
import { addPassword, getPasswords} from "./smartAccount";

const auth = {
    "clientExtensionResults": {},
    "id": "XZg7VBiVGFZzHmC4OrTXNQ",
    "rawId": "XZg7VBiVGFZzHmC4OrTXNQ==",
    "type": "public-key",
    "authenticatorAttachment": "platform",
    "response": {
      "authenticatorData": "T7IIVvJKaufa_CeBCQrIR3rm4r0HJmAjbMYUxvt8LqAdAAAAAA==",
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiYmYxOWQ3ZjktZjk3ZS00NjEyLTg0MjYtNDYwZTExZmExOTBmIiwib3JpZ2luIjoiaHR0cHM6Ly93ZWJhdXRobi5wYXNzd29yZGxlc3MuaWQiLCJjcm9zc09yaWdpbiI6ZmFsc2V9",
      "signature": "MEYCIQC1FA7k7j7zf50ar9STzkanna16IkZdIYHwLNeWYWxCRwIhAITEOUcqnMC9_EHmjRxzoq3K-Titr3nWSZKY9n1yC_cL",
      "userHandle": "ZDUzMGYxMGQtZmI2ZS00ZjdkLTgzMTMtZWQ5N2QzYTU2ZDQ4"
    }
}

const publicKey = [
    '0x83262a4265009839fd27b751e7197e1e5c800344765d5e6c8104674865db2edf',
    '0xf10ab11d0f5215bef9324e6443d7acbda770b63b83d3674385fd9603d8981354'
];

(async () => {
    let accountCreate = await createAccount(auth, publicKey);
    console.log(accountCreate);
    let accountTake = await takeAccount(publicKey);
    console.log(accountTake);
    addPassword(auth, "emre1234", "demoPassword", "google.com");

    let password = await getPasswords(auth, publicKey, "demoPassword");
    console.log
})();
