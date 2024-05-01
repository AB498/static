from PIL import Image 

import zlib

from pikepdf import Pdf, PdfImage, Name

example = Pdf.open('src/templates/uk_dl_front.pdf')

page1 = example.pages[0]

print(list(page1.images.keys()))

rawimage = page1.images['/X1']  # The raw object/dictionary

pdfimage = PdfImage(rawimage)

print(type(pdfimage))

rawimage = pdfimage.obj

grayscale = Image.open(r"D:\imgs\pf.png")

grayscale = grayscale.convert('RGB')

grayscale = grayscale.resize((3200, 3200))

rawimage.write(zlib.compress(grayscale.tobytes()), filter=Name("/FlateDecode"))

rawimage.ColorSpace = Name("/DeviceRGB")

rawimage.Width, rawimage.Height = 3200, 3200

example.save('mod.pdf')
