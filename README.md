# 📸 Gallery Website 

A responsive gallery web application built as part of the Fourve Internship Task. It supports viewing and filtering images and videos, viewing grouped images (like albums), and offers a modern lightbox viewer experience.

---
## 🔗 Live Demo

[Visit the site](https://fourve-zop1.onrender.com/)

---
## Setup Instruction

### 1. Clone the Repository

```sh
git clone https://github.com/rishikesh-babu/Fourve.git
cd Fourve
```

### 2. 🧩 Backend Setup

Go to Folder and install dependencie
```sh
cd server
npm install
```

Start Server
```sh
npm start
```

### 3. 🎨 Frontend Setup

Go to folder and install dependencies
```sh
cd client
npm install 
```

Start Frontend Server
```sh
npm run dev
```

## ⚙️ Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:
#### Server  `.env` file
```env
CLIENT_URL=http://localhost:5173
CLOUD_NAME=your_cloud_name_here
CLOUD_API_KEY=your_cloud_api_key_here
CLOUD_API_SECRET=your_cloud_api_secret_here
MONGO_URI=your_mongo_uri_here
```

#### Client  `.env` file
```env
VITE_API_URL=http://localhost:3000
```

---
## 🚀 Features

- 🔍 Filter media by:
  - Photos only
  - Videos only
  - Both together
- 📷 Display media in:
  - Standalone format
  - Grouped stacks (albums)
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Axios, Mongoose
- **Cloud Storage**: Cloudinary

---

## 🧱 Database Schema

The app uses two MongoDB collections: `posts` and `media`.

### 📄 Post Schema (`posts` collection)
```js
{
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### 📄 Media Schema (`media` collection)
```js
{
   url: {
        type: String, 
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true
    }, 
    type: {
        type: String, 
        enum: ['image', 'video'], 
        required: true,
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
}
```
