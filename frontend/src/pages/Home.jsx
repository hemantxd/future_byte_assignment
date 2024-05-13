import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = ({userId}) => {
    
 const [resumes, setResumes] = useState([]);

 useEffect(() => {
   const fetchResumes = async () => {
     try {
       
       const response = await axios.get("http://localhost:3000/api/v1/resume", {
         headers: {
           Authorization: localStorage.getItem("token"),
         },
       });
       console.log(response.data);
       setResumes(response.data);
     } catch (error) {
       console.error("Error fetching resumes:", error);
     }
   };

   fetchResumes();
 }, []);

  return (
    <div class="h-screen flex items-center justify-center">
      <div>
        <h2>My Resumes</h2>
        {resumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          <div>
            {resumes.map((resume) => (
              <ul className="border border-black">
                <li key={resume._id}>
                  <p>Full Name: {resume.fullName}</p>
                  <p>Summary: {resume.summary}</p>
                  <p>
                    Education:{" "}
                    {resume.education
                      .map((edu) => `${edu.institution}, ${edu.degree}`)
                      .join(" | ")}
                  </p>
                  <p>
                    Work Experience:{" "}
                    {resume.workExperience
                      .map((exp) => `${exp.company}, ${exp.position}`)
                      .join(" | ")}
                  </p>
                  <p>Skills: {resume.skills.join(", ")}</p>
                </li>
                <Link to={`resume/${resume._id}`}>
                <button className="bg-slate-400">view</button>
                </Link>
              </ul>
              
            ))}
          </div>
        )}
      </div>
      <Link to={"/create"}>
        <button
          type="button"
          class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create New
        </button>
      </Link>
    </div>
  );
};
