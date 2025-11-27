# 🎬 **Media Vault – Full-Stack Media Tracker**

A personal media tracker built with **Django (REST API)** and **React (Vite)** to organize:

* 🎥 Movies
* 📺 TV Series
* 🐉 Anime
* 🎵 YouTube Videos & Playlists (auto thumbnail fetch)
* 📚 Books
* 📝 Custom notes, statuses, progress, etc.

Clean UI, Netflix-style cards, and full CRUD support.

---

## 🚀 **Tech Stack**

### **Frontend**

* React (Vite)
* Axios
* React Router DOM
* Tailwind CSS (optional)

### **Backend**

* Django
* Django REST Framework (DRF)
* SQLite / PostgreSQL
* CORS Headers

---

## 📁 **Project Structure**

```
media-tracker/
│
├── backend/             # Django REST API
│   ├── backend/         # Django project files
│   ├── mediaapp/        # API app (models, views, serializers)
│   └── manage.py
│
├── frontend/      # React application
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🧩 **Features**

### ✔ Track Multiple Media Types

Movies, anime, series, books, YouTube videos, playlists, and more.

### ✔ YouTube Thumbnail Fetch

Paste a YouTube link → app auto-extracts the thumbnail using the video ID.

### ✔ Full CRUD

* Add media
* Edit media
* Delete media
* Filter by status & media type

### ✔ Progress Tracking

Store episodes/pages watched and total count.

### ✔ Notes System

Add personal notes for any media item.

---

## ⚙️ **Backend Setup (Django)**

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://localhost:8000/api/
```

---

## 🎨 **Frontend Setup (React)**

```bash
cd media-frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 **API Endpoints**

| Method | Endpoint                       | Description                   |
| ------ | ------------------------------ | ----------------------------- |
| GET    | `/api/media/`                  | List all media                |
| POST   | `/api/media/`                  | Create media item             |
| GET    | `/api/media/:id/`              | Retrieve a specific item      |
| PUT    | `/api/media/:id/`              | Update media item             |
| DELETE | `/api/media/:id/`              | Delete item                   |
| POST   | `/api/fetch-youtube-metadata/` | Get thumbnail for YouTube URL |

---

## 🌍 **Free Deployment Guide**

### **Backend → Render.com**

* Create new Web Service
* Build command: `pip install -r requirements.txt`
* Start command: `gunicorn backend.wsgi:application`

### **Frontend → Vercel**

* Import repo
* Framework: **Vite**
* Output folder: `dist/`

Update your API base URL:

```
src/services/api.js
```

Replace:

```js
const API_BASE = "https://your-backend.onrender.com/api";
```

---

## 🧪 **Environment Variables**

Create a `.env` file in backend:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
```

---

## 📜 **License**

This project is open-source. Feel free to modify or extend.

---

## 🤝 **Contributing**

PRs are welcome! Feel free to open issues.
