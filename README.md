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

Add a screenshot of the homepage here.

### Gallery

Add a screenshot of the gallery page here.

### Events

Add a screenshot of the events page here.

### Ticketing

Add a screenshot of the ticketing page here.

## Future Improvements

* PostgreSQL integration
* Docker deployment
* CI/CD pipeline
* User profile management
* Advanced analytics dashboard

## Authors

Daniel Nunes
