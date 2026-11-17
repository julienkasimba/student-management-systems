
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@gmail.com",
      course: "Computer Science",
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary@gmail.com",
      course: "Information Technology",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  const [search, setSearch] = useState("");

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register student
  const addStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...formData,
    };

    setStudents([...students, newStudent]);

    setFormData({
      name: "",
      email: "",
      course: "",
    });
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  // Search students
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        <p>Manage student records easily</p>
      </header>

      <section className="dashboard">
        <div className="stat-card">
          <h3>Total Students</h3>
          <h2>{students.length}</h2>
        </div>
      </section>

      <section className="form-section">
        <h2>Register New Student</h2>

        <form onSubmit={addStudent}>
          <input
            name="name"
            type="text"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="course"
            type="text"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="table-section">
        <h2>Registered Students</h2>

        <input
          className="search"
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <p>Student Management System | React DevOps Project</p>
      </footer>
    </div>
  );
}

export default App;
