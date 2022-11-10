function test(){
    //let cross = document.getElementsByClassName("files-page-sight_settings_and_launch_options")[0].innerText;
let cross = document.getElementById("input").value;
let arr = cross.split(";");
console.log(arr);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

let center = {
    x: 0,
    y: 0
};

center = {
    x: canvas.height / 2,
    y: canvas.width / 2
};

let crosshair = {
    alpha: NaN,
    color: {
        0: "#FF1100",
        1: "#2EFA2E",
        2: "#FAFA2E",
        3: "#2E2EFA",
        4: "#2EFAFA",
        5: "#FFFFFF"
    },
    color2: NaN,
    color_b: NaN,
    color_r: NaN,
    color_g: NaN,
    dot: NaN,
    gap: NaN,
    size: NaN,
    style: NaN,
    usealpha: NaN,
    thickness: NaN,
    outline: NaN,
    outline_draw: NaN,
    crosshair_t: NaN,
};

console.log(crosshair);
for (i in arr) {
    //console.log(arr[i]);
    if (arr[i].indexOf('cl_crosshairalpha') !== -1) {
        crosshair.alpha = parseInt(arr[i].replace('cl_crosshairalpha ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshairdot') !== -1) {
        crosshair.dot = parseInt(arr[i].replace(' cl_crosshairdot ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshairgap') !== -1) {
        crosshair.gap = parseFloat(arr[i].replace(' cl_crosshairgap ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshairsize') !== -1) {
        crosshair.size = parseFloat(arr[i].replace(' cl_crosshairsize ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshairusealpha') !== -1) {
        crosshair.usealpha = parseInt(arr[i].replace(' cl_crosshairusealpha ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshair_outlinethickness') !== -1) {
        crosshair.outline = parseFloat(arr[i].replace(' cl_crosshair_outlinethickness ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshair_drawoutline') !== -1) {
        crosshair.outline_draw = parseFloat(arr[i].replace(' cl_crosshair_drawoutline ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshairthickness') !== -1) {
        crosshair.thickness = parseFloat(arr[i].replace(' cl_crosshairthickness ', ""));
        if (crosshair.thickness <= 0) {
            crosshair.thickness = 0.5;

        }
        console.log(arr[i]);
    }

    else if (arr[i].indexOf('cl_crosshaircolor_b') !== -1) {
        crosshair.color_b = parseFloat(arr[i].replace(' cl_crosshaircolor_b ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshaircolor_r') !== -1) {
        crosshair.color_r = parseFloat(arr[i].replace(' cl_crosshaircolor_r ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshaircolor_g') !== -1) {
        crosshair.color_g = parseFloat(arr[i].replace(' cl_crosshaircolor_g ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshair_t') !== -1) {
        crosshair.crosshair_t = parseInt(arr[i].replace(' cl_crosshair_t ', ""));
        console.log(arr[i]);
    }
    else if (arr[i].indexOf('cl_crosshaircolor') !== -1) {
        crosshair.color2 = parseInt(arr[i].replace(' cl_crosshaircolor ', ""));
        console.log(arr[i]);
    };
    //СТАЙЛ
};
console.log(crosshair);
if (crosshair.usealpha === 1) {
    ctx.globalAlpha = crosshair.alpha / 255;
}
if (crosshair.gap > 100) {
    crosshair.gap = 100;
};
if (crosshair.gap < -100) {
    crosshair.gap = -100;
};
let gap4 = crosshair.gap + 4;
if (crosshair.size <= 0) {
    crosshair.size = 0.5;
};
let sizeX2 = crosshair.size * 2;
if (crosshair.thickness <= 0) {
    crosshair.thickness = 0.5;
};
if (crosshair.outline_draw === 1 && crosshair.outline > 0 ) {
    let canvas_background = document.getElementById('canvas');
    canvas_background.style.backgroundColor = 'white';
    // document.canvas.style.backgroundColor = "white";
}else{
    let canvas_background = document.getElementById('canvas');
    canvas_background.style.backgroundColor = 'grey';
}
let thicknessX2 = crosshair.thickness * 2;
function createDot(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y - thicknessX2 / 2 - 1,
                thicknessX2 + 1,
                thicknessX2 + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y - thicknessX2 / 2 - 1,
                thicknessX2 + 2,
                thicknessX2 + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y - thicknessX2 / 2 - 2,
                thicknessX2 + 3,
                thicknessX2 + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y - thicknessX2 / 2 - 2,
                thicknessX2 + 4,
                thicknessX2 + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y - thicknessX2 / 2 - 3,
                thicknessX2 + 5,
                thicknessX2 + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y - thicknessX2 / 2 - 3,
                thicknessX2 + 6,
                thicknessX2 + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - thicknessX2 / 2, center.y - thicknessX2 / 2, thicknessX2, thicknessX2);
};

function createMarkRight(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 1,
                center.y - thicknessX2 / 2 - 1,
                sizeX2 + 1,
                thicknessX2 + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 1,
                center.y - thicknessX2 / 2 - 1,
                sizeX2 + 2,
                thicknessX2 + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 2,
                center.y - thicknessX2 / 2 - 2,
                sizeX2 + 3,
                thicknessX2 + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 2,
                center.y - thicknessX2 / 2 - 2,
                sizeX2 + 4,
                thicknessX2 + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 3,
                center.y - thicknessX2 / 2 - 3,
                sizeX2 + 5,
                thicknessX2 + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - 3,
                center.y - thicknessX2 / 2 - 3,
                sizeX2 + 6,
                thicknessX2 + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4,
        center.y - thicknessX2 / 2,
        sizeX2,
        thicknessX2,);
}

function createMarkBottom(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        ctx.fillStyle = "black";
        if (crosshair.outline === 0.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 1,
                thicknessX2 + 1,
                sizeX2 + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 1,
                thicknessX2 + 2,
                sizeX2 + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 2,
                thicknessX2 + 3,
                sizeX2 + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 2,
                thicknessX2 + 4,
                sizeX2 + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 3,
                thicknessX2 + 5,
                sizeX2 + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y - thicknessX2 / 2 + thicknessX2 + gap4 - 3,
                thicknessX2 + 6,
                sizeX2 + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - thicknessX2 / 2,
        center.y - thicknessX2 / 2 + thicknessX2 + gap4,
        thicknessX2,
        sizeX2);
}

function createMarkLeft(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 1,
                center.y - thicknessX2 / 2 - 1,
                sizeX2 + 1,
                thicknessX2 + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 1,
                center.y - thicknessX2 / 2 - 1,
                sizeX2 + 2,
                thicknessX2 + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 2,
                center.y - thicknessX2 / 2 - 2,
                sizeX2 + 3,
                thicknessX2 + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 2,
                center.y - thicknessX2 / 2 - 2,
                sizeX2 + 4,
                thicknessX2 + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 3,
                center.y - thicknessX2 / 2 - 3,
                sizeX2 + 5,
                thicknessX2 + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 - 3,
                center.y - thicknessX2 / 2 - 3,
                sizeX2 + 6,
                thicknessX2 + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2,
        center.y - thicknessX2 / 2,
        sizeX2,
        thicknessX2,);
}

function createMarkTop(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        ctx.fillStyle = "black";
        if (crosshair.outline === 0.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 1,
                thicknessX2 + 1,
                sizeX2 + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 1,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 1,
                thicknessX2 + 2,
                sizeX2 + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 2,
                thicknessX2 + 3,
                sizeX2 + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 2,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 2,
                thicknessX2 + 4,
                sizeX2 + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 3,
                thicknessX2 + 5,
                sizeX2 + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillRect(center.x - thicknessX2 / 2 - 3,
                center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - 3,
                thicknessX2 + 6,
                sizeX2 + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - thicknessX2 / 2,
        center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2,
        thicknessX2,
        sizeX2);

}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

if (crosshair.color2 === 5) {
    crosshair.color[5] = rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b)
};

ctx.fillStyle = crosshair.color[crosshair.color2];
createMarkRight(crosshair, center);
createMarkBottom(crosshair, center);
createMarkLeft(crosshair, center);
if (crosshair.crosshair_t !== 1){
    createMarkTop(crosshair, center);
}

if (crosshair.dot === 1) {
    createDot(crosshair, center);
}
ctx.restore();

// const BigInteger = require('big-integer');
const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
// const DICTIONARY_LENGTH = BigInt(DICTIONARY.length);
const DICTIONARY_LENGTH = BigInt(DICTIONARY.length);
const SHARECODE_PATTERN = /CSGO(-?[\w]{5}){5}$/;

function bytesToHex(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function h2d(s) {

    function add(x, y) {
        var c = 0, r = [];
        var x = x.split('').map(Number);
        var y = y.split('').map(Number);
        while(x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10); 
            c = s < 10 ? 0 : 1;
        }
        if(c) r.unshift(c);
        return r.join('');
    }

    var dec = '0';
    s.split('').forEach(function(chr) {
        var n = parseInt(chr, 16);
        for(var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if(n & t) dec = add(dec, '1');
        }
    });
    return dec;
}

const encode = (crosshair) => {
    let bytes = [
        1,
        (crosshair.gap * 10),
        Math.min(6, crosshair.outlineThickness * 2),
        crosshair.r,
        crosshair.g,
        crosshair.b,
        crosshair.alpha,
        7,
        30,
        53,
    ];
    bytes.splice(9, 0, parseInt(`1010${crosshair.outline ? 1 : 0}${dec2bin(crosshair.color).padStart(3, '0')}`, 2));
    bytes.push(Math.min(63, crosshair.thickness * 10));
    bytes.push(parseInt(`${crosshair.t ? 1 : 0}${crosshair.useAlpha ? 1 : 0}${crosshair.useWeaponValue ? 1 : 0}${crosshair.dot ? 1 : 0}${dec2bin(crosshair.style).padStart(3, '0')}0`, 2));
    bytes.push(crosshair.size * 10);
    bytes = bytes.concat([0, 0, 0]);
    let checksum = dec2bin(bytes.reduce((a, v) => a + v)).padStart(3, '0');
    checksum = checksum.substring(checksum.length - 8, checksum.length);
    bytes.unshift(parseInt(checksum, 2));
    const hex = bytesToHex(bytes);

    console.log(typeof(hex))
    console.log(Number.MAX_SAFE_INTEGER)
    let hex2 = h2d(hex);
    let total = BigInt(hex2);
    console.log(total);
    let c = '';
    let rem = 0 + 'n';
    Array.from({ length: 25 }).forEach(() => {
        rem = total % (DICTIONARY_LENGTH);
        c += DICTIONARY[rem];
        total = total /DICTIONARY_LENGTH;
    });
    return `CSGO-${c.substring(0, 5)}-${c.substring(5, 10)}-${c.substring(10, 15)}-${c.substring(15, 20)}-${c.substring(20, 25)}`;
};

function stringToByteArray(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i += 2) {
        bytes.push(parseInt(str.slice(i, i + 2), 16));
    }
    return bytes;
}


const decode = (code) => {
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
            b: 0,
            color: 0,
            dot: false,
            g: 0,
            gap: 0,
            outline: false,
            outlineThickness: 0,
            r: 0,
            size: 0,
            style: 0,
            t: false,
            thickness: 0,
            useAlpha: false,
            useWeaponValue: false
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
        crosshair.outlineThickness = bytes[3] / 2;
        crosshair.r = bytes[4];
        crosshair.g = bytes[5];
        crosshair.b = bytes[6];
        crosshair.alpha = bytes[7];
        const byte10 = dec2bin(bytes[10]);
        crosshair.outline = parseInt(byte10.substring(4, 5), 2) === 1;
        crosshair.color = parseInt(byte10.substring(5, 8), 2);
        crosshair.thickness = bytes[12] / 10;
        const byte13 = dec2bin(bytes[13]).padStart(8, '0');
        crosshair.t = parseInt(byte13.substring(0, 1), 2) === 1;
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

let csgo_share_code  = document.getElementById('csgo-share-code');

function shareCodePrint(crosshair){
    let useAlpha = true;
    let alpha = 255;
    let color = 1;
    let r = 0;
    let g = 0;
    let b = 0;
    let size = 4;
    let style = 4;
    let gap = 0;
    let thickness = 1;
    let dot = false;
    let outline = false;
    let outlineThickness = 1;
    let t = false;
    let useWeaponValue = false;
    if (crosshair.usealpha === 1){
        useAlpha = true;
    }else{
        useAlpha = false;
    }
    if (isNaN(crosshair.alpha) === false){
        alpha = crosshair.alpha;
    }
    if (isNaN(crosshair.color2) === false){
        color = crosshair.color2;
    }
    if (isNaN(crosshair.color_r) === false){
        r = crosshair.color_r;
    }
    if (isNaN(crosshair.color_g) === false){
        g = crosshair.color_g;
    }
    if (isNaN(crosshair.color_b) === false){
        b = crosshair.color_b;
    }
    if (isNaN(crosshair.size) === false){
        size = crosshair.size;
    }
    if (isNaN(crosshair.style) === false){
        style = crosshair.style;
    }
    if (isNaN(crosshair.gap) === false){
        gap = crosshair.gap;
    }
    if (isNaN(crosshair.thickness) === false){
        thickness = crosshair.thickness;
    }
    if (crosshair.dot === 1){
        dot = true;
    }else{
        dot = false;
    }
    if (crosshair.outline_draw === 1){
        outline = true;
    }else{
        outline = false;
    }
    if (isNaN(crosshair.outline) === false){
        outlineThickness = crosshair.outline;
    }
    if (crosshair.crosshair_t === 1){
        t = true;
    }else{
        t = false;
    }
    return(encode({useAlpha, alpha, color, r, g, b, size, style, gap, thickness,
    dot, outline, outlineThickness, t, useWeaponValue}))
    // useWeaponValue
}
console.log(shareCodePrint(crosshair));
let huy = document.getElementById("crosshairShareCode");
huy.textContent  = shareCodePrint(crosshair);

// document.body.append(encode({
//     useAlpha: true,
//     alpha: 255,
//     color: 1,
//     r: 0,
//     g: 0,
//     b: 0,
//     size: 4,
//     style: 4,
//     gap: 0,
//     thickness: 1,
//     dot: false,
//     outline: false,
//     outlineThickness: 1,
//     t: false,
//     useWeaponValue: false
// }));

// let csgo_code  = document.getElementById('csgo--code');
// let cr = decode('CSGO-qBD4P-q9uNy-xrYjf-QrW5O-BaBpF');
// document.body.append(cr.alpha);
// document.body.append(cr.color);
// document.body.append(cr.b);
// document.body.append(cr.dot);
// document.body.append(cr.g);
// document.body.append(cr.gap);
// document.body.append(cr.outline);
// document.body.append(cr.outlineThickness);
// document.body.append(cr.r);

}