# 🔗 URL Shortener API
 
A fast and lightweight URL shortener REST API built with **Node.js**, **Express**, and **MySQL**. Supports URL creation, redirection, and full visit history tracking.
 
---
 
## 🚀 Features
 
- Generate short URLs with unique IDs
- Redirect short URLs to original destinations
- Track full visit history with timestamps
- Input validation with Joi
- SQL injection protection with prepared statements
- Clean MVC architecture
 
---
 
## 🛠️ Tech Stack
 
- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MySQL
- **Validation** — Joi
- **ID Generation** — nanoid
 
---
 
## 📁 Project Structure
 
```
url-shortener/
├── controllers/
│   └── urlController.js      # Route handler logic
├── middleware/
│   └── validate.js           # Joi validation middleware
├── validators/
│   └── urlValidator.js       # Joi schemas
├── routes/
│   └── urlRoutes.js          # Express routes
├── config/
│   └── db.js                 # MySQL connection
├── app.js                    # Express app setup
└── README.md
```
 
---
 
## ⚙️ Getting Started
 
### 1. Clone the repository
 
```bash
git clone https://github.com/ghullammohiuddin/url-shortner-tool.git
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Configure environment variables
 
Create a `.env` file in the root directory:
 
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=url_shortener
```
 
### 4. Set up the database
 
Run the following SQL to create the required tables:
 
```sql
CREATE DATABASE url_shortener;
USE url_shortener;
 
CREATE TABLE urls (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  short_id     VARCHAR(255) UNIQUE NOT NULL,
  redirect_url TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE url_visits (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  url_id     INT NOT NULL,
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
);
```
 
### 5. Start the server
 
```bash
node app.js
```
 
Server runs at `http://localhost:3000`
 
---
 
## 📡 API Endpoints
 
### Create a Short URL
 
```
POST /url
```
 
**Request body:**
```json
{
  "redirectUrl": "https://google.com"
}
```
 
**Response:**
```json
{
  "message": "Short URL created successfully",
  "shortId": "abc12345",
  "shortUrl": "http://localhost:3000/abc12345",
  "redirectUrl": "https://google.com"
}
```
 
---
 
### Redirect to Original URL
 
```
GET /:shortId
```
 
Redirects the user to the original URL and logs the visit automatically.
 
**Example:**
```
GET /abc12345  →  302 Redirect to https://google.com
```
 
---
 
### Get Visit History
 
```
GET /url/:shortId/history
```
 
**Response:**
```json
{
  "shortId": "abc12345",
  "redirectUrl": "https://google.com",
  "totalVisits": 3,
  "visitHistory": [
    { "visited_at": "2025-04-10T10:30:00" },
    { "visited_at": "2025-04-10T09:15:00" },
    { "visited_at": "2025-04-09T18:45:00" }
  ]
}
```
 
---
 
## 🔒 Validation Rules
 
All incoming URLs are validated with **Joi** before processing:
 
- Must be a non-empty string
- Must be a valid URL format
- Must use `http` or `https` scheme
- Whitespace is trimmed automatically
- Converted to lowercase for consistency
 
**Example rejected inputs:**
 
| Input | Reason |
|---|---|
| `ftp://example.com` | Invalid scheme |
| `not-a-url` | Invalid URL format |
| ` ` (empty) | Field is required |
| `javascript://xss` | Invalid scheme |
 
---
 
## 🛡️ Security
 
- Parameterized queries (`db.execute`) used throughout — prevents SQL injection
- URL scheme whitelist — only `http` and `https` allowed
- Input trimming and normalization before validation
 
---
 
## 📄 License
 
MIT
