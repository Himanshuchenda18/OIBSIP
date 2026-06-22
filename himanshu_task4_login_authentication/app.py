from flask import Flask,render_template,request,redirect,session
import sqlite3
from werkzeug.security import generate_password_hash,check_password_hash

app=Flask(__name__)
app.secret_key="secretkey"

def create_database():
    conn=sqlite3.connect("database.db")
    cursor=conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
    )
    """)
    conn.commit()
    conn.close()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/register",methods=["GET","POST"])
def register():
    if request.method=="POST":
        username=request.form["username"]
        password=generate_password_hash(request.form["password"])
        conn=sqlite3.connect("database.db")
        cursor=conn.cursor()
        try:
            cursor.execute("INSERT INTO users(username,password) VALUES(?,?)",(username,password))
            conn.commit()
        except:
            conn.close()
            return "Username already exists"
        conn.close()
        return redirect("/login")
    return render_template("register.html")

@app.route("/login",methods=["GET","POST"])
def login():
    if request.method=="POST":
        username=request.form["username"]
        password=request.form["password"]
        conn=sqlite3.connect("database.db")
        cursor=conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?",(username,))
        user=cursor.fetchone()
        conn.close()
        if user and check_password_hash(user[2],password):
            session["username"]=username
            return redirect("/dashboard")
        return "Invalid Login"
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "username" in session:
        return render_template("dashboard.html",username=session["username"])
    return redirect("/login")

@app.route("/logout")
def logout():
    session.pop("username",None)
    return redirect("/login")

if __name__=="__main__":
    create_database()
    app.run(debug=True)