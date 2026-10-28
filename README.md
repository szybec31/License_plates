# License Plate Recognition

Projekt rozpoznawania numerów tablic rejestracyjnych z wykorzystaniem sieci neuronowych. Do przeprowadzenia eksperymentów wykorzystano gotowy zbiór danych z strony [Kaggle](https://www.kaggle.com/datasets/abdelhamidzakaria/european-license-plates-dataset?select=dataset_final).
Aplikacja składa się z backendu udostępniającego API oraz frontendu umożliwiającego interakcję z systemem przez przeglądarkę.

## Wymagania

- Git
- Python 3.12
- Node.js i npm

## 1. Pobranie projektu

```bash
git clone https://github.com/szybec31/License_plates.git
cd License_plates
```

## 2. Backend — FastAPI

W terminalu, w katalogu głównym projektu:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend: http://127.0.0.1:8000

Dokumentacja API: http://127.0.0.1:8000/docs

## 3. Frontend — React

Otwórz drugi terminal w katalogu głównym projektu:

```powershell
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Uwagi

- Backend i frontend uruchamiaj w osobnych terminalach.
- Do zatrzymania serwera użyj `Ctrl + C`.
- Środowisko `.venv` jest lokalne i nie znajduje się w repozytorium.


## Część właściwa - sieci neuronowe i eksperymenty:

1. Umieszczenie wszystkich zdjęć w jednym folderze `dataset` nie widoczny na repozytorium. Niektóre numery tablic się powtarzają (są przybliżone, innym tle, przednia i tylna, inny kąt). Numer tablicy jest w nazwie pliku obrazu. Operacja przeniesienia zdjęć spowodowała dodanie końcówek np. _1 do nazw plików.
2. Sprawdzenie czy przypadkiem w zbiorze danych nie znajduje się dokładnie to samo zdjęcie. W celu sprawdzenia tego każde zdjęcie ma utworzony hash, który jest z każdym porównywany (nie znaleziono takich przypadków). Wykonuje to plik `check_duplicates.py`
3. Utworzono funkcję tworzącą wstępną tabelę danych, która zawiera następujące kolumny `read_data.py`:
- image - odczytane zdjęcie przechowywane jako tablica
- filename - pełna nazwa pliku z rozszerzeniem
- has_suffix - pole wykrywające obrazy o tym samym numerze tablicy (0 - brak).
- label - numer tablicy rejestracyjnej odczytanej z nazwy pliku.