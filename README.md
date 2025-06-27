# 📸 Gallery Website 

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