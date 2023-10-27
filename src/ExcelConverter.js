import React, { useState, useContext, } from 'react';
import * as XLSX from 'xlsx';
import { ArrayContext } from './ArrayContext';



function ExcelConverter() {
    const { array, setArray } = useContext(ArrayContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [flag, setFlag] = useState(false)
    // const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFlag(true);
    };

    const handleConvert = () => {
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const data = event.target.result;

                const workbook = XLSX.read(data, { type: 'binary' });

                workbook.SheetNames.forEach((sheet) => {
                    const rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    const jsonObject = JSON.stringify(rowObject);
                    // setJsonData(jsonObject);
                    setArray(rowObject)
                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "20vh",
            flexDirection: "column"
        }}>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} className='custom-file-input' /><br />
            <button type="button" disabled={!flag} className='button-22' id="uploadExcel" onClick={handleConvert}>Convert</button>
            {/* <pre id="jsonData">{jsonData}</pre> */}
        </div>
    );
}

export default ExcelConverter;
