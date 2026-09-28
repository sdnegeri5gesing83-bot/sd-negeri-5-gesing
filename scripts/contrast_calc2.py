#!/usr/bin/env python3
"""Extended contrast analysis: darker primary, gold combos, footer scenarios, hero overlay."""
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

# Background colors (electric theme)
BG = oklch_to_srgb(0.08, 0.02, 250)[0]
CARD = oklch_to_srgb(0.12, 0.025, 250)[0]
SECONDARY = oklch_to_srgb(0.18, 0.03, 250)[0]
GOLD = oklch_to_srgb(0.82, 0.13, 230)[0]
ACCENT = oklch_to_srgb(0.75, 0.15, 195)[0]
ACCENT_FG = oklch_to_srgb(0.1, 0.02, 250)[0]  # dark text on accent

print("=== Primary color tweaks (need white text to pass 4.5:1 for AA normal) ===")
print("Looking for: text-primary-foreground (white) on bg-primary should be >=4.5:1")
white = (1.0, 1.0, 1.0)
primary_foreground_oklch = (0.98, 0.01, 230)
PF_RGB = oklch_to_srgb(*primary_foreground_oklch)[0]
print(f"  primary-foreground = {PF_RGB} hex={oklch_to_srgb(*primary_foreground_oklch)[1]}")
print(f"  pure white = {white}")
print()
for L in [0.45, 0.48, 0.50, 0.52, 0.55, 0.58]:
    for C in [0.22, 0.20, 0.18]:
        primary_rgb, hexc = oklch_to_srgb(L, C, 255)
        cr_pf = contrast_ratio(PF_RGB, primary_rgb)
        cr_w = contrast_ratio(white, primary_rgb)
        marker_pf = "OK AA-normal" if cr_pf >= 4.5 else ("OK AA-large" if cr_pf >= 3 else "FAIL")
        marker_w = "OK AA-normal" if cr_w >= 4.5 else ("OK AA-large" if cr_w >= 3 else "FAIL")
        print(f"  primary oklch({L}, {C}, 255): {hexc}  PF-on-primary: {cr_pf:.2f} [{marker_pf}]  white-on-primary: {cr_w:.2f} [{marker_w}]")
print()

print("=== text-white/X on darker primary L=0.50 ===")
new_primary, hexc = oklch_to_srgb(0.50, 0.22, 255)
print(f"  new primary = {hexc}")
for alpha in [0.70, 0.75, 0.80, 0.85, 0.90, 1.0]:
    comp = alpha_composite(new_primary, white, alpha)
    cr = contrast_ratio(comp, new_primary)
    marker = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"    text-white/{int(alpha*100):3d}: {cr:5.2f}:1 [{marker}]")
print()

print("=== primary as text on dark backgrounds (text-primary on bg) ===")
for L in [0.45, 0.50, 0.55, 0.58, 0.60, 0.62, 0.65, 0.70]:
    primary_rgb, hexc = oklch_to_srgb(L, 0.22, 255)
    cr_bg = contrast_ratio(primary_rgb, BG)
    cr_card = contrast_ratio(primary_rgb, CARD)
    m_bg = "OK AA-normal" if cr_bg >= 4.5 else ("OK AA-large" if cr_bg >= 3 else "FAIL")
    m_card = "OK AA-normal" if cr_card >= 4.5 else ("OK AA-large" if cr_card >= 3 else "FAIL")
    print(f"  primary L={L} ({hexc})  on bg: {cr_bg:.2f} [{m_bg}]  on card: {cr_card:.2f} [{m_card}]")
print()

print("=== gold on various backgrounds ===")
for bg_name, bg_rgb in [('background', BG), ('card', CARD), ('secondary', SECONDARY), ('primary', oklch_to_srgb(0.55, 0.22, 255)[0]), ('primary-L50', oklch_to_srgb(0.50, 0.22, 255)[0])]:
    cr = contrast_ratio(GOLD, bg_rgb)
    m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"  gold on {bg_name}: {cr:.2f}:1 [{m}]")
print()

print("=== text-white/X on a few more backgrounds ===")
white_on = [
    ('BG', BG), ('CARD', CARD), ('SECONDARY', SECONDARY),
    ('primary L=0.55', oklch_to_srgb(0.55, 0.22, 255)[0]),
    ('primary L=0.50', oklch_to_srgb(0.50, 0.22, 255)[0]),
    ('primary L=0.45', oklch_to_srgb(0.45, 0.22, 255)[0]),
    ('accent L=0.75', ACCENT),
    ('gold L=0.82', GOLD),
]
for bg_name, bg_rgb in white_on:
    print(f"  -- on {bg_name} (hex #{''.join('%02x'%round(c*255) for c in bg_rgb)}) --")
    for alpha in [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0]:
        comp = alpha_composite(bg_rgb, white, alpha)
        cr = contrast_ratio(comp, bg_rgb)
        m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
        print(f"    text-white/{int(alpha*100):3d}: {cr:5.2f}:1 [{m}]")
    print()

print("=== gold on primary backgrounds ===")
for L in [0.45, 0.50, 0.55]:
    primary_rgb, hexc = oklch_to_srgb(L, 0.22, 255)
    cr = contrast_ratio(GOLD, primary_rgb)
    m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"  gold on primary L={L} ({hexc}): {cr:.2f}:1 [{m}]")
print()

print("=== Recommended fixes ===")
print("1. Bump --muted-foreground from oklch(0.62, 0.03, 220) to oklch(0.70, 0.03, 220) for AAA-equivalent readability")
print("2. Slightly darken --primary from oklch(0.55, 0.22, 255) to oklch(0.50, 0.22, 255) for white text contrast")
print("3. Bump low opacity text-white/X to higher opacity in footer and navbar")
print("4. Add text-shadow to hero caption text on photos")

# Verify the recommended values
print()
print("=== Verifying recommended muted-foreground oklch(0.70, 0.03, 220) ===")
mf_new, hexc = oklch_to_srgb(0.70, 0.03, 220)
print(f"  muted-foreground new = {hexc}")
for bg_name, bg_rgb in [('background', BG), ('card', CARD), ('secondary', SECONDARY)]:
    cr = contrast_ratio(mf_new, bg_rgb)
    m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"    on {bg_name}: {cr:.2f}:1 [{m}]")

print()
print("=== Verifying recommended primary oklch(0.50, 0.22, 255) ===")
p_new, hexc = oklch_to_srgb(0.50, 0.22, 255)
print(f"  primary new = {hexc}")
print(f"  primary-on-bg: {contrast_ratio(p_new, BG):.2f}:1")
print(f"  primary-on-card: {contrast_ratio(p_new, CARD):.2f}:1")
print(f"  white-on-primary: {contrast_ratio(white, p_new):.2f}:1")
print(f"  primary-foreground-on-primary: {contrast_ratio(PF_RGB, p_new):.2f}:1")
for alpha in [0.7, 0.8, 0.85, 0.9, 1.0]:
    comp = alpha_composite(p_new, white, alpha)
    cr = contrast_ratio(comp, p_new)
    m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"    text-white/{int(alpha*100):3d} on new primary: {cr:5.2f}:1 [{m}]")

print()
print("=== primary-foreground pure white tweak ===")
print("If we use white instead of #f2fafc:")
for L in [0.45, 0.48, 0.50, 0.52, 0.55]:
    primary_rgb, hexc = oklch_to_srgb(L, 0.22, 255)
    cr = contrast_ratio(white, primary_rgb)
    m = "OK AA-normal" if cr >= 4.5 else ("OK AA-large" if cr >= 3 else "FAIL")
    print(f"  white on primary L={L} ({hexc}): {cr:.2f}:1 [{m}]")
