import cv2
import os
import shutil

img_path = 'd:/RedVerse/ChatGPT Image Jul 27, 2026, 10_37_00 AM.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)

output_dir = 'd:/RedVerse/assets/collection/'
backup_dir = 'd:/RedVerse/assets/collection/backup/'
metadata_dir = 'd:/RedVerse/metadata/collection_assets/'

os.makedirs(output_dir, exist_ok=True)
os.makedirs(backup_dir, exist_ok=True)
os.makedirs(metadata_dir, exist_ok=True)

crops = {
    "collection_banner.png": (68, 50, 1400, 400),
    "collection_image.png": (225, 529, 480, 480),
    "collection_featured.png": (725, 529, 570, 380)
}

results = []

for name, (x, y, w, h) in crops.items():
    cropped = img[y:y+h, x:x+w]
    out_path = os.path.join(output_dir, name)
    cv2.imwrite(out_path, cropped)
    
    shutil.copy(out_path, os.path.join(backup_dir, name))
    shutil.copy(out_path, os.path.join(metadata_dir, name))
    
    file_size = os.path.getsize(out_path)
    results.append(f"{name}|{out_path}|{w}|{h}|{file_size}")

shutil.copy(img_path, os.path.join(backup_dir, os.path.basename(img_path)))

for r in results:
    print(r)
print(f"BACKUP_DIR|{backup_dir}")
print("DONE")
