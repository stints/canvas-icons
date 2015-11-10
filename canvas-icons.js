var imgDebug = {};
var CanvasIcons = function(canvas_id) {
  var _canvas = document.getElementById(canvas_id),
      _ctx = _canvas.getContext("2d"),
      _id = 0,
      _icons = [];

  // an icon is 48x48
  this.addIcon = function(x, y, imgLocation, text) {
    assert(text.length )

    var img = new Image();
    img.onload = function() {
      console.log("img loaded")
    }
    img.src = imgLocation;

    // assert the image is square so that scaling is not awful...
    assert(img.width == img.height, "Image data is not square.")

    var icon = {
      "_id": _id++,
      "x": x,
      "y": y,
      "img": img,
      "text": text
    };

    _icons.push(icon);

    return icon["_id"];
  };

  this.deleteIcon = function(id) {
    _icons.forEach(function(element, index, array) {
      if(element["_id"] == id) {
        array.splice(index, 1);
        return true;
      }
    });

    return false;
  }

  this.draw = function() {
    var textLengthInPixels = 0
    _icons.forEach(function(element, index, array) {
      // draw icon background
      _ctx.fillStyle = "rgb(192,192,192)";
      _ctx.fillRect(element.x, element.y, 48, 48);

      // draw image on icon
      _ctx.drawImage(document.img,
                    document.x + 8,
                    document.y + 3,
                    32,
                    32);

      // write label
      _ctx.fillStyle = "rgb(0,0,0)";
      _ctx.textAlign = "center";
      _ctx.font = "10px Tahoma";
      textLengthInPixels = Math.floor(_ctx.measureText(document.text).width)
      _ctx.fillText(document.text,
                    Math.floor(textLengthInPixels + document.x / 2),
                    document.y + 45)
    });
  };
}

function assert(condition, message) {
  if(!condition) {
    throw message;
  }
}
