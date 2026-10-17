#!/usr/bin/env python3
import os
import sys
from pathlib import Path
from PIL import Image, ImageOps

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
IMAGES_DIR = PROJECT_DIR / 'public' / 'images'

TARGET_DIRS = [
    IMAGES_DIR / 'story-wall',
    IMAGES_DIR / 'services',
    IMAGES_DIR / 'gallery',
]

VALID_EXTS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}

def optimize_file(img_path: Path):
    stem = img_path.stem
    parent = img_path.parent
    out_path = parent / f'{stem}.webp'

    try:
        with Image.open(img_path) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode != 'RGB':
                im = im.convert('RGB')

            orig_size = img_path.stat().st_size

            # Save optimized WebP (max 1200px, quality 85, Lanczos)
            im_opt = im.copy()
            im_opt.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            im_opt.save(out_path, 'WEBP', quality=85, method=6)
            out_size = out_path.stat().st_size

            # If input was jpg or png, remove source file to keep folder clean
            if img_path.suffix in VALID_EXTS and img_path != out_path:
                img_path.unlink()

            return (orig_size, out_size)
    except Exception as e:
        print(f'[Error] Failed to process {img_path.name}: {e}', file=sys.stderr)
        return None

def main():
    print('====================================================')
    print(' FrameStory Studios - Automated Image Optimizer     ')
    print('====================================================')

    total_processed = 0
    total_saved_bytes = 0

    for target_dir in TARGET_DIRS:
        if not target_dir.exists():
            continue

        raw_files = [
            p for p in target_dir.iterdir()
            if p.is_file() and p.suffix in VALID_EXTS
        ]

        if not raw_files:
            continue

        print(f'\nScanning {target_dir.name}/: found {len(raw_files)} new image(s) to optimize...')

        for p in sorted(raw_files):
            res = optimize_file(p)
            if res:
                orig, opt = res
                total_processed += 1
                total_saved_bytes += (orig - opt)
                reduction = (1 - opt / orig) * 100 if orig > 0 else 0
                print(f'  ✓ {p.name} -> {p.stem}.webp ({opt//1024} KB, -{reduction:.1f}%)')

    print('\n----------------------------------------------------')
    if total_processed > 0:
        print(f'Successfully optimized {total_processed} new images!')
        print(f'Total bandwidth saved: {total_saved_bytes / (1024*1024):.2f} MB')
    else:
        print('All images in all folders are already 100% optimized WebP.')
    print('====================================================')

if __name__ == '__main__':
    main()
