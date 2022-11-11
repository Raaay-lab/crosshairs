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
	outline_draw : "cl_crosshair_drawoutline"
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

function getText(){
    let crosshairset = document.getElementById("input").value;
    return crosshairset;
}

function getCrosshairValue(type, val) {
	var f = function(val, min, max) {
		return val >= min && val <= max ? val : (val < min ? min : max);
	};
	switch (type) {
	case "color":
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

function changeConfig() {
    var regex,
      match,
      config = getText(),
      crosshairNew = {},
      val,
      i = 0;

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
          crosshairNew[type] = val;
        }
      }
    }

    console.log(crosshairNew);
  }

