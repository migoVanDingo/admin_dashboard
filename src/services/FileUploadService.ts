import http from "../http-common";

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("http://localhost:3002/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      
    },
    onUploadProgress,
  });
};

const convertCsv = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("http://localhost:3002/convert-csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      
    },
    onUploadProgress,
  });
}

const getCsvTest = () => {
  return http.get("http://localhost:3002/convert-csv")
}

const getFiles = () => {
  return http.get("/files");
};

export default {
  upload,
  getFiles,
  convertCsv,
  getCsvTest
};