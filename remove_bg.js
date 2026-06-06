const fs = require('fs');

async function removeBg() {
  try {
    let Jimp;
    try {
      Jimp = require("jimp");
      if (!Jimp.read) {
        const jimpModule = require("jimp");
        Jimp = jimpModule.Jimp || jimpModule.default || jimpModule;
      }
    } catch (e) {
      console.log("Could not load Jimp");
      return;
    }

    const image = await Jimp.read("public/images/yms-logo.png");
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If it's near white
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    image.write("public/images/yms-logo-transparent.png", () => {
      console.log("SUCCESS");
    });
  } catch(e) {
    console.log("ERROR", e.message);
  }
}

removeBg();
