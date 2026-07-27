import cv2
import numpy as np
import os
import shutil

img_path = 'd:/RedVerse/ChatGPT Image Jul 27, 2026, 10_37_00 AM.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)

if img is None:
    print("Error: Could not load image.")
    exit(1)

# Ensure background is handled
if img.shape[2] == 4:
    alpha = img[:, :, 3]
    _, thresh = cv2.threshold(alpha, 10, 255, cv2.THRESH_BINARY)
else:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

crops = []
for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    area = w * h
    if area > 20000: # Filter out text and noise
        crops.append((x, y, w, h))

targets = {
    "collection_banner.png": {"ratio": 3.5, "target_w": 1400, "target_h": 400},
    "collection_featured.png": {"ratio": 1.5, "target_w": 600, "target_h": 400},
    "collection_image.png": {"ratio": 1.0, "target_w": 512, "target_h": 512}
}

matched = {}
for name, data in targets.items():
    best_match = None
    best_diff = float('inf')
    for x,y,w,h in crops:
        ratio = w / h
        diff = abs(ratio - data["ratio"])
        if diff < best_diff:
            best_diff = diff
            best_match = (x,y,w,h)
    
    if best_match:
        matched[name] = best_match
        crops.remove(best_match)

output_dir = 'd:/RedVerse/assets/collection/'
backup_dir = 'd:/RedVerse/assets/collection/backup/'
metadata_dir = 'd:/RedVerse/metadata/collection_assets/'

os.makedirs(output_dir, exist_ok=True)
os.makedirs(backup_dir, exist_ok=True)
os.makedirs(metadata_dir, exist_ok=True)

for name, (x,y,w,h) in matched.items():
    cropped = img[y:y+h, x:x+w]
    out_path = os.path.join(output_dir, name)
    
    cv2.imwrite(out_path, cropped)
    
    shutil.copy(out_path, os.path.join(backup_dir, name))
    shutil.copy(out_path, os.path.join(metadata_dir, name))
    
    file_size = os.path.getsize(out_path)
    print(f"RESULT|{name}|{out_path}|{w}|{h}|{file_size}")

shutil.copy(img_path, os.path.join(backup_dir, os.path.basename(img_path)))
print(f"BACKUP_DIR|{backup_dir}")
print("DONE")
