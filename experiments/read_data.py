from pathlib import Path
import re
import cv2
import pandas as pd
from tqdm import tqdm

DATASET_DIR = Path("./dataset")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

def load_dataset(dataset_dir: Path) -> pd.DataFrame:

    """Wczytuje obrazy i etykiety do DataFrame."""

    files = sorted(
        path
        for path in dataset_dir.rglob("*")
        if path.is_file()
        and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    rows = []
    errors = []

    for path in tqdm(files, desc="Wczytywanie obrazów"):
        image = cv2.imread(str(path))

        if image is None:
            errors.append(str(path))
            continue

        # Nazwa bez rozszerzenia, np. DW12345_1
        stem = path.stem

        # Wykrycie końcowego sufiksu _1, _2 itd.
        match = re.search(r"_(\d+)$", stem)

        has_suffix = int(match is not None)

        # Usunięcie sufiksu wyłącznie z etykiety
        label = re.sub(r"_\d+$", "", stem)

        rows.append({
            "image": image,
            "filename": path.name,
            "has_suffix": has_suffix,
            "label": label,
        })

    df = pd.DataFrame(
        rows,
        columns=["image", "filename", "has_suffix", "label"]
    )

    print(f"Liczba znalezionych plików: {len(files)}")
    print(f"Liczba poprawnie wczytanych obrazów: {len(df)}")
    print(f"Liczba błędów odczytu: {len(errors)}")

    if errors:
        print("Pliki, których nie udało się wczytać:")
        for filename in errors:
            print(filename)

    return df