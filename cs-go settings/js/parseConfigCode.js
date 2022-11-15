import drowCrosshair from '../js/canvas.js';


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
    const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
    const DICTIONARY_LENGTH = BigInt(DICTIONARY.length);
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

    let hex2 = h2d(hex);
    let total = BigInt(hex2);
    let c = '';
    let rem = 0 + 'n';
    Array.from({ length: 25 }).forEach(() => {
        rem = total % (DICTIONARY_LENGTH);
        c += DICTIONARY[rem];
        total = total /DICTIONARY_LENGTH;
    });
    return `CSGO-${c.substring(0, 5)}-${c.substring(5, 10)}-${c.substring(10, 15)}-${c.substring(15, 20)}-${c.substring(20, 25)}`;
};


function getText(){
    let crosshairset = document.getElementsByClassName("files-page-sight_settings_and_launch_options")[0].innerText;
    return crosshairset;
}

function getCrosshairValue(type, val) {
	var f = function(val, min, max) {
		return val >= min && val <= max ? val : (val < min ? min : max);
	};
	switch (type) {
	case "color2":
		val = f(val, 1, 5);
		break;
	case "style":
		val = f(val, 0, 4);
		break;
	case "alpha":
	case "color_r":
	case "color_g":
	case "color_b":
		val = f(val, 0, 255); 
		break;
	case "dot":
	case "usealpha":
		val = f(val, 0, 1); 
		break;
	case "thickness":
	case "size":
		val = val >= 0 ? val : 0;
		break;
	case "gap":
		if (val <= -100) val = -100;
        if (val >= 100) val = 100;
		break;
    case "crosshair_t":
	}
	return val;
}

function changeConfig(CONFIG) {
    var regex,
      match,
      config = getText(),
      val,
      i = 0;
      const crosshair = {
        alpha: 0,
        useAlpha: false,
        useWeaponValue: false,
        color: 0,
        color_b: 0,
        color_r: 0,
        color_g: 0,
        dot: 0,
        gap: 0,
        size: 0,
        style: 0,
        thickness: 0,
        outline: 0,
        outline_draw: 0,
        crosshair_t: 0,
    };
    for (const type in CONFIG) {
      regex = new RegExp(CONFIG[type] + "\\s*(\\W?)([-\\d.]+)\\W?");
      match = config.match(regex);
      let costil;
      if (match != null) {
        if (match[1] === '-'){
            costil = match[1] + match[2];
        } else {
            costil = match[2];
        }
        val = getCrosshairValue(type, parseFloat(costil));
        if (
          match != null &&
          crosshair[type] != undefined &&
          crosshair[type] != val
        ) {
          i++;
          crosshair[type] = val;
        }
      }
    }
    return crosshair;
  }

  function configCode(){
    var CONFIG = {
        alpha : "cl_crosshairalpha",
        color : "cl_crosshaircolor",
        color_b : "cl_crosshaircolor_b",
        color_r : "cl_crosshaircolor_r",
        color_g : "cl_crosshaircolor_g",
        dot : "cl_crosshairdot",
        gap : "cl_crosshairgap",
        size : "cl_crosshairsize",
        style : "cl_crosshairstyle",
        usealpha : "cl_crosshairusealpha",
        thickness : "cl_crosshairthickness",
        fgap : "cl_fixedcrosshairgap",
        outline : "cl_crosshair_outlinethickness",
        outline_draw : "cl_crosshair_drawoutline",
        crosshair_t :"cl_crosshair_t"
    };
    let crosshair = changeConfig(CONFIG);
    return crosshair;

  }

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
    if (isNaN(crosshair.color) === false){
        color = crosshair.color;
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


export function parseCFGcode(){
    let crosshair = configCode();
    drowCrosshair(crosshair);
    let huy = document.getElementById("crosshairShareCode");
    console.log(crosshair);
    huy.textContent  = shareCodePrint(crosshair);
    console.log(crosshair);
}
    