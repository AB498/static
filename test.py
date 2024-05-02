def get_replaced_id():


    calling_dir = os.path.dirname(os.path.abspath(__file__))

    in_file = calling_dir + "/static/idgenerator/src/templates/uk_dl.docx"


    # Create word doc
    doc = Document()

    # Load a doc or docx file
    doc.LoadFromFile(in_file)

    pictures = []

    for i in range(doc.Sections.Count):
        sec = doc.Sections.get_Item(i)

        # Iterate through all paragraphs in each section
        for j in range(sec.Paragraphs.Count):
            para = sec.Paragraphs.get_Item(j)
            # Iterate through all child objects in each paragraph
            for k in range(para.ChildObjects.Count):
                docObj = para.ChildObjects.get_Item(k)

                # Find the images and add them to the list
                if docObj.DocumentObjectType == DocumentObjectType.Picture:
                    # print(docObj.Width, docObj.Height)
                    pictures.append(docObj)

                if docObj.DocumentObjectType == DocumentObjectType.TextBox:
                    print(docObj.Body.Paragraphs.get_Item(0).Text)
                    if docObj.Body.Paragraphs.get_Item(0).Text == "UNITED KINGDOM":
                        docObj.Body.Paragraphs.get_Item(0).Text = "Replace"


    pictures = [(docObj.Width * docObj.Height, docObj) for docObj in pictures]
    heapq.heapify(pictures)

    area, picture = pictures[0]

    w, h = picture.Width, picture.Height
    img_file =calling_dir+ "/static/idgenerator/src/images/ak.png"


    picture.LoadImage(img_file)
    picture.Width, picture.Height = w, h
    print(picture.Width, picture.Height)


    imageStream = doc.SaveImageToStreams(0, ImageType.Bitmap)

    with open("ReplaceImage.jpg", "wb") as imageFile:
        imageFile.write(imageStream.ToArray())


    img = Image.open("ReplaceImage.jpg")
    # crop image to half height from top and bottom
    img = img.crop((0, img.height // 4, img.width, img.height * 3 // 4))
    img.save("tmp.png")


    doc.SaveToFile("ReplaceImage.pdf", FileFormat.PDF)

    doc.Close()

    return "success"

