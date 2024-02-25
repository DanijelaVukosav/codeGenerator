import React, {useState} from "react";
import {useForm} from "react-hook-form";
import styles from "../../styles/UploadFile.module.scss";
import FileUploadService from "../../services/uploadFile";
import {useNavigate} from "react-router-dom";
import {HttpStatusCode} from "axios";

const SQL_FILE_INPUT = "sql_file_input";

function App() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("Select your file!");
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm();

    const submitForm = async (formData: any) => {
        const redirectPath = `/tables-control`;
        errorMessage && setErrorMessage('');

        // saveData(formData);
        console.log("AAAAAA", formData);

        try {
            const response = await FileUploadService.upload(formData?.[SQL_FILE_INPUT]?.[0], (event: any) => {
                console.log("event", event);
            });
            if(response.status === HttpStatusCode.Ok) {
                navigate(redirectPath, {state: response.data});
            }
            else
            {
                setErrorMessage('An error has occurred. Check your file and please try again');
            }
        } catch {
            setErrorMessage('An error has occurred. Please try again');
        }
    };

    const onFileChange = (event: any) => {
        setFileName(event.target.files?.[0]?.name);
    };

    return (
        <React.Fragment>
            {/*<div className={styles.header}>*/}
            {/*  <span>Sistem generator</span>*/}
            {/*</div>*/}
            <div className={styles.container}>
                <div
                    style={{display: "flex", flexDirection: "column", maxWidth: "40%"}}
                >
                    <div style={{paddingBottom: "7vh"}}>
                        <h1>
                            Izaberite zeljenu SQL skriptu, te nakon toga predjite na drugi
                            korak.
                        </h1>
                    </div>
                    <div className="form">
                        <div className={styles.file_upload_wrapper} data-text={fileName}>
                            <input
                                id={SQL_FILE_INPUT}
                                type="file"
                                className="file-upload-field"
                                accept=".sql"
                                {...register(SQL_FILE_INPUT, {
                                    onChange: onFileChange,
                                    required: "Morate izabrati skriptu!",
                                })}
                            />
                        </div>

                        {errors?.[SQL_FILE_INPUT] && (
                            <p style={{color: "red"}}>
                                {errors?.[SQL_FILE_INPUT]?.message?.toString()}
                            </p>
                        )}
                        {
                            errorMessage && (<p style={{color: "red"}}>
                                {errorMessage}
                            </p>)
                        }

                        <button
                            className={styles.continue_button}
                            onClick={handleSubmit(submitForm)}
                        >
                            {" "}
                            Nastavi
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
