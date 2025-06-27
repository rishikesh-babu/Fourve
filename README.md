# 📸 Gallery Website – Fourve Internship

A responsive gallery web application built as part of the Fourve Internship Task. It supports viewing and filtering images and videos, viewing grouped images (like albums), and offers a modern lightbox viewer experience.

---

## 🚀 Features

- 🔍 Filter media by:
  - Photos only
  - Videos only
  - Both together
- 📷 Display media in:
  - Standalone format
  - Grouped stacks (albums)
- 💡 Lightbox-style enlarged view on click
- 🖱️ Scroll through media in lightbox
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Axios, Mongoose

---

## 🧱 Database Schema

Here’s a sample MongoDB schema for storing media:

```js
{
  title: String,
  media: [
    {
      url: String,
      type: "image" | "video",
      groupId?: String // Optional for albums
    }
  ],
  createdAt: Date
}
