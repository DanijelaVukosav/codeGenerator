import React, {FC, useMemo, useState} from "react";
import styles from "../../styles/TablesControl.module.scss";
import {useLocation, useNavigate} from "react-router-dom";
import {Table} from "../../common/types";
import {isObject} from "lodash";
import FileUploadService from "../../services/uploadFile";
import {HttpStatusCode} from "axios";

const TablesControl: FC = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const tables = useMemo(() => {
        if (!state?.tables || !state) {

            return [];
        }
        console.log(state, isObject(state?.tables));
        return isObject(state?.tables) ? Object.values(state.tables) as Table[] : [];
    }, [state])
    const routeChange = () => {
        const path = `/upload-file`;
        navigate(path);
    };
    const save = async () => {
        try {
            const response = await FileUploadService.download(state);
            if (response.status === HttpStatusCode.Ok) {
                console.log(response)
                const contentDispositionHeader = response.headers.get('Content-Disposition');
                console.log(contentDispositionHeader);
                const filename = contentDispositionHeader
                    ? contentDispositionHeader.split('filename=')[1]
                    : state.databaseName + '.zip';

                // Kreirajte objekat Blob sa podacima odgovora
                const blob = await response.blob();

                // Kreirajte URL za Blob
                const blobUrl = URL.createObjectURL(blob);

                // Kreirajte link za preuzimanje
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;

                // Dodajte link u DOM, emulirajte klik na njega i uklonite ga
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch {
            console.log("EROOOR");
        }
    };


    console.log(state);
    return (
        // <div className={styles.container}>
        //     <ul className={styles.cards}>
        //         <li className={styles.cards__item}>
        //             <div className={styles.card}>
        //                 <div className={`${styles.card__image} ${styles.card__image_fence}`}/>
        //                 <div className={styles.card__content}>
        //                     <div className={styles.card__title}>Flex</div>
        //                     <p className={styles.card__text}>
        //                         This is the shorthand htmlFor flex-grow, flex-shrink and flex-basis
        //                         combined. The second and third parameters (flex-shrink and
        //                         flex-basis) are optional. Default is 0 1 auto.{" "}
        //                     </p>
        //                     <button className={`${styles.btn} ${styles.btn_block} ${styles.card__btn}`}>Button</button>
        //                 </div>
        //             </div>
        //         </li>
        //         <li className="cards__item">
        //             <div className="card">
        //                 <div className="card__image card__image--river"/>
        //                 <div className="card__content">
        //                     <div className="card__title">Flex Grow</div>
        //                     <p className="card__text">
        //                         This defines the ability htmlFor a flex item to grow if necessary. It
        //                         accepts a unitless value that serves as a proportion. It dictates
        //                         what amount of the available space inside the flex container the
        //                         item should take up.
        //                     </p>
        //                     <button className="btn btn--block card__btn">Button</button>
        //                 </div>
        //             </div>
        //         </li>
        //         <li className="cards__item">
        //             <div className="card">
        //                 <div className="card__image card__image--record"/>
        //                 <div className="card__content">
        //                     <div className="card__title">Flex Shrink</div>
        //                     <p className="card__text">
        //                         This defines the ability htmlFor a flex item to shrink if necessary.
        //                         Negative numbers are invalid.
        //                     </p>
        //                     <button className="btn btn--block card__btn">Button</button>
        //                 </div>
        //             </div>
        //         </li>
        //         <li className="cards__item">
        //             <div className="card">
        //                 <div className="card__image card__image--flowers"/>
        //                 <div className="card__content">
        //                     <div className="card__title">Flex Basis</div>
        //                     <p className="card__text">
        //                         This defines the default size of an element before the remaining
        //                         space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or
        //                         a keyword. The auto keyword means "look at my width or height
        //                         property."
        //                     </p>
        //                     <button className="btn btn--block card__btn">Button</button>
        //                 </div>
        //             </div>
        //         </li>
        //     </ul>
        // </div>
        <div className={styles.tables_control}>
            <div className={styles.container}>
                <h1>Dobrodošli u Generator Koda!</h1>
                <p>Ovdje možete podesiti specificna podesavanja vasih tabela.</p>
                <button onClick={save}>Generate apps</button>
                <div className={styles.card_grid}>
                    {tables?.length ? tables.map(table => {
                        return (<div className={styles.card}>
                            <h3>
                                <i className="fas fa-table icon"></i>
                                {table.tableName}
                            </h3>
                            <ul>
                                {table.columns.map(column => {
                                    return (
                                        <li><input type="checkbox" id="checkbox-1"/><label
                                            htmlFor="checkbox-1">{column.columnName}</label>
                                        </li>)
                                })}
                            </ul>
                        </div>)
                    }) : (<div>
                        'Data not valid, please upload your valid script'
                        <div className={styles.actions}>
                            <div>
                                <button onClick={routeChange}>
                                    Go to home
                                </button>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TablesControl;
