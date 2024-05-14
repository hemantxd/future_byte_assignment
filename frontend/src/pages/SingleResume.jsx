import { Link, useParams } from "react-router-dom";
import { useResume } from "../hooks";
import { useState } from "react";

export const SingleResume = () => {
  const { id } = useParams();

  const { resume, deleteResume } = useResume(id);

  const handleDelete = async () => {
    try {
      await deleteResume(id); 
      history.push("/"); 
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(resume)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "resume.json";
    document.body.appendChild(element); 
    element.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {resume ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4">{resume.fullName}</h2>
            <div className="mt-2 text-xl font-semibold mb-1 bg-slate-300">
              Summary
            </div>
            <p className="text-gray-700">{resume.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 bg-slate-300">
              Education
            </h3>
            {resume.education &&
              resume.education.map((eduItem) => (
                <div key={eduItem._id} className="mb-2">
                  <p className="font-semibold">{eduItem.institution}</p>
                  <p>{eduItem.degree}</p>
                </div>
              ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 bg-slate-300">
              Work Experience
            </h3>
            {resume.workExperience &&
              resume.workExperience.map((expItem) => (
                <div key={expItem._id} className="mb-2">
                  <p className="font-semibold">{expItem.company}</p>
                  <p>{expItem.position}</p>
                </div>
              ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 bg-slate-300">Skills</h3>
            <ul>
              {resume.skills &&
                resume.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button
          type="button"
          onClick={handleDownload}
          className="text-white ml-20 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Download
        </button>
        <button
          type="button"
          className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update
        </button>
      </div>
      <Link to={"/home"}>
        <button
          type="button"
          onClick={handleDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </Link>
      <Link to={"/home"}>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Back
        </button>
      </Link>
    </div>
  );
};
