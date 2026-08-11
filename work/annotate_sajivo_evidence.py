from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
source = root / 'output/evidence'
target = root / 'output/annotated-evidence'
target.mkdir(parents=True, exist_ok=True)
labels = {
    '01-landing.png': '01  Project-first hero, discovery, and Start a Project CTA',
    '02-register.png': '02  Two-account signup flow; account-path summary removed',
    '03-login.png': '03  Working login form with preview preference controls',
    '04-grey-theme.png': '04  Grey / Spotify-style theme applied',
    '05-dark-theme.png': '05  Dark theme applied',
    '06-hindi-control.png': '06  English / Hindi language control',
}
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)
except OSError:
    font = ImageFont.load_default()
for name, label in labels.items():
    path = source / name
    if not path.exists():
        continue
    image = Image.open(path).convert('RGB')
    draw = ImageDraw.Draw(image)
    band_h = 54
    draw.rectangle((0, 0, image.width, band_h), fill=(32, 43, 41))
    draw.text((18, 16), label, fill=(255, 255, 255), font=font)
    draw.rectangle((3, band_h + 3, image.width - 4, image.height - 4), outline=(211, 95, 69), width=4)
    image.save(target / name, quality=94)
print(target)
