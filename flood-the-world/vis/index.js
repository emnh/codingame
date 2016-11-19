function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return parseInt(color, 16);
}

function drawValley(ground, valley) {
	var w = 640;
	var h = 480;

  // mark valley
  var y = valley[0];
  var x1 = valley[1];
  var x2 = valley[2];
  var dir = valley[3];

  var color = 0xFF0000; //getRandomColor();
  var vals = "<div>" + "y=" + y + ", x1=" + x1 + ", x2=" + x2 + ", dir=" + dir + "</div>";
  var div = $("<div><div style='width: 100px; height: 1em; background: #" + color.toString(16) + ";'/>" + vals + "</div>");
  $("body").append(div);

	var renderer = PIXI.autoDetectRenderer(w, h, { antialias: true });
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();

	stage.interactive = true;

	var graphics = new PIXI.Graphics();

  var maxx = 0;
  var maxy = 0;
  for (var i = 0; i < ground.length; i++) {
    var x = ground[i][0];
    var y = ground[i][1];
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
  }

  // draw ground
	graphics.lineStyle(4, 0x0000FF, 1);
  for (var i = 0; i < ground.length - 1; i++) {
    var x = ground[i][0];
    var y = ground[i][1];
    var gx = x / maxx * w;
    var gy = h -  y / maxy * h;

    var x2 = ground[i + 1][0];
    var y2 = ground[i + 1][1];
    var gx2 = x2 / maxx * w;
    var gy2 = h - y2 / maxy * h;
    graphics.moveTo(gx, gy);
    graphics.lineTo(gx2, gy2);
  }

  // draw valley
  var y = valley[0];
  var x1 = valley[1];
  var x2 = valley[2];
  var dir = valley[3];

  var gx1 = x1 / maxx * w;
  var gx2 = x2 / maxx * w;
  var gy = h - y / maxy * h;

  graphics.lineStyle(4, color, 1);
  graphics.moveTo(gx1, gy);
  graphics.lineTo(gx2, gy);

	stage.addChild(graphics);

	// run the render loop
	animate();

	function animate() {

			renderer.render(stage);
			requestAnimationFrame( animate );
	}
}

function update() {
	var appdata = $("#appdata").val();
	appdata = JSON.parse(appdata)

  var ground = appdata.ground;
  var valleys = appdata.valleys;

  for (var i = 0; i < valleys.length; i++) {
    drawValley(ground, valleys[i]);
  }
}

function main() {
  $("#appdata").bind("input propertychange", function() {
    console.log("update");
    update();
  });
}

$(main);
