from PIL import Image 
import os
import zlib
from pikepdf import Pdf, PdfImage, Name

calling_dir = os.path.dirname(os.path.abspath(__file__))


in_file = calling_dir+"/src/templates/uk_dl_front.pdf"

# example = Pdf.open(in_file)
# page1 = example.pages[0]
# print(page1.images['/X1'])
# print(list(page1.images.keys()))

# rawimage = page1.images['/X1']  # The raw object/dictionary
# pdfimage = PdfImage(rawimage)
# print(type(pdfimage))
# rawimage = pdfimage.obj 
# grayscale = Image.open(r"D:\imgs\pf.png")
# grayscale = grayscale.convert('RGB')
# grayscale = grayscale.resize((3200, 3200))
# rawimage.write(zlib.compress(grayscale.tobytes()), filter=Name("/FlateDecode"))
# rawimage.ColorSpace = Name("/DeviceRGB")
# rawimage.Width, rawimage.Height = 3200, 3200
# example.save('mod.pdf')


# from spire.pdf.common import *
# from spire.pdf import *
# doc = PdfDocument()
# doc.LoadFromFile(calling_dir+'/src/templates/uk_dl_front.pdf')
# page = doc.Pages[0]
# imageHelper = PdfImageHelper()
# imageInfo = imageHelper.GetImagesInfo(page)
# image = PdfImage.FromFile('D:/imgs/pf.png')
# imageHelper.ReplaceImage(imageInfo[1], image)

# print(imageInfo[1])

# doc.SaveToFile("mod.pdf", FileFormat.PDF)




import os
import argparse
from PyPDF2 import PdfReader, PdfWriter
from PyPDF2.generic import DecodedStreamObject, EncodedStreamObject, NameObject

def replace_text(content, replacements=dict()):
    lines = content.splitlines()
    result = ""
    in_text = False
    for line in lines:
        if line == "BT":
            in_text = True

        elif line == "ET":
            in_text = False

        elif in_text:
            cmd = line[-2:]
            if cmd.lower() == "tj":
                replaced_line = line
                for k, v in replacements.items():
                    replaced_line = replaced_line.replace(k, v)
                result += replaced_line + "\n"
            else:
                result += line + "\n"
            continue

        result += line + "\n"
    return result

def process_data(object, replacements):
    data = object.get_data()
    decoded_data = data.decode("utf-8")
    print('decoded_data',object)
    if(decoded_data.find('1999') > -1):
        replaced_data = replace_text(decoded_data, replacements)
        print('yes', replaced_data)

    encoded_data = replaced_data.encode("utf-8")
    if object.decoded_self is not None:
        object.decoded_self.set_data(encoded_data)
    else:
        object.set_data(encoded_data)

# in_file = "mod.pdf"
filename_base = in_file.replace(os.path.splitext(in_file)[1], "")

replacements = {"1999": "1911" , "UNITED":"USITEDDDDDDDDDF"}

pdf = PdfReader(in_file)
writer = PdfWriter()

for page_number in range(0, len(pdf.pages)):

    page = pdf.pages[page_number]
    contents = page.get_contents()

    if isinstance(contents, DecodedStreamObject) or isinstance(
        contents, EncodedStreamObject
    ):
        process_data(contents, replacements)
    elif len(contents) > 0:
        for obj in contents:
            if isinstance(obj, DecodedStreamObject) or isinstance(
                obj, EncodedStreamObject
            ):
                streamObj = obj.getObject()
                process_data(streamObj, replacements)

    page[NameObject("/Contents")] = contents.decoded_self
    writer.add_page(page)

with open( "mod.pdf", "wb") as out_file:
    writer.write(out_file)

