"""Reviewkaartje voor de balie: A6, 300 dpi, met QR-code naar de Google-reviewlink.

Gebruik: python -I docs/drukwerk/reviewkaartje.py . docs/drukwerk

Vereist Pillow en opencv-python. De QR-code wordt na het maken teruggelezen,
eerst los en dan vanaf het hele kaartje; leest hij niet terug, dan stopt het
script. De letters zijn Georgia en Segoe UI uit C:/Windows/Fonts, als
vervanging voor Playfair Display en Raleway van de site, die niet lokaal
geïnstalleerd zijn.
"""
import math
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

Image.init()  # registreert ook de JPEG-encoder die de PDF-writer gebruikt
REPO, UIT = sys.argv[1], sys.argv[2]
LINK = "https://g.page/r/Ccym1M4uAzm3EBM/review"
LINK_TEKST = "g.page/r/Ccym1M4uAzm3EBM/review"

DPI = 300
W, H = 1240, 1748  # A6, 105 x 148 mm


def oklch(L, C, h):
    a, b = C * math.cos(math.radians(h)), C * math.sin(math.radians(h))
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    lin = (
        4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
        -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
        -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
    )

    def gamma(x):
        x = min(max(x, 0.0), 1.0)
        return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055

    return tuple(round(gamma(x) * 255) for x in lin)


# Kleuren uit app/globals.css
TEKST = oklch(0.22, 0.01, 60)
ROSE = oklch(0.68, 0.08, 22)
GRIJS = (110, 104, 98)

FONTS = "C:/Windows/Fonts/"
kop = ImageFont.truetype(FONTS + "georgia.ttf", 84)
brood = ImageFont.truetype(FONTS + "segoeuil.ttf", 44)
klein = ImageFont.truetype(FONTS + "segoeui.ttf", 30)
voet = ImageFont.truetype(FONTS + "segoeuisl.ttf", 32)

# QR-code, foutcorrectie M, en direct teruglezen als controle
params = cv2.QRCodeEncoder_Params()
params.correction_level = cv2.QRCodeEncoder_CORRECT_LEVEL_M
qr = cv2.QRCodeEncoder.create(params).encode(LINK)
modules = qr.shape[0]
QR_PX = 500
schaal = QR_PX // modules
qr_groot = cv2.resize(qr, (modules * schaal, modules * schaal), interpolation=cv2.INTER_NEAREST)
gelezen, _, _ = cv2.QRCodeDetector().detectAndDecode(cv2.copyMakeBorder(qr_groot, 40, 40, 40, 40, cv2.BORDER_CONSTANT, value=255))
assert gelezen == LINK, f"QR leest terug als {gelezen!r}"
qr_img = Image.fromarray(qr_groot).convert("RGB")

kaart = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(kaart)

# Dunne kader in rosé, 6 mm van de rand
inzet = round(6 / 25.4 * DPI)
d.rounded_rectangle((inzet, inzet, W - inzet, H - inzet), radius=28, outline=ROSE, width=4)

# Logo: alles buiten de cirkel transparant, zodat er geen wit vierkant staat
logo = Image.open(os.path.join(REPO, "Images", "logo-skin-studio-zuid.png")).convert("RGBA")
masker = Image.new("L", logo.size, 0)
ImageDraw.Draw(masker).ellipse((6, 6, logo.size[0] - 6, logo.size[1] - 6), fill=255)
logo.putalpha(Image.composite(logo.getchannel("A"), masker, masker))
LOGO_PX = 240
logo = logo.resize((LOGO_PX, LOGO_PX), Image.LANCZOS)
y = 215
kaart.paste(logo, ((W - LOGO_PX) // 2, y), logo)
y += LOGO_PX + 40


def centreer(tekst, font, y, kleur):
    """Tekent de tekst gecentreerd met de bovenkant van de letters op y; geeft de onderkant terug."""
    box = d.textbbox((0, 0), tekst, font=font)
    x = (W - (box[2] - box[0])) / 2 - box[0]
    d.text((x, y - box[1]), tekst, font=font, fill=kleur)
    return y + (box[3] - box[1])


y = centreer("Tevreden over", kop, y, TEKST) + 30
y = centreer("uw behandeling?", kop, y, TEKST) + 40
y = centreer("Laat een review achter op Google.", brood, y, TEKST) + 50

qr_x = (W - qr_img.width) // 2
kaart.paste(qr_img, (qr_x, y))
y += qr_img.height + 36
y = centreer("Scan de code met de camera van uw telefoon.", klein, y, GRIJS) + 16
y = centreer(LINK_TEKST, klein, y, GRIJS)

# Voetregel, vast boven de onderrand van het kader
voet_y = H - inzet - 110
lijn_y = voet_y - 40
assert y < lijn_y - 30, f"inhoud loopt tot {y}, lijn staat op {lijn_y}"
d.line((W // 2 - 90, lijn_y, W // 2 + 90, lijn_y), fill=ROSE, width=3)
centreer("Skinstudio Zuid  ·  skinstudio-zuid.nl", voet, voet_y, TEKST)

os.makedirs(UIT, exist_ok=True)
png = os.path.join(UIT, "reviewkaartje-a6.png")
pdf = os.path.join(UIT, "reviewkaartje-a6.pdf")
kaart.save(png, dpi=(DPI, DPI))
kaart.save(pdf, resolution=DPI)

# Tweede controle: de QR-code moet ook vanaf het complete kaartje leesbaar zijn
terug, _, _ = cv2.QRCodeDetector().detectAndDecode(cv2.imread(png))
print("modules", modules, "schaal", schaal, "qr px", qr_img.width)
print("kaart leest terug als:", terug)
print("kleuren tekst", TEKST, "rose", ROSE)
print(png, os.path.getsize(png))
print(pdf, os.path.getsize(pdf))
