
from pathlib import Path
from collections import defaultdict
from hashlib import sha256

from PIL import Image, ImageOps
from tqdm import tqdm


# Katalog ze zdjęciami tablic
DATASET_DIR = Path("./dataset")

# Obsługiwane formaty
EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def image_hash(path):
    """Zwraca hash znormalizowanych pikseli obrazu."""
    with Image.open(path) as img:
        # Uwzględnienie orientacji zapisanej w metadanych EXIF
        img = ImageOps.exif_transpose(img)

        # Ujednolicenie formatu, aby porównywać piksele
        img = img.convert("RGB")

        # Wymiary również wchodzą w skład hasha
        data = f"{img.width}x{img.height}".encode()
        data += img.tobytes()

        return sha256(data).hexdigest()


def main():
    files = [
        path for path in DATASET_DIR.rglob("*")
        if path.is_file() and path.suffix.lower() in EXTENSIONS
    ]

    hashes = defaultdict(list)
    errors = []

    print(f"Liczba znalezionych plików: {len(files)}")

    for path in tqdm(files, desc="Analiza obrazów"):
        try:
            digest = image_hash(path)
            hashes[digest].append(path)
        except Exception as exc:
            errors.append((path, str(exc)))

    duplicates = [
        paths for paths in hashes.values()
        if len(paths) > 1
    ]

    print(f"\nLiczba grup duplikatów: {len(duplicates)}")
    print(f"Liczba plików w grupach duplikatów: "
          f"{sum(len(group) for group in duplicates)}")
    print(f"Liczba błędnych plików: {len(errors)}")

    for i, group in enumerate(duplicates, start=1):
        print(f"\nGrupa {i}:")
        for path in group:
            print(f"  {path}")

    if errors:
        print("\nNie udało się odczytać:")
        for path, error in errors:
            print(f"  {path}: {error}")


if __name__ == "__main__":
    main()
