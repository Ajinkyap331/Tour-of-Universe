from PIL import Image
img = Image.open("D:\Three + React\learning\src\Images\8k_earth_daymap.jpg")
print(img.size)
img = img.resize((408, 204), Image.ANTIALIAS)
img.save("D:\Three + React\learning\src\Images\compress-8k_earth_daymap.jpg",
         optimize=True, quality=95)
