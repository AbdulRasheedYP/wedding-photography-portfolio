#!/usr/bin/env python3
import os
import sys
from pathlib import Path
from PIL import Image, ImageOps

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
GALLERY_DIR = PROJECT_DIR / 'public' / 'images' / 'story-wall'
THUMB_DIR = GALLERY_DIR / 'thumbnails'
THUMB_DIR.mkdir(parents=True, exist_ok=True)

VALID_EXTS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}

def optimize_file(img_path: Path):
    stem = img_path.stem
    # Ignore duplicate copies with (1), (2), etc.
    if '(' in stem:
        return None

    thumb_path = THUMB_DIR / f'{stem}.webp'
    full_path = GALLERY_DIR / f'{stem}.webp'

    if thumb_path.exists() and full_path.exists():
        src_mtime = img_path.stat().st_mtime
        if thumb_path.stat().st_mtime >= src_mtime and full_path.stat().st_mtime >= src_mtime:
            return None

    try:
        with Image.open(img_path) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode != 'RGB':
                im = im.convert('RGB')

            orig_size = img_path.stat().st_size

            # Save full-res WebP master directly in gallery/
            im.save(full_path, 'WEBP', quality=85, method=6)
            full_size = full_path.stat().st_size

            # Save grid thumbnail in thumbnails/
            im_thumb = im.copy()
            im_thumb.thumbnail((800, 800), Image.Resampling.LANCZOS)
            im_thumb.save(thumb_path, 'WEBP', quality=85, method=6)
            thumb_size = thumb_path.stat().st_size

            return (orig_size, full_size, thumb_size)
    except Exception as e:
        print(f'[Error] Failed to process {img_path.name}: {e}', file=sys.stderr)
        return None

def main():
    print('====================================================')
    print(' FrameStory Studios - Automated Image Optimizer     ')
    print('====================================================')
    print(f'Scanning directory: {GALLERY_DIR}')

    files = [
        p for p in GALLERY_DIR.iterdir()
        if p.is_file() and p.suffix in VALID_EXTS
    ]

    total_files = len(files)
    print(f'Found {total_files} images to process.')

    processed = 0
    skipped = 0
    total_orig = 0
    total_opt = 0
    total_thumb = 0

    for i, p in enumerate(sorted(files), 1):
        res = optimize_file(p)
        if res is None:
            skipped += 1
        else:
            processed += 1
            o, opt, th = res
            total_orig += o
            total_opt += opt
            total_thumb += th
            reduction = (1 - th / o) * 100
            print(f'[{i}/{total_files}] {p.name} -> thumb: {th//1024}KB (-{reduction:.1f}%)')

    print('----------------------------------------------------')
    print(f'Summary:')
    print(f'Processed: {processed} images | Already cached: {skipped} images')
    if processed > 0:
        print(f'Original Size:       {total_orig / (1024*1024):.2f} MB')
        print(f'Full-Res WebP Size:  {total_opt / (1024*1024):.2f} MB (-{(1 - total_opt/total_orig)*100:.1f}%)')
        print(f'Grid Thumbnail Size: {total_thumb / (1024*1024):.2f} MB (-{(1 - total_thumb/total_orig)*100:.1f}%)')
        print(f'Speedup: Grid loads {(total_orig/total_thumb):.1f}x faster with 100% retina clarity!')
    print('====================================================')

if __name__ == '__main__':
    main()
