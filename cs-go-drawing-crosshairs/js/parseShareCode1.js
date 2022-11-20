import drowCrosshair from './canvas1.js';

const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
const DICTIONARY_LENGTH = BigInt(DICTIONARY.length);
const SHARECODE_PATTERN = /^CSGO(-?[\w]{5}){5}$/;

let Crosshair = {
    size: NaN, //length
    color_r: NaN,//red
    color_g: NaN,//green
    color_b: NaN,//blue
    gap: NaN,//gap
    usealpha: false,//alphaEnable
    alpha: NaN,//alpha
    outline_draw: false,//outlineEnabled
    outline: NaN,//outline
    color: NaN,//color
    thickness: NaN,//thickness
    dot: false,//centerDotEnabled
    splitDistance: NaN,//xz
    fixedCrosshairGap: NaN,//xz
    innerSplitAlpha: NaN,//xz
    outerSplitAlpha: NaN,//xz
    splitSizeRatio: NaN,//xz
    crosshair_t: false,//tStyleEnabled
    deployedWeaponGapEnabled: false,//xz
    style: NaN,//style
}


function bytesToHex(bytes) {
    return Array.from(bytes, (byte) => {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
}

function bytesToBigInt(bytes) {
    const hex = bytesToHex(bytes);

    return BigInt(`0x${hex}`);
}

function stringToBytes(str) {
    const bytes = [];

    for (let i = 0; i < str.length; i += 2) {
        bytes.push(parseInt(str.slice(i, i + 2), 16));
    }

    return bytes;
}

function int16ToBytes(number) {
    return [(number & 0x0000ff00) >> 8, number & 0x000000ff];
}

function uint8ToInt8(number) {
    return (number << 24) >> 24;
}

function sumArray(array) {
    return array.reduce((previousValue, value) => {
        return previousValue + value;
    }, 0);
}

function shareCodeToBytes(shareCode) {
    if (!shareCode.match(SHARECODE_PATTERN)) {
        throw new InvalidShareCode();
    }

    shareCode = shareCode.replace(/CSGO|-/g, '');
    const chars = Array.from(shareCode).reverse();
    let big = BigInt(0);
    for (let i = 0; i < chars.length; i++) {
        big = big * DICTIONARY_LENGTH + BigInt(DICTIONARY.indexOf(chars[i]));
    }

    const str = big.toString(16).padStart(36, '0');
    const bytes = stringToBytes(str);

    return bytes;
}

function bytesToShareCode(bytes) {
    const hex = bytesToHex(bytes);
    let total = BigInt(`0x${hex}`);
    let chars = '';
    let rem = BigInt(0);
    for (let i = 0; i < 25; i++) {
        rem = total % DICTIONARY_LENGTH;
        chars += DICTIONARY[Number(rem)];
        total = total / DICTIONARY_LENGTH;
    }

    return `CSGO-${chars.slice(0, 5)}-${chars.slice(5, 10)}-${chars.slice(10, 15)}-${chars.slice(15, 20)}-${chars.slice(
        20,
        25
    )}`;
}

function gapUpd(bytes){
    let xui;
    if (bytes.length === 8 && bytes.startsWith('1')) {
        xui = uint8ToInt8(bytes[2]) / 10;
        return Math.ceil(xui);
    }
    else {
        xui = uint8ToInt8(bytes[2]) / 10;
        return Math.floor(xui);
    }
}


function decodeCrosshairShareCode(shareCode) {
    const bytes = shareCodeToBytes(shareCode);
    const size = sumArray(bytes.slice(1)) % 256;

    if (bytes[0] !== size) {
        throw new InvalidCrosshairShareCode();
    }

    const crosshair = Crosshair = {
        gap: gapUpd(bytes), //uint8ToInt8(bytes[2]) / 10,
        outline: bytes[3] / 2,
        color_r: bytes[4],
        color_g: bytes[5],
        color_b: bytes[6],
        alpha: bytes[7],
        splitDistance: bytes[8],
        fixedCrosshairGap: uint8ToInt8(bytes[9]) / 10,
        color: bytes[10] & 7,
        outline_draw: (bytes[10] & 8) === 8,
        innerSplitAlpha: (bytes[10] >> 4) / 10,
        outerSplitAlpha: (bytes[11] & 0xf) / 10,
        splitSizeRatio: (bytes[11] >> 4) / 10,
        thickness: bytes[12] / 10,
        dot: ((bytes[13] >> 4) & 1) === 1,
        deployedWeaponGapEnabled: ((bytes[13] >> 4) & 2) === 2,
        usealpha: ((bytes[13] >> 4) & 4) === 4,
        crosshair_t: ((bytes[13] >> 4) & 8) === 8,
        style: (bytes[13] & 0xf) >> 1,
        size: bytes[14] / 10,
    };

    if (crosshair.thickness % 1 > 0.7) {
        crosshair.thickness = Math.ceil(crosshair.thickness);
    } else if (crosshair.thickness % 1 < 0.7 && crosshair.thickness % 1 > 0) {
        crosshair.thickness = Math.floor(crosshair.thickness) + 0.5;
    }

    return crosshair;
}

function encodeCrosshair(crosshair) {
    const bytes = [
        0,
        1,
        (crosshair.gap * 10) & 0xff,
        crosshair.outline * 2,
        crosshair.color_r,
        crosshair.color_g,
        crosshair.color_b,
        crosshair.alpha,
        crosshair.splitDistance,
        (crosshair.fixedCrosshairGap * 10) & 0xff,
        (crosshair.color & 7) | (Number(crosshair.outline_draw) << 3) | ((crosshair.innerSplitAlpha * 10) << 4),
        (crosshair.outerSplitAlpha * 10) | ((crosshair.splitSizeRatio * 10) << 4),
        crosshair.thickness * 10,
        (crosshair.style << 1) |
        (Number(crosshair.dot) << 4) |
        (Number(crosshair.deployedWeaponGapEnabled) << 5) |
        (Number(crosshair.usealpha) << 6) |
        (Number(crosshair.crosshair_t) << 7),
        crosshair.size * 10,
        0,
        0,
        0,
    ];

    bytes[0] = sumArray(bytes) & 0xff;

    const shareCode = bytesToShareCode(bytes);

    return shareCode;
}

function crosshairToConVars(crosshair) {
    return `
cl_crosshair_drawoutline "${Number(crosshair.outline_draw)}"
cl_crosshair_dynamic_maxdist_splitratio "${crosshair.splitSizeRatio}"
cl_crosshair_dynamic_splitalpha_innermod "${crosshair.innerSplitAlpha}"
cl_crosshair_dynamic_splitalpha_outermod "${crosshair.outerSplitAlpha}"
cl_crosshair_dynamic_splitdist "${crosshair.splitDistance}"
cl_crosshair_outlinethickness "${crosshair.outline}"
cl_crosshair_t "${Number(crosshair.crosshair_t)}"
cl_crosshairalpha "${crosshair.alpha}"
cl_crosshaircolor "${crosshair.color}"
cl_crosshaircolor_b "${String(crosshair.color_b)}"
cl_crosshaircolor_g "${String(crosshair.color_g)}"
cl_crosshaircolor_r "${String(crosshair.color_r)}"
cl_crosshairdot "${Number(crosshair.dot)}"
cl_crosshairgap "${crosshair.gap}"
cl_crosshairgap_useweaponvalue "${Number(crosshair.deployedWeaponGapEnabled)}"
cl_crosshairsize "${crosshair.size}"
cl_crosshairstyle "${crosshair.style}"
cl_crosshairthickness "${crosshair.thickness}"
cl_crosshairusealpha "${Number(crosshair.usealpha)}"
cl_fixedcrosshairgap "${crosshair.fixedCrosshairGap}"
`;
}


export function parseShareCode(code) {
    let codeKout = code;
    const crosshair = decodeCrosshairShareCode(codeKout);
    drowCrosshair(crosshair);
    // let crosshair = decode(code);
    // drowCrosshair(crosshair);
    // let huy = document.getElementById("crosshairShareCode");
    // let share = document.getElementsByClassName("files-page-sight_settings_and_launch_options2")[0].innerText;
    // huy.textContent  = share;
}
