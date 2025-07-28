import json
import requests
import os

# Bug 5: Resource leak - file not properly closed
def read_config_file(filename):
    file = open(filename, 'r')  # File not closed properly
    data = file.read()
    return json.loads(data)

# Fixed: Safe deserialization using JSON instead of pickle
def load_user_data(data_string):
    try:
        return json.loads(data_string)  # Safe - JSON cannot execute code
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON data: {e}")
    except Exception as e:
        raise ValueError(f"Error loading user data: {e}")

# Bug 7: Race condition and improper error handling
def write_log(message):
    try:
        with open('app.log', 'a') as f:
            f.write(message + '\n')
    except:  # Too broad exception handling
        pass  # Silently ignoring all errors

# Bug 8: Hardcoded credentials
def connect_to_api():
    api_key = "sk-1234567890abcdef"  # Hardcoded API key
    headers = {"Authorization": f"Bearer {api_key}"}
    response = requests.get("https://api.example.com/data", headers=headers)
    return response.json()

# Bug 9: Integer overflow potential and no input validation
def calculate_factorial(n):
    if n == 0:
        return 1
    return n * calculate_factorial(n - 1)  # No validation, stack overflow risk

# Bug 10: Memory inefficient operation
def find_common_elements(list1, list2):
    common = []
    for item1 in list1:
        for item2 in list2:  # O(n*m) complexity
            if item1 == item2 and item1 not in common:
                common.append(item1)
    return common