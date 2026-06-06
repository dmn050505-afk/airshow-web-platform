# Airshow Web Platform

A full-stack web application developed with **Django** and **React** for managing airshow events, aircraft information, media galleries, surveys, ticketing, and volunteer registrations.

## Features

* Event management and scheduling
* Aircraft information display
* Media gallery
* Survey and voting system
* Volunteer registration
* Ticketing section
* User authentication
* REST API integration between frontend and backend
* Responsive user interface

## Technologies

### Backend

* Django
* Django REST Framework
* SQLite
* Pillow

### Frontend

* React
* Vite
* JavaScript
* CSS

## Project Structure

```text
airshow-web-platform/
├── airshow_backend/
│   ├── airshow/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── airshow_frontend/
│   └── ex-6_react/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## Backend Setup

```bash
cd airshow_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend available at:

```text
http://127.0.0.1:8000
```

## Frontend Setup

```bash
cd airshow_frontend/ex-6_react
npm install
npm run dev
```

Frontend available at:

```text
http://localhost:5173
```

## Screenshots

### Homepage

<img width="799" height="1053" alt="image" src="https://github.com/user-attachments/assets/2c10fedc-84cb-417b-ab8b-13459c356fb3" />


### Gallery

<img width="1274" height="920" alt="image" src="https://github.com/user-attachments/assets/48911a75-6e75-468f-b1db-f42e24f8abf6" />


### Ticketing

<img width="1670" height="1012" alt="image" src="https://github.com/user-attachments/assets/718a48e2-fca6-4e66-ad7e-79edc96e74b6" />


## Authors

Daniel Nunes
