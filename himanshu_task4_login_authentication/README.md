# Login Authentication System

A simple and secure login authentication system developed using Python Flask. This project allows users to register, login, access a protected dashboard, and logout securely.

## Features

- User Registration
- User Login
- Secure Password Hashing
- SQLite Database Integration
- Session-Based Authentication
- Protected Dashboard Page
- Logout Functionality
- Modern Responsive User Interface

## Technologies Used

- Python
- Flask
- HTML
- CSS
- SQLite
- Werkzeug Security

## Project Structure

```
himanshu_task4_login_authentication

│── app.py
│── requirements.txt
│── README.md
│── .gitignore
│
├── templates
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   └── dashboard.html
│
└── static
    └── style.css
```

## How To Run The Project

### 1. Clone the repository

```
git clone YOUR_REPOSITORY_LINK
```

### 2. Navigate to the project folder

```
cd himanshu_task4_login_authentication
```

### 3. Install required dependencies

```
pip install -r requirements.txt
```

### 4. Run the Flask application

```
python app.py
```

### 5. Open in browser

```
http://127.0.0.1:5000
```

## Application Workflow

1. User opens the application.
2. New users can create an account using the Register page.
3. User credentials are stored securely in the SQLite database.
4. Registered users can login using valid credentials.
5. After successful login, users can access the protected dashboard.
6. Users can logout securely from the dashboard.

## Security Features

- Passwords are stored using secure hashing instead of plain text.
- Protected routes are accessible only after authentication.
- User sessions are managed securely using Flask sessions.

## Future Improvements

- Forgot password functionality
- Email verification
- User profile management
- Role-based authentication

## Author

Himanshu Chenda