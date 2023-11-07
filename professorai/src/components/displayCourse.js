import React from 'react';

const courseData = [
    {
      id: 1,
      title: 'Physics',
      description: 'Introduction to Physics',
    },
    {
      id: 2,
      title: 'Chemistry',
      description: 'Chemistry Fundamentals',
    },
    // Add more courses as needed
  ];

function DisplayCourse(props) {

    const CourseCard = ({ course }) => (
        <div className="course-card">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      );

    return (
        <>
        
        <div className="course-list">
        {courseData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
        
        </>
    );
}

export default DisplayCourse;