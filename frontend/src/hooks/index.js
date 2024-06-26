import axios from "axios";
import { useEffect, useState } from "react";

export const useResume = (id) => {

  const [resume, setResume] = useState({});

  useEffect(() => {
    axios
      .get(`https://future-byte-assignment.onrender.com/api/v1/resume/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setResume(response.data);
      });
  }, [id]);


   const deleteResume = async (id) => {
    try {
      await axios.delete(
        `https://future-byte-assignment.onrender.com/api/v1/resume/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      
      setResume({});
    } catch (error) {
      console.error("Error deleting resume:", error);
      
    }
  };


  return {
resume,
deleteResume
  };
};
