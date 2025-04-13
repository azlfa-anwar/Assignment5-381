import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch courses from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnroll = async (course) => {
    if (!user || !user.id) {
      alert("You must be logged in to enroll.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/enroll/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: course.id })
      });

      const data = await response.json();

      if (response.ok) {
        setEnrolledCourses(prev => [...prev, { 
          ...course,
          enrollmentId: Date.now()
        }]);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert("Something went wrong.");
    }
  };

  const handleRemove = (enrollmentId) => {
    setEnrolledCourses(prev =>
      prev.filter(course => course.enrollmentId !== enrollmentId)
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />

      <div style={{
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>

        <EnrollmentList
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
