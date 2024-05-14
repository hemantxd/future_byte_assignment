import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = ({ userId }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/resume",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96">
        <h2 className="text-3xl font-bold mb-4">My Resumes</h2>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes found.</p>
        ) : (
          <div>
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="border border-gray-300 rounded p-4 mb-4"
              >
                <p className="text-xl font-bold mb-2">
                  Full Name: {resume.fullName}
                </p>
                <p className="mb-2">{resume.summary}</p>
                <p className="mb-2">
                  Education:{" "}
                  {resume.education.map((edu, index) => (
                    <span key={index}>
                      {edu.institution}, {edu.degree}
                      {index !== resume.education.length - 1 && " | "}
                    </span>
                  ))}
                </p>
                <p className="mb-2">
                  Work Experience:{" "}
                  {resume.workExperience.map((exp, index) => (
                    <span key={index}>
                      {exp.company}, {exp.position}
                      {index !== resume.workExperience.length - 1 && " | "}
                    </span>
                  ))}
                </p>
                <p className="mb-2">Skills: {resume.skills.join(", ")}</p>
                <Link to={`resume/${resume._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to={"/create"}>
        <button
          type="button"
          className="text-white bg-green-500 hover:bg-green-600 font-semibold py-2 px-4 rounded-md  ml-20"
        >
          Create New
        </button>
      </Link>
    </div>
  );
};
