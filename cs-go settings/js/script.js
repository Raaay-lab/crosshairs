let cross = document.getElementsByClassName("files-page-sight_settings_and_launch_options")[0].innerText;
let arr = cross.split(";");
console.log(arr);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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
    else if (arr[i].indexOf('cl_crosshaircolor') !== -1) {
        crosshair.color2 = parseInt(arr[i].replace(' cl_crosshaircolor ', ""));
        console.log(arr[i]);
    };
};

if (crosshair.usealpha === 1) {
    ctx.globalAlpha = crosshair.alpha / 255;
}
if (crosshair.gap > 100) {
    crosshair.gap = 100;
};
if (crosshair.gap < -100) {
    crosshair.gap = -100;
};
crosshair.gap = crosshair.gap + 4;
if (crosshair.size <= 0) {
    crosshair.size = 0.5;
};
crosshair.size = crosshair.size * 2;
if (crosshair.thickness <= 0) {
    crosshair.thickness = 0.5;
};
if (crosshair.outline_draw === 1 && crosshair.outline > 0 ) {
    let canvas_background = document.getElementById('canvas');
    canvas_background.style.backgroundColor = 'white';
    // document.canvas.style.backgroundColor = "white";
}
crosshair.thickness = crosshair.thickness * 2;
function createDot(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.thickness + 1,
                crosshair.thickness + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.thickness + 2,
                crosshair.thickness + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.thickness + 3,
                crosshair.thickness + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.thickness + 4,
                crosshair.thickness + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.thickness + 5,
                crosshair.thickness + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.thickness + 6,
                crosshair.thickness + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - crosshair.thickness / 2, center.y - crosshair.thickness / 2, crosshair.thickness, crosshair.thickness);
};

function createMarkRight(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.size + 1,
                crosshair.thickness + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.size + 2,
                crosshair.thickness + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.size + 3,
                crosshair.thickness + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.size + 4,
                crosshair.thickness + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.size + 5,
                crosshair.thickness + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.size + 6,
                crosshair.thickness + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap,
        center.y - crosshair.thickness / 2,
        crosshair.size,
        crosshair.thickness,);
}

function createMarkBottom(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        ctx.fillStyle = "black";
        if (crosshair.outline === 0.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 1,
                crosshair.thickness + 1,
                crosshair.size + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 1,
                crosshair.thickness + 2,
                crosshair.size + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 2,
                crosshair.thickness + 3,
                crosshair.size + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 2,
                crosshair.thickness + 4,
                crosshair.size + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 3,
                crosshair.thickness + 5,
                crosshair.size + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap - 3,
                crosshair.thickness + 6,
                crosshair.size + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - crosshair.thickness / 2,
        center.y - crosshair.thickness / 2 + crosshair.thickness + crosshair.gap,
        crosshair.thickness,
        crosshair.size);
}

function createMarkLeft(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        if (crosshair.outline === 0.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.size + 1,
                crosshair.thickness + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 1,
                center.y - crosshair.thickness / 2 - 1,
                crosshair.size + 2,
                crosshair.thickness + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.size + 3,
                crosshair.thickness + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 2,
                center.y - crosshair.thickness / 2 - 2,
                crosshair.size + 4,
                crosshair.thickness + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.size + 5,
                crosshair.thickness + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillStyle = "black";
            ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness - 3,
                center.y - crosshair.thickness / 2 - 3,
                crosshair.size + 6,
                crosshair.thickness + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size + crosshair.thickness,
        center.y - crosshair.thickness / 2,
        crosshair.size,
        crosshair.thickness,);
}

function createMarkTop(crosshair, center) {
    if (crosshair.outline_draw === 1) {
        ctx.fillStyle = "black";
        if (crosshair.outline === 0.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 1,
                crosshair.thickness + 1,
                crosshair.size + 1);
        }
        if (crosshair.outline === 1) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 1,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 1,
                crosshair.thickness + 2,
                crosshair.size + 2);
        }
        if (crosshair.outline === 1.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 2,
                crosshair.thickness + 3,
                crosshair.size + 3);
        }
        if (crosshair.outline === 2) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 2,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 2,
                crosshair.thickness + 4,
                crosshair.size + 4);
        }
        if (crosshair.outline === 2.5) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 3,
                crosshair.thickness + 5,
                crosshair.size + 5);
        }
        if (crosshair.outline === 3) {
            ctx.fillRect(center.x - crosshair.thickness / 2 - 3,
                center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size - 3,
                crosshair.thickness + 6,
                crosshair.size + 6);
        }
    }
    ctx.fillStyle = crosshair.color[crosshair.color2];
    ctx.fillRect(center.x - crosshair.thickness / 2,
        center.y + crosshair.thickness / 2 - crosshair.thickness - crosshair.gap - crosshair.size,
        crosshair.thickness,
        crosshair.size);

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
createMarkTop(crosshair, center);
if (crosshair.dot === 1) {
    createDot(crosshair, center);
}
ctx.restore();