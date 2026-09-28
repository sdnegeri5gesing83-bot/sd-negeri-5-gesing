#!/usr/bin/env python3
"""Find sweet spot for primary L value that passes AA-normal both directions."""
import math

LMS_TO_RGB = [
    [ 3.9956897,  -3.0563052,   0.0604519],
    [-1.2141024,   2.3738287,  -0.1598192],
    [ 0.0784198,  -0.2601461,   1.1818221],
]

def oklch_to_oklab(L, C, H):
    h = math.radians(H)
    return L, C * math.cos(h), C * math.sin(h)

def oklab_to_lms_cube(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    return l_, m_, s_

def lms_to_linear_srgb(l, m, s):
    r = LMS_TO_RGB[0][0]*l + LMS_TO_RGB[0][1]*m + LMS_TO_RGB[0][2]*s
    g = LMS_TO_RGB[1][0]*l + LMS_TO_RGB[1][1]*m + LMS_TO_RGB[1][2]*s
    b = LMS_TO_RGB[2][0]*l + LMS_TO_RGB[2][1]*m + LMS_TO_RGB[2][2]*s
    return r, g, b

def linear_to_srgb(c):
    if c <= 0: return 0
    if c <= 0.0031308: return 12.92 * c
    return 1.055 * (c ** (1/2.4)) - 0.055

def srgb_to_linear(c):
    if c <= 0: return 0
    if c <= 0.04045: return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4

def oklch_to_srgb(L, C, H):
    L, a, b = oklch_to_oklab(L, C, H)
    l_, m_, s_ = oklab_to_lms_cube(L, a, b)
    l, m, s = l_**3, m_**3, s_**3
    rl, gl, bl = lms_to_linear_srgb(l, m, s)
    r = max(0, min(1, linear_to_srgb(rl)))
    g = max(0, min(1, linear_to_srgb(gl)))
    bb = max(0, min(1, linear_to_srgb(bl)))
    return (r, g, bb), '#{:02x}{:02x}{:02x}'.format(
        round(r*255), round(g*255), round(bb*255))

def relative_luminance(rgb):
    r, g, b = rgb
    return 0.2126 * srgb_to_linear(r) + 0.7152 * srgb_to_linear(g) + 0.0722 * srgb_to_linear(b)

def contrast_ratio(rgb1, rgb2):
    L1 = relative_luminance(rgb1)
    L2 = relative_luminance(rgb2)
    light, dark = max(L1, L2), min(L1, L2)
    return (light + 0.05) / (dark + 0.05)

def alpha_composite(bg, fg, a):
    return tuple(fg_*a + bg_*(1-a) for bg_, fg_ in zip(bg, fg))

BG = oklch_to_srgb(0.08, 0.02, 250)[0]
CARD = oklch_to_srgb(0.12, 0.025, 250)[0]
WHITE = (1.0, 1.0, 1.0)
PF_OKLCH = (0.99, 0.01, 230)
PF_RGB = oklch_to_srgb(*PF_OKLCH)[0]

print("Looking for primary L that passes BOTH:")
print("  text-primary on bg >= 4.5 (AA normal text)")
print("  text-white on bg-primary >= 4.5 (AA normal text on button/footer/badge)")
print()
print(f"  {'L':>5} {'C':>5} {'H':>5}  {'hex':>8}  {'PF-on-prim':>11}  {'white-on-prim':>13}  {'prim-on-bg':>11}  {'prim-on-card':>13}")
for L in [x / 100 for x in range(45, 60)]:
    for C in [0.22, 0.20, 0.18, 0.16, 0.14, 0.12]:
        for H in [255, 250, 245, 240, 235, 230]:
            primary_rgb, hexc = oklch_to_srgb(L, C, H)
            cr_pf = contrast_ratio(PF_RGB, primary_rgb)
            cr_w = contrast_ratio(WHITE, primary_rgb)
            cr_bg = contrast_ratio(primary_rgb, BG)
            cr_card = contrast_ratio(primary_rgb, CARD)
            m_pf = "OK" if cr_pf >= 4.5 else ("L" if cr_pf >= 3 else "F")
            m_w = "OK" if cr_w >= 4.5 else ("L" if cr_w >= 3 else "F")
            m_bg = "OK" if cr_bg >= 4.5 else ("L" if cr_bg >= 3 else "F")
            m_card = "OK" if cr_card >= 4.5 else ("L" if cr_card >= 3 else "F")
            # only print if ALL pass
            if cr_pf >= 4.5 and cr_w >= 4.5 and cr_bg >= 4.5 and cr_card >= 4.5:
                print(f"  {L:>5} {C:>5} {H:>5}  {hexc:>8}  {cr_pf:>5.2f}[{m_pf}]  {cr_w:>5.2f}[{m_w}]  {cr_bg:>5.2f}[{m_bg}]  {cr_card:>5.2f}[{m_card}]")

print()
print("If none pass, find the closest to all-pass. Top candidates by total score:")
candidates = []
for L in [x / 100 for x in range(50, 60)]:
    for C in [0.22, 0.20, 0.18, 0.16]:
        for H in [255, 250, 245]:
            primary_rgb, hexc = oklch_to_srgb(L, C, H)
            cr_pf = contrast_ratio(PF_RGB, primary_rgb)
            cr_w = contrast_ratio(WHITE, primary_rgb)
            cr_bg = contrast_ratio(primary_rgb, BG)
            cr_card = contrast_ratio(primary_rgb, CARD)
            # Score: each direction's pass margin (or deficit if fails)
            score = min(cr_pf - 4.5, cr_w - 4.5, cr_bg - 4.5, cr_card - 4.5)
            candidates.append((score, L, C, H, hexc, cr_pf, cr_w, cr_bg, cr_card))
candidates.sort(key=lambda x: -x[0])
print(f"  Top 5 by minimum-margin-to-4.5:")
for c in candidates[:5]:
    score, L, C, H, hexc, cr_pf, cr_w, cr_bg, cr_card = c
    print(f"    L={L:.2f} C={C:.2f} H={H} ({hexc}): PF-on-prim={cr_pf:.2f}, white-on-prim={cr_w:.2f}, prim-on-bg={cr_bg:.2f}, prim-on-card={cr_card:.2f}  (min margin {score:+.2f})")
