import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Create = () => {
  const [fullName, setFullName] = useState("");
  const [summary, setSummary] = useState("");
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = function (event) {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Set the recognized speech to appropriate fields
      if (document.activeElement.id === "textInput") {
        setSummary((prevSummary) => prevSummary + finalTranscript);
      } else if (document.activeElement.id === "textareaInput") {
        setSkills((prevSkills) => prevSkills + finalTranscript);
      }
    };

    const startButton = document.getElementById("startListening");
    const stopButton = document.getElementById("stopListening");

    startButton.addEventListener("click", function () {
      recognition.start();
    });

    stopButton.addEventListener("click", function () {
      recognition.stop();
    });

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // resume object
    const resume = {
      fullName,
      summary,
      education: [{ institution, degree }],
      workExperience: [{ company, position }],
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/resume/create",
        resume,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Resume created:", response.data);
      const createdResumeId = response.data._id;
      console.log("Resume created:", createdResumeId);
      // Reset form fields
      setFullName("");
      setSummary("");
      setInstitution("");
      setDegree("");
      setCompany("");
      setPosition("");
      setSkills("");
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  return (
    <div>
      <div className="bg-slate-100 h-screen flex justify-center">
        <div className="h-screen flex items-center justify-center flex-col">
          <h2 className="size-13 mb-5 w-full font-extrabold">Create Resume</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="">Full Name</label>
                <input
                  className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  placeholder="enter your fullname here"
                  id=""
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <label htmlFor="summary">Summary:</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                id="textInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter summary"
                required
              />
            </div>
            <div>
              <label htmlFor="institution">Institution:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="degree">Degree:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="skills">Skills:</label>
              <textarea
                id="textareaInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-3"
            >
              Create Resume
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center ml-5 ">
          <button
            id="startListening"
            type="button"
            className="text-white bg-gradient-to-r w-25 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Listening
          </button>
          <button
            id="stopListening"
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Stop Listening
          </button>
          <Link to={"/home"}>
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Back
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center w-70">
          <div className="ml-10  bg-slate-400">
            <p>Speech to text only works for </p>
            <p>Summary and Skills field :) </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
