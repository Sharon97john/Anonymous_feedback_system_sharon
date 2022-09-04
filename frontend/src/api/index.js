import axios from "axios";
const base_url = "http://127.0.0.1:8000/";
export const getDepartmentList = (data) => {
  return axios.post(base_url + "department/getAllDepartments/", {
    data: data,
  });
};
export const sendFeedback = (feedback_message) => {
  return axios.post(base_url + "feedback/sendGeneralFeedback/", {
    feedback: feedback_message,
  });
};
export const submitVotingFormApi = (form) => {
  return axios.post(base_url + "feedback/saveNewVotingForms/", {
    votingForm: form,
  });
};
export const getForms = (department_id, isAdmin) => {
  return axios.post(base_url + "feedback/getDepartmentCustomForms/", {
    department: department_id,
    isAdmin : isAdmin
  });
};
export const getVotingForms = (department_id, isAdmin) => {
  return axios.post(base_url + "feedback/getVotingForms/", {
    department: department_id,
    isAdmin : isAdmin
  });
};
export const login = (data) => {
  return axios.post(base_url + "users/login/", data);
};
export const saveCustomFeedbackForm = (data) => {
  return axios.post(base_url + "feedback/saveDepartmentCustomForms/", {
    newCustomForm: data,
  });
};
export const deleteCustomForm = (id) => {
  return axios.post(base_url + "feedback/deleteCustomForm/", {
    id: id,
  });
};
export const deleteVotingForm = (id) => {
  return axios.post(base_url + "feedback/deleteVotingForm/", {
    id: id,
  });
};
export const updateVotingCount = (data) => {
  return axios.post(base_url + "feedback/updateVotingCount/", {
    data: data,
  });
};
export const publishFormApi = (data) => {
  return axios.post(base_url + "feedback/publishForm/", {
    data: data,
  });
};
export const saveCustomFeedbackApi = (data) => {
  return axios.post(base_url + "feedback/saveCustomFeedbackAnswers/", {
    data: data,
  });
};
export const getDataAnalysisApi = (data) => {
  return axios.post(base_url + "feedback/getAnalysis/", {
    data: data,
  });
};
