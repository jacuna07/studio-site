#!/usr/bin/env python3
"""Generate placeholder SVG images for the studio-site case studies.

Run once locally to (re)create the placeholder gallery images under
public/images/<slug>/. Not part of the Next.js build — safe to delete
once real photography replaces these.
"""
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

# (slug, project title, background hex, accent hex)
PROJECTS = [
    ("aurora-coffee", "Aurora Coffee Co.", "#0a0a0a", "#8a8a8a"),
    ("lumen-supply", "Lumen Supply", "#1c1c1c", "#bdbdbd"),
    ("north-field", "North Field", "#050505", "#9a9a9a"),
]

# (filename, width, height, label)
IMAGES = [
    ("hero.svg", 2400, 1350, "HERO — 16:9"),
    ("gallery-1.svg", 1600, 1600, "GALLERY 1 — 1:1"),
    ("gallery-2.svg", 1600, 1600, "GALLERY 2 — 1:1"),
    ("gallery-3.svg", 1600, 2000, "GALLERY 3 — 4:5"),
    ("gallery-4.svg", 2400, 1350, "GALLERY 4 — 16:9"),
]

SVG_TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <rect width="{w}" height="{h}" fill="{bg}" />
  <rect x="{margin}" y="{margin}" width="{iw}" height="{ih}" fill="none" stroke="{accent}" stroke-width="2" stroke-dasharray="14 10" opacity="0.5" />
  <text x="50%" y="46%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="{title_size}" fill="{accent}" letter-spacing="1">{title}</text>
  <text x="50%" y="54%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="{label_size}" fill="{accent}" opacity="0.7" letter-spacing="2">{label}</text>
</svg>
"""


def make_svg(w, h, bg, accent, title, label):
    margin = int(min(w, h) * 0.06)
    return SVG_TEMPLATE.format(
        w=w,
        h=h,
        bg=bg,
        accent=accent,
        iw=w - margin * 2,
        ih=h - margin * 2,
        margin=margin,
        title=title.upper(),
        label=label,
        title_size=int(min(w, h) * 0.045),
        label_size=int(min(w, h) * 0.022),
    )


def main():
    for slug, title, bg, accent in PROJECTS:
        out_dir = os.path.join(ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)
        for filename, w, h, label in IMAGES:
            svg = make_svg(w, h, bg, accent, title, label)
            with open(os.path.join(out_dir, filename), "w") as f:
                f.write(svg)
        print(f"wrote {len(IMAGES)} placeholders for {slug}")


if __name__ == "__main__":
    main()
