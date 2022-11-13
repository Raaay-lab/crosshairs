import drowCrosshair from '../js/canvas.js';


function stringToByteArray(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i += 2) {
        bytes.push(parseInt(str.slice(i, i + 2), 16));
    }
    return bytes;
}

function getText(){
    let crosshairset = document.getElementsByClassName("files-page-sight_settings_and_launch_options2")[0].innerText;
    return crosshairset;
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

const decode = () => {
    const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
    const DICTIONARY_LENGTH = BigInt(DICTIONARY.length);
    const SHARECODE_PATTERN = /CSGO(-?[\w]{5}){5}$/;
    let code = getText();
    if (code === undefined || !code.match(SHARECODE_PATTERN)) {
        return null;
    }
    try {
        const shareCode = code.replace(/CSGO|-/g, '');
        const chars = Array.from(shareCode).reverse();
        let big = BigInt(0);
        chars.forEach((_, i) => {
            big = big *DICTIONARY_LENGTH  + BigInt(DICTIONARY.indexOf(chars[i]));
        });
        const str = big.toString(16).padStart(36, '0');
        const bytes = stringToByteArray(str);
        const crosshair = {
            alpha: 0,
            useAlpha: false,
            useWeaponValue: false,
            color2: 0,
            color_b: 0,
            color_r: 0,
            color_g: 0,
            dot: false,
            gap: 0,
            size: 0,
            style: 0,
            thickness: 0,
            outline: 0,
            outline_draw: false,
            crosshair_t: false,
        };
        let byte2 = dec2bin(bytes[2]);
        if (byte2.length === 8 && byte2.startsWith('1')) {
            byte2 = byte2.padStart(32, '1');
            crosshair.gap = Math.ceil(~~parseInt(byte2, 2) / 10);
        }
        else {
            crosshair.gap = Math.floor(bytes[2] / 10);
        }
        crosshair.gap = crosshair.gap;
        crosshair.outline = bytes[3] / 2;
        crosshair.color_r = bytes[4];
        crosshair.color_g = bytes[5];
        crosshair.color_b = bytes[6];
        crosshair.alpha = bytes[7];
        const byte10 = dec2bin(bytes[10]);
        crosshair.outline_draw = parseInt(byte10.substring(4, 5), 2) === 1;
        crosshair.color = parseInt(byte10.substring(5, 8), 2);
        crosshair.thickness = bytes[12] / 10;
        const byte13 = dec2bin(bytes[13]).padStart(8, '0');
        crosshair.crosshair_t = parseInt(byte13.substring(0, 1), 2) === 1;
        crosshair.useAlpha = parseInt(byte13.substring(1, 2), 2) === 1;
        crosshair.useWeaponValue = parseInt(byte13.substring(2, 3), 2) === 1;
        crosshair.dot = parseInt(byte13.substring(3, 4), 2) === 1;
        crosshair.style = parseInt(byte13.substring(4, 7), 2);
        const byte14 = dec2bin(bytes[14]).padStart(8, '0');
        const byte15 = dec2bin(bytes[15]);
        crosshair.size = Math.ceil(parseInt(byte15 + byte14, 2) / 10);
        return crosshair;
    }
    catch (e) {
        return null;
    }
};


export function parseShareCode(){
    let crosshair = decode();
    drowCrosshair(crosshair);
}
