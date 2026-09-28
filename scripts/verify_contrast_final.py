#!/usr/bin/env python3
"""Verify contrast ratios for the final electric theme values."""
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

# Alpha composite in linear sRGB space (proper way for WCAG)
def alpha_composite_linear(bg_linear, fg_linear, alpha):
    """Alpha compositing in linear sRGB space."""
    return tuple(fg*alpha + bg*(1-alpha) for bg, fg in zip(bg_linear, fg_linear))

def alpha_contrast(bg_srgb, fg_srgb, alpha):
    """Compute contrast for fg-at-alpha over bg, doing alpha composite in linear space."""
    bg_l = [srgb_to_linear(c) for c in bg_srgb]
    fg_l = [srgb_to_linear(c) for c in fg_srgb]
    mixed_l = alpha_composite_linear(bg_l, fg_l, alpha)
    mixed_lum = 0.2126 * mixed_l[0] + 0.7152 * mixed_l[1] + 0.0722 * mixed_l[2]
    bg_lum = relative_luminance(bg_srgb)
    light, dark = max(mixed_lum, bg_lum), min(mixed_lum, bg_lum)
    return (light + 0.05) / (dark + 0.05)

# Final electric theme values
BG, _ = oklch_to_srgb(0.08, 0.02, 250)
CARD, _ = oklch_to_srgb(0.12, 0.025, 250)
SECONDARY, _ = oklch_to_srgb(0.18, 0.03, 250)
MUTED, _ = oklch_to_srgb(0.15, 0.02, 250)
PRIMARY, hex_p = oklch_to_srgb(0.52, 0.22, 245)
PF, hex_pf = oklch_to_srgb(0.99, 0.01, 230)
GOLD, hex_g = oklch_to_srgb(0.85, 0.13, 230)
ACCENT, hex_a = oklch_to_srgb(0.75, 0.15, 195)
MF, hex_mf = oklch_to_srgb(0.72, 0.03, 220)
SF, hex_sf = oklch_to_srgb(0.92, 0.025, 220)
RING, hex_r = oklch_to_srgb(0.55, 0.2, 255)
TEAL_SOFT, hex_ts = oklch_to_srgb(0.16, 0.03, 250)
NAVY_STRONG = (10/255, 15/255, 30/255)  # #0a0f1e

WHITE = (1.0, 1.0, 1.0)

print(f"=== Final Electric Theme Color Values ===")
print(f"  background: oklch(0.08 0.02 250) = #{''.join('%02x'%round(c*255) for c in BG)}  lum={relative_luminance(BG):.4f}")
print(f"  card:       oklch(0.12 0.025 250) = #{''.join('%02x'%round(c*255) for c in CARD)}  lum={relative_luminance(CARD):.4f}")
print(f"  secondary:  oklch(0.18 0.03 250) = #{''.join('%02x'%round(c*255) for c in SECONDARY)}  lum={relative_luminance(SECONDARY):.4f}")
print(f"  muted:      oklch(0.15 0.02 250) = #{''.join('%02x'%round(c*255) for c in MUTED)}  lum={relative_luminance(MUTED):.4f}")
print(f"  primary:    oklch(0.52 0.22 245) = {hex_p}  lum={relative_luminance(PRIMARY):.4f}")
print(f"  primary-fg: oklch(0.99 0.01 230) = {hex_pf}  lum={relative_luminance(PF):.4f}")
print(f"  gold:       oklch(0.85 0.13 230) = {hex_g}  lum={relative_luminance(GOLD):.4f}")
print(f"  accent:     oklch(0.75 0.15 195) = {hex_a}  lum={relative_luminance(ACCENT):.4f}")
print(f"  muted-fg:   oklch(0.72 0.03 220) = {hex_mf}  lum={relative_luminance(MF):.4f}")
print(f"  secondary-fg: oklch(0.92 0.025 220) = {hex_sf}  lum={relative_luminance(SF):.4f}")
print(f"  ring:       oklch(0.55 0.2 255) = {hex_r}  lum={relative_luminance(RING):.4f}")
print(f"  teal-soft:  oklch(0.16 0.03 250) = {hex_ts}  lum={relative_luminance(TEAL_SOFT):.4f}")

print()
print("=== Solid color contrast ratios (full opacity) ===")
combos = [
    ('foreground (PF?) on background', (oklch_to_srgb(0.93, 0.02, 220)[0]), BG),
    ('foreground on card', (oklch_to_srgb(0.93, 0.02, 220)[0]), CARD),
    ('primary on background', PRIMARY, BG),
    ('primary on card', PRIMARY, CARD),
    ('primary-foreground on primary', PF, PRIMARY),
    ('white on primary', WHITE, PRIMARY),
    ('accent on background', ACCENT, BG),
    ('accent on card', ACCENT, CARD),
    ('accent-foreground on accent', (oklch_to_srgb(0.1, 0.02, 250)[0]), ACCENT),
    ('gold on background', GOLD, BG),
    ('gold on card', GOLD, CARD),
    ('gold on primary', GOLD, PRIMARY),
    ('muted-foreground on background', MF, BG),
    ('muted-foreground on card', MF, CARD),
    ('muted-foreground on secondary', MF, SECONDARY),
    ('secondary-foreground on secondary', SF, SECONDARY),
    ('navy-strong on gold', NAVY_STRONG, GOLD),
    ('navy-strong on accent', NAVY_STRONG, ACCENT),
]
for name, fg, bg in combos:
    cr = contrast_ratio(fg, bg)
    m = "PASS AA-normal" if cr >= 4.5 else ("PASS AA-large" if cr >= 3 else "FAIL")
    print(f"  {name:50s} {cr:6.2f}:1 [{m}]")

print()
print("=== Alpha-modified text on dark backgrounds ===")
for bg_name, bg in [('bg', BG), ('card', CARD), ('secondary', SECONDARY), ('muted', MUTED)]:
    print(f"  -- on {bg_name} --")
    for alpha in [0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0]:
        cr_w = alpha_contrast(bg, WHITE, alpha)
        m_w = "PASS AA-normal" if cr_w >= 4.5 else ("PASS AA-large" if cr_w >= 3 else "FAIL")
        print(f"    text-white/{int(alpha*100):3d}: {cr_w:5.2f}:1 [{m_w}]")
    print()

print("=== Alpha-modified text on primary (electric blue) bg ===")
for alpha in [0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0]:
    cr_w = alpha_contrast(PRIMARY, WHITE, alpha)
    cr_pf = alpha_contrast(PRIMARY, PF, alpha)
    m_w = "PASS AA-normal" if cr_w >= 4.5 else ("PASS AA-large" if cr_w >= 3 else "FAIL")
    m_pf = "PASS AA-normal" if cr_pf >= 4.5 else ("PASS AA-large" if cr_pf >= 3 else "FAIL")
    print(f"  alpha {alpha}: white/primary-fg -> {cr_w:5.2f} [{m_w}]  primary-foreground/primary-fg -> {cr_pf:5.2f} [{m_pf}]")

print()
print("=== Specific text combinations ===")
# Footer copyright text-xs opacity-95
cr = alpha_contrast(PRIMARY, WHITE, 0.95)
print(f"  Footer copyright text-white/95 on primary: {cr:.2f}:1 [{'PASS' if cr >= 4.5 else 'FAIL'}]")
# Footer version text-xs opacity-90
cr = alpha_contrast(PRIMARY, WHITE, 0.90)
print(f"  Footer version text-white/90 on primary: {cr:.2f}:1 [{'PASS' if cr >= 4.5 else 'FAIL'}]")
# Footer body text opacity-95
cr = alpha_contrast(PRIMARY, WHITE, 0.95)
print(f"  Footer body text-white/95 on primary: {cr:.2f}:1 [{'PASS' if cr >= 4.5 else 'FAIL'}]")

# Hero text on electric blue overlay (primary L=0.52 at /80 over dark navy bg)
# Effective bg = 80% primary + 20% bg = mixed
mixed_bg_l = [srgb_to_linear(PRIMARY[i])*0.8 + srgb_to_linear(BG[i])*0.2 for i in range(3)]
mixed_bg_lum = 0.2126 * mixed_bg_l[0] + 0.7152 * mixed_bg_l[1] + 0.0722 * mixed_bg_l[2]
# Convert back to sRGB for display
mixed_bg_srgb = tuple(linear_to_srgb(c) for c in mixed_bg_l)
print(f"  Hero section effective bg (primary/80 over bg): lum={mixed_bg_lum:.4f} hex=#{''.join('%02x'%round(c*255) for c in mixed_bg_srgb)}")
for alpha in [0.85, 0.9, 1.0]:
    text_l = srgb_to_linear(1.0) * alpha + mixed_bg_lum * (1-alpha)
    light, dark = max(text_l, mixed_bg_lum), min(text_l, mixed_bg_lum)
    cr = (light + 0.05) / (dark + 0.05)
    m = "PASS AA-normal" if cr >= 4.5 else ("PASS AA-large" if cr >= 3 else "FAIL")
    print(f"    text-white/{int(alpha*100):3d} on hero bg: {cr:5.2f}:1 [{m}]")
