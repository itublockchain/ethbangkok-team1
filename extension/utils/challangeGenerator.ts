import { random, floor } from 'mathjs';

export function randomChallangeGenerator () : string {
    let buffer = new Uint8Array(18); for (let i = 0; i < 18; i++) {buffer[i] = floor(random(0, 255));}
    const txt = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return txt.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}