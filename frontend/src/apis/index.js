import axios from "axios";
import { API_ROOT } from "@/utils/formatters";

export const createNewStudentAPI = async (newStudentData) => {
    const response = await axios.post(`http://localhost:5000/v1/students`, newStudentData)
    return response.data
}


export const fetchStudentsAPI = async (studentId) => {
    const response = await axios.get(`http://localhost:5000/v1/students/${studentId}`)
    return response.data
}

