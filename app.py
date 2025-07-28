from flask import Flask, request, render_template_string, session
import sqlite3
import hashlib
import os

app = Flask(__name__)
app.secret_key = "secret"  # Bug 1: Hardcoded secret key (security vulnerability)

# Fixed: SQL Injection vulnerability - using parameterized queries
def authenticate_user(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Safe parameterized query prevents SQL injection
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    cursor.execute(query, (username, password))
    result = cursor.fetchone()
    conn.close()
    return result

# Fixed: Performance issue - efficient duplicate detection using set (O(n) complexity)
def process_large_dataset(data):
    seen = set()
    duplicates = set()
    result = []
    
    for item in data:
        if item in seen:
            if item not in duplicates:
                result.append(f"Duplicate found: {item}")
                duplicates.add(item)
        else:
            seen.add(item)
    
    return result

@app.route('/')
def home():
    return '''
    <form method="POST" action="/login">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="submit" value="Login">
    </form>
    '''

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    if authenticate_user(username, password):
        session['user'] = username
        return f"Welcome {username}!"
    else:
        return "Invalid credentials"

@app.route('/process')
def process():
    # Simulate processing a large dataset
    sample_data = list(range(1000)) + [1, 2, 3, 1, 2, 3]  # Some duplicates
    duplicates = process_large_dataset(sample_data)
    return f"Found {len(duplicates)} duplicates"

if __name__ == '__main__':
    # Initialize database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users 
                     (id INTEGER PRIMARY KEY, username TEXT, password TEXT)''')
    cursor.execute("INSERT OR IGNORE INTO users VALUES (1, 'admin', 'admin123')")
    conn.commit()
    conn.close()
    
    app.run(debug=True)  # Bug 4: Debug mode in production (security issue)