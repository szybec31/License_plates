# License Plate Recognition

Projekt rozpoznawania numerów tablic rejestracyjnych z wykorzystaniem sieci neuronowych. Do przeprowadzenia eksperymentów wykorzystano gotowy zbiór danych z strony [Kaggle](https://www.kaggle.com/datasets/abdelhamidzakaria/european-license-plates-dataset?select=dataset_final).
Aplikacja składa się z backendu udostępniającego API oraz frontendu umożliwiającego interakcję z systemem przez przeglądarkę.

## Wymagania

- Git
- Python 3.12
- Node.js i npm

## 1. Pobranie projektu

```bash
git clone <URL_REPOZYTORIUM>
cd license-plate-recognition
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
