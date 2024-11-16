import { client } from '@passwordless-id/webauthn';

export async function registerPasskey (name: string, challenge: string) : Promise<{[name: string]: {id: string, publicKey: string}}> {
    const payload = await client.register({
        "user": name,
        "challenge": challenge,
        "userVerification": "required",
        "discoverable": "preferred",
        "attestation": true,
        "timeout": 60000 // 1 minute
    });
        
    return {[name]: {
        id: payload.id,
        publicKey: payload.response.publicKey
    }}; // will store in localStorage
}

export async function authenticatePasskey (challenge: string) : Promise<string> {
    const payload = await client.authenticate({
        "challenge": challenge,
        "userVerification": "required",
        "allowCredentials": [],
        "timeout": 60000 // 1 minute
    });

    return payload.id; // will use as salt, may be stored in sessionStorage
}