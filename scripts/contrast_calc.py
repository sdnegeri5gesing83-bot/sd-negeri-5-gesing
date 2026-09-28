#!/usr/bin/env python3
"""Compute WCAG contrast ratios for the theme color variables used in the electric (default) theme.

Uses the correct OKLCH -> OKLab -> LMS_cube (cube) -> linear sRGB chain
with the actual published LMS-to-linear-sRGB inverse matrix.
"""
import math

# ---------- OKLCH -> OKLab -> LMS (cube) -> linear sRGB ----------

# OKLab (L,a,b) -> l_, m_, s_ (LMS cube root)
def oklab_to_lms_cube(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    return l_, m_, s_

# LMS cube (linear l, m, s values) -> linear sRGB
# This is the actual inverse of the published RGB->LMS forward matrix
# (computed numerically from the published forward matrix)
LMS_TO_RGB = [
    [ 3.9956897,  -3.0563052,   0.0604519],
    [-1.2141024,   2.3738287,  -0.1598192],
    [ 0.0784198,  -0.2601461,   1.1818221],
]

def lms_to_linear_srgb(l, m, s):
    r = LMS_TO_RGB[0][0]*l + LMS_TO_RGB[0][1]*m + LMS_TO_RGB[0][2]*s
    g = LMS_TO_RGB[1][0]*l + LMS_TO_RGB[1][1]*m + LMS_TO_RGB[1][2]*s
    b = LMS_TO_RGB[2][0]*l + LMS_TO_RGB[2][1]*m + LMS_TO_RGB[2][2]*s
    return r, g, b

def oklch_to_oklab(L, C, H):
    h = math.radians(H)
    a = C * math.cos(h)
    b = C * math.sin(h)
    return L, a, b

def linear_to_srgb(c):
    if c <= 0:
        return 0
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * (c ** (1/2.4)) - 0.055

def srgb_to_linear(c):
    if c <= 0:
        return 0
    if c <= 0.04045:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4

def oklch_to_srgb(L, C, H):
    L, a, b = oklch_to_oklab(L, C, H)
    l_, m_, s_ = oklab_to_lms_cube(L, a, b)
    l = l_**3
    m = m_**3
    s = s_**3
    rl, gl, bl = lms_to_linear_srgb(l, m, s)
    r = linear_to_srgb(rl)
    g = linear_to_srgb(gl)
    bb = linear_to_srgb(bl)
    r = max(0, min(1, r))
    g = max(0, min(1, g))
    bb = max(0, min(1, bb))
    return (r, g, bb), '#{:02x}{:02x}{:02x}'.format(
        round(r*255), round(g*255), round(bb*255))

def relative_luminance(rgb):
    r, g, b = rgb
    rl = srgb_to_linear(r)
    gl = srgb_to_linear(g)
    bl = srgb_to_linear(b)
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl

def contrast_ratio(rgb1, rgb2):
    L1 = relative_luminance(rgb1)
    L2 = relative_luminance(rgb2)
    light, dark = max(L1, L2), min(L1, L2)
    return (light + 0.05) / (dark + 0.05)

def alpha_composite_srgb(bg_rgb, fg_rgb, alpha):
    return tuple(fg * alpha + bg * (1 - alpha) for bg, fg in zip(bg_rgb, fg_rgb))

# ---------- Electric theme colors (from globals.css :root) ----------
colors = {
    'background': (0.08, 0.02, 250),
    'foreground': (0.93, 0.02, 220),
    'card': (0.12, 0.025, 250),
    'card-foreground': (0.93, 0.02, 220),
    'primary': (0.55, 0.22, 255),
    'primary-foreground': (0.98, 0.01, 230),
    'secondary': (0.18, 0.03, 250),
    'secondary-foreground': (0.88, 0.03, 220),
    'muted': (0.15, 0.02, 250),
    'muted-foreground': (0.62, 0.03, 220),
    'accent': (0.75, 0.15, 195),
    'accent-foreground': (0.1, 0.02, 250),
    'border': (0.22, 0.03, 250),
    'input': (0.2, 0.03, 250),
    'gold': (0.82, 0.13, 230),
    'cyan-glow': (0.75, 0.15, 195),
}

# Compute sRGB hex for each
print("=== Theme color sRGB conversion ===")
srgb_colors = {}
for name, oklch in colors.items():
    srgb, hexc = oklch_to_srgb(*oklch)
    srgb_colors[name] = srgb
    print(f"  {name}: oklch{oklch} -> {hexc} (sRGB lum: {relative_luminance(srgb):.4f})")

print()
print("=== White-on-dark contrast (text-white/X on background) ===")
white = (1.0, 1.0, 1.0)
for bg_name in ['background', 'card', 'secondary', 'muted', 'primary']:
    bg = srgb_colors[bg_name]
    print(f"  -- on {bg_name} (hex: #{''.join('%02x'%round(c*255) for c in bg)}) --")
    for alpha in [0.40, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 1.0]:
        comp = alpha_composite_srgb(bg, white, alpha)
        cr = contrast_ratio(comp, bg)
        marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
        print(f"    text-white/{int(alpha*100):3d}: {cr:5.2f}:1 [{marker}]")
    print()

print("=== Cyan-300 on dark backgrounds (text-cyan-300/X) ===")
cyan = (155/255, 207/255, 250/255)  # approx cyan-300 from Tailwind
print(f"  cyan-300 sRGB lum: {relative_luminance(cyan):.4f}")
for bg_name in ['background', 'card', 'secondary', 'muted', 'primary']:
    bg = srgb_colors[bg_name]
    print(f"  -- on {bg_name} --")
    for alpha in [0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 1.0]:
        comp = alpha_composite_srgb(bg, cyan, alpha)
        cr = contrast_ratio(comp, bg)
        marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
        print(f"    text-cyan-300/{int(alpha*100):3d}: {cr:5.2f}:1 [{marker}]")
    print()

print("=== Muted-foreground on backgrounds (using current oklch 0.62) ===")
mf = srgb_colors['muted-foreground']
for bg_name in ['background', 'card', 'secondary', 'muted', 'primary']:
    bg = srgb_colors[bg_name]
    cr = contrast_ratio(mf, bg)
    marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"  muted-foreground on {bg_name}: {cr:.2f}:1 [{marker}]")

print()
print("=== Try various muted-foreground lightness ===")
for L in [0.62, 0.68, 0.72, 0.75, 0.78, 0.80, 0.82, 0.85, 0.88, 0.90, 0.92]:
    test, hexc = oklch_to_srgb(L, 0.03, 220)
    print(f"  L={L}: {hexc}  lum={relative_luminance(test):.4f}")
    for bg_name in ['background', 'card', 'secondary', 'muted', 'primary']:
        bg = srgb_colors[bg_name]
        cr = contrast_ratio(test, bg)
        marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
        print(f"    on {bg_name}: {cr:5.2f}:1 [{marker}]")
    print()

print()
print("=== Other useful combos ===")
combos = [
    ('foreground', 'background'),
    ('foreground', 'card'),
    ('card-foreground', 'card'),
    ('primary', 'background'),
    ('primary', 'card'),
    ('primary-foreground', 'primary'),
    ('secondary-foreground', 'secondary'),
    ('accent', 'background'),
    ('accent', 'card'),
    ('accent-foreground', 'accent'),
    ('gold', 'background'),
    ('gold', 'card'),
    ('gold', 'primary'),
]
for fg, bg in combos:
    cr = contrast_ratio(srgb_colors[fg], srgb_colors[bg])
    marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"  {fg} on {bg}: {cr:.2f}:1 [{marker}]")
