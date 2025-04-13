#Azlfa Anwar 30176659
#Iraj Akbar 30146997
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


students = [
    {
        "id": 1,
        "username": "student1",
        "password": "Password123!",
        "email": "student1@example.com",
        "enrolled_courses": ["CPSC101", "MATH200"]
    },
    {
        "id": 2,
        "username": "student2",
        "password": "StrongPass#2",
        "email": "student2@example.com",
        "enrolled_courses": []
    }
]

@app.route('/api/register', methods=['POST'])
def register_student():
  data = request.get_json()
  username = data.get("username")
  email = data.get("email")

  for student in students:
    if student["username"].lower() == username.lower():
      return jsonify({"message": "Username is already taken."}), 409
    
  new_student = {
    "id": len(students) + 1,
    "username": username,
    "password": data.get("password"),
    "email": email,
    "enrolled_courses": []
  }
  students.append(new_student)
  return jsonify({"message": "Student registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login_student():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")


    for student in students:
        if student["username"].lower() == username.lower() and student["password"] == password:
            return jsonify({
                "message": "Login successful.",
                "student": {
                    "id": student["id"],
                    "username": student["username"],
                    "email": student["email"],
                    "enrolled_courses": student["enrolled_courses"]
                }
            }), 200
            
    return jsonify({"message": "Invalid username or password."}), 401
  
@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    with open('testimonials.json') as f:
        all_testimonials = json.load(f)
    
    random_testimonials = random.sample(all_testimonials, min(2, len(all_testimonials)))
    return jsonify(random_testimonials)

@app.route('/api/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course_id = data.get("course_id")

    for student in students:
        if student["id"] == student_id:
            if course_id in student["enrolled_courses"]:
                return jsonify({"message": "Student already enrolled in this course."}), 400

            student["enrolled_courses"].append(course_id)
            return jsonify({"message": f"Enrolled in course {course_id} successfully."}), 200

    return jsonify({"message": "Student not found."}), 404

@app.route('/api/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get("course_id")

    for student in students:
        if student["id"] == student_id:
            if course_id in student["enrolled_courses"]:
                student["enrolled_courses"].remove(course_id)  # ✅ Remove it
                return jsonify({"message": f"Dropped course {course_id} successfully."}), 200
            else:
                return jsonify({"message": "Student is not enrolled in this course."}), 400

    return jsonify({"message": "Student not found."}), 404


@app.route('/api/courses', methods=['GET'])
def get_courses():
    try:
        with open('courses.json') as f:
            course_list = json.load(f)
        return jsonify(course_list), 200
    except Exception as e:
        return jsonify({"message": "Failed to load courses", "error": str(e)}), 500
@app.route('/api/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify(student["enrolled_courses"]), 200
    return jsonify([]), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)