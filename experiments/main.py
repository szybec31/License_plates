from read_data import load_dataset, DATASET_DIR
import cv2


df = load_dataset(DATASET_DIR)

print(df.head())
print(df.shape)

# Etykiety i liczba zdjęć z sufiksem
print(df["label"].value_counts())
print(df["has_suffix"].value_counts())

