from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
source = root / 'output/evidence'
live_source = root / 'output/evidence-live'
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
labels.update({
    '01-live-landing.png': 'LIVE 01  Project-first landing page',
    '02-live-services.png': 'LIVE 02  Services and project needs',
    '03-live-professionals.png': 'LIVE 03  Professional discovery',
    '04-live-how-it-works.png': 'LIVE 04  Sajivo workflow',
    '05-live-for-professionals.png': 'LIVE 05  Professional onboarding CTA',
    '06-live-register.png': 'LIVE 06  Signup account choices',
    '07-live-login.png': 'LIVE 07  Login flow',
    '08-live-customer-dashboard.png': 'LIVE 08  Customer dashboard after login',
})
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)
except OSError:
    font = ImageFont.load_default()
for name, label in labels.items():
    path = (live_source if name.startswith(('01-live-', '02-live-', '03-live-', '04-live-', '05-live-', '06-live-', '07-live-', '08-live-')) else source) / name
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
