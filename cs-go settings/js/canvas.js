function checkCrosshair(crosshair, ctx){
    if (crosshair.useAlpha === true) {
        ctx.globalAlpha = crosshair.alpha / 255;
    }
    if (crosshair.gap > 100) {
        crosshair.gap = 100;
    };
    if (crosshair.gap < -100) {
        crosshair.gap = -100;
    };
    if (crosshair.size <= 0) {
        crosshair.size = 0.5;
    };
    
    if (crosshair.thickness <= 0) {
        crosshair.thickness = 0.5;
    };
    if (crosshair.outline_draw == 1 && crosshair.outline > 0 ) {
        let canvas_background = document.getElementById('canvas');
        canvas_background.style.backgroundColor = 'white';
    }else{
        let canvas_background = document.getElementById('canvas');
        canvas_background.style.backgroundColor = 'black';
    }
    return crosshair;
}

function createDot(crosshair, center, thicknessX2, ctx, color) {
    if (crosshair.outline_draw == 1) {

        let outlineAttrs = [0.5, 1, 1.5, 2, 2.5, 3];
        for (let i in outlineAttrs){
            if (crosshair.outline === outlineAttrs[i]){
                ctx.fillStyle = "black";
                let tt = crosshair.outline;
                ctx.fillRect(center.x - (thicknessX2 / 2) - Math.ceil(tt),
                    center.y - (thicknessX2 / 2) - Math.ceil(tt),
                    thicknessX2 + (outlineAttrs[i] * 2),
                    thicknessX2 + (outlineAttrs[i] * 2));
            }
        }
    }
    ctx.fillStyle = color.color[crosshair.color];
    ctx.fillRect(center.x - thicknessX2 / 2, center.y - thicknessX2 / 2, thicknessX2, thicknessX2);
};

function createMarkRight(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color) {
    if (crosshair.outline_draw == 1) {
        let outlineAttrs = [0.5, 1, 1.5, 2, 2.5, 3];
        for (let i in outlineAttrs){
            if (crosshair.outline === outlineAttrs[i]){
                ctx.fillStyle = "black";
                let tt = crosshair.outline;
                ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4 - Math.ceil(tt),
                    center.y - thicknessX2 / 2 - Math.ceil(tt),
                    sizeX2 + outlineAttrs[i] * 2,
                    thicknessX2 + outlineAttrs[i] * 2);
            }
        }
    }
    ctx.fillStyle = color.color[crosshair.color];
    ctx.fillRect(center.x - thicknessX2 / 2 + thicknessX2 + gap4,
        center.y - thicknessX2 / 2,
        sizeX2,
        thicknessX2,);
}

function createMarkBottom(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color) {
    if (crosshair.outline_draw == 1) {
        let outlineAttrs = [0.5, 1, 1.5, 2, 2.5, 3];
        for (let i in outlineAttrs){
            if (crosshair.outline === outlineAttrs[i]){
                ctx.fillStyle = "black";
                let tt = crosshair.outline;
                    ctx.fillRect(center.x - thicknessX2 / 2 - Math.ceil(tt),
                    center.y - thicknessX2 / 2 + thicknessX2 + gap4 - Math.ceil(tt),
                    thicknessX2 + outlineAttrs[i] * 2,
                    sizeX2 + outlineAttrs[i] * 2);
            }
        }
    }
    ctx.fillStyle = color.color[crosshair.color];
    ctx.fillRect(center.x - thicknessX2 / 2,
        center.y - thicknessX2 / 2 + thicknessX2 + gap4,
        thicknessX2,
        sizeX2);
}

function createMarkLeft(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color) {
    if (crosshair.outline_draw == 1) {
        let outlineAttrs = [0.5, 1, 1.5, 2, 2.5, 3];
        for (let i in outlineAttrs){
            if (crosshair.outline === outlineAttrs[i]){
                ctx.fillStyle = "black";
                let tt = crosshair.outline;
                ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2 -  Math.ceil(tt),
                    center.y - thicknessX2 / 2 - Math.ceil(tt),
                    sizeX2 + outlineAttrs[i] * 2,
                    thicknessX2 + outlineAttrs[i] * 2);
            }
        }
    }
    ctx.fillStyle = color.color[crosshair.color];
    ctx.fillRect(center.x - thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 + thicknessX2,
        center.y - thicknessX2 / 2,
        sizeX2,
        thicknessX2,);
}

function createMarkTop(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color) {
    if (crosshair.outline_draw == 1) {
        let outlineAttrs = [0.5, 1, 1.5, 2, 2.5, 3];
        for (let i in outlineAttrs){
            if (crosshair.outline === outlineAttrs[i]){
                ctx.fillStyle = "black";
                let tt = crosshair.outline;
                ctx.fillRect(center.x - thicknessX2 / 2 - Math.ceil(tt),
                    center.y + thicknessX2 / 2 - thicknessX2 - gap4 - sizeX2 - Math.ceil(tt),
                    thicknessX2 + outlineAttrs[i] * 2,
                    sizeX2 + outlineAttrs[i] * 2);
            }
        }
    }
    ctx.fillStyle = color.color[crosshair.color];
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

function checkColor(crosshair){
    let color = {
        color: {
            0: "#FF1100",
            1: "#2EFA2E",
            2: "#FAFA2E",
            3: "#2E2EFA",
            4: "#2EFAFA",
            5: "#FFFFFF"
        },
    };
    if (crosshair.color === 5) {
        color.color[5] = rgbToHex(crosshair.color_r, crosshair.color_g, crosshair.color_b)
    };
    return color;
    
}

export default function drowCrosshair(crosshair){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    let center = {
        x: canvas.height / 2,
        y: canvas.width / 2
    };

    console.log(crosshair);
    crosshair = checkCrosshair(crosshair, ctx);

    let thicknessX2 = crosshair.thickness * 2;
    let gap4 = crosshair.gap + 4;
    let sizeX2 = crosshair.size * 2;

    let color = checkColor(crosshair);
    createMarkRight(crosshair, center, thicknessX2, sizeX2, gap4 , ctx, color);
    createMarkLeft(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color);
    createMarkBottom(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color);
    if (crosshair.crosshair_t !== 1){
        createMarkTop(crosshair, center, thicknessX2, sizeX2, gap4, ctx, color);
    }
    
    if (crosshair.dot == 1) {
        createDot(crosshair, center, thicknessX2, ctx, color);
    }
    ctx.restore();
}