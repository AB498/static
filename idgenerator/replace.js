const sharp = require("sharp");
const { PDFDocument, PDFName, PDFRawStream, decodePDFRawStream, arrayAsString } = require("pdf-lib");
const zlib = require("zlib");
const fs = require("fs");

// Can use either exact string or regex pattern
const rules = [
  {
    pattern: "UNITED",
    replacement: "UXITED",
  },
];
async function isValidBuffer(buffer) {
  try {
    await sharp(buffer).toFile("tmp.jpg");
    return true;
  } catch (error) {
    return false;
  }
}

function isInflatable(buffer) {
  try {
    zlib.inflateSync(buffer);
    return true;
  } catch (error) {
    return false;
  }
}
const replaceText = async (data) => {
  const pdfDoc = await PDFDocument.load(data);

  cnt = 0;
  for (let [pdfRef, pdfObject] of pdfDoc.context.enumerateIndirectObjects()) {
    if (!(pdfObject instanceof PDFRawStream)) {
      continue;
    }
    if (pdfObject?.dict?.get(PDFName.of("Subtype")) === PDFName.of("Image")) {
      //   console.log("now", pdfObject.dict.dict);
      cnt++;
      if (!isInflatable(pdfObject.contents)) {
        console.log("skipped not inflatable", pdfRef.objectNumber);
        continue;
      }
      if (!(await isValidBuffer(zlib.inflateSync(pdfObject.contents)))) {
        console.log("skipped not valid", pdfRef.objectNumber);
        myImgBuffer = fs.readFileSync("D:\\imgs\\pfp_main.jpg");
        pdfImgBuffer = (await isValidBuffer(zlib.inflateSync(pdfObject.contents))) ? zlib.inflateSync(pdfObject.contents) : pdfObject.contents;
        if (await sharp(pdfObject.contents)
        .toFile("input" + pdfRef.objectNumber + ".png")) {
          console.log("maybe valid");
          ;
          console.log("saved2");
          continue;
        } else {
          console.log(myImgBuffer.slice(0, 3), pdfImgBuffer.slice(0, 3));
          continue;
        }
      }
      let [w, h] = [pdfObject.dict.dict.get(PDFName.of("Width")).value(), pdfObject.dict.dict.get(PDFName.of("Height")).value()];

      myImgBuffer = fs.readFileSync("D:\\imgs\\pfp_main.jpg");
      pdfImgBuffer = (await isValidBuffer(zlib.inflateSync(pdfObject.contents))) ? zlib.inflateSync(pdfObject.contents) : pdfObject.contents;

      console.log(myImgBuffer.slice(0, 3), pdfImgBuffer.slice(0, 3));

      newBuffer = await sharp(pdfImgBuffer)
        .resize({ width: Math.floor(w / 2), kernel: "nearest" })
        .toBuffer();

      await sharp(newBuffer).resize(330, null).flatten().toFile("newFile.png");
      console.log("saved");

      //   fs.createWriteStream("input" + pdfRef.objectNumber + ".png").write(newBuffer);
      fs.writeFileSync("input" + pdfRef.objectNumber + ".png", newBuffer);
      pdfObject.contents = zlib.deflateSync(newBuffer);
      console.log("cnt", cnt);
    }
    //   // write image buffer
    //   // convert buffer to string
    //   // const imgStr = Buffer.from(pdfObject.contents).toString("base64");
    //   // fs.writeFileSync("input.jpg", imgStr);
    //   // if (pdfObject.contents.byteLength > 10000) fs.writeFileSync("input" + pdfRef.objectNumber + ".png", pdfObject.contents);

    //   var data = fs.readFileSync("D:\\imgs\\pfp_main.jpg");
    //   let buffer = Buffer.from(data);
    //   let targetBufferSize = pdfObject.contents.byteLength;

    //   let resizedBuffer;
    //   let [w, h] = [pdfObject.dict.dict.get(PDFName.of("Width")).value(), pdfObject.dict.dict.get(PDFName.of("Height")).value()];
    //   try {
    //     // Resize the image synchronously to fit within the target buffer size while maintaining aspect ratio
    //     resizedBuffer = await sharp(buffer).resize({ width: w, height: h, kernel: "nearest" }).toBuffer();

    //     // Save the resized image buffer to a file or use it as needed
    //     fs.writeFileSync("resized_image.jpg", resizedBuffer);

    //     console.log("before", buffer.byteLength);
    //     // buffer = resizedBuffer;
    //     console.log("after", resizedBuffer.byteLength, targetBufferSize);
    //   } catch (err) {
    //     console.error("Error resizing image:", err);
    //   }

    //   console.log(w, h);
    //   // if(targetBufferSize<buffer.byteLength)
    //   try {
    //     deflated = (pdfObject.contents);
    //     // if(pdfRef.objectNumber != 9)
    //     // continue;
    //     // fs.writeFileSync("resized_image" + pdfRef.objectNumber + ".jpg", deflated);
    //     pdfObject.contents = zlib.deflateSync(buffer);
    //   } catch (err) {
    //     console.log("Error deflating image:", err.message);
    //     deflated = pdfObject.contents;
    //   }
    //   // if(cnt>19)break;
    //   // pdfObject.dict.dict.set(PDFName.of("Height"), null);

    //   pdfObject.updateDict();

    //   continue;
    // }

    // let text = arrayAsString(decodePDFRawStream(pdfObject).decode());
    // let modified = false;

    // for (const rule of rules) {
    //   const newText = text.replace(rule.pattern, rule.replacement);

    //   if (newText !== text) {
    //     text = newText;

    //     modified = true;
    //   }
    // }

    // if (modified) {
    //   pdfObject.contents = zlib.deflateSync(text);
    // }
  }

  const bytes = await pdfDoc.save();

  return Buffer.from(bytes);
};

replaceText(fs.readFileSync("src/templates/uk_dl_front.pdf")).then((buf) => fs.writeFileSync("./modJS.pdf", buf));
