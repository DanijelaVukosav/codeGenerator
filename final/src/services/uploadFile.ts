import {http} from "./httpCommon";
import {SchemaData, Table} from "../common/types";
import {HttpStatusCode} from "axios";
import FormData from "form-data";

const upload = (file: File, onUploadProgress: any): Promise<{ data: SchemaData, status: HttpStatusCode }> => {
    const FormData = require('form-data');
    let formData = new FormData();

    console.log('formData', formData, file);

    formData.append("sqlFile", file, file.name);

    // @ts-ignore
    return http.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    })
};

const download = async (data: SchemaData): Promise<any> => {

    // return http.post("/download", data)
    return fetch('http://localhost:8080/download',{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
};

const getFiles = (): Promise<any> => {
    return http.get("/files");
};

const FileUploadService = {
    upload,
    getFiles,
    download
};

export default FileUploadService;
