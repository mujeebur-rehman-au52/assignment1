import React from 'react';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
function PdfUploadForm({ onFileUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
        </div>
    );
}

function PdfViewer({ pdf }) {
    return (
        <Document file={pdf}>
            {Array.from({ length: numPages }, (_, index) =>( 
                <Page key={index} pageNumber={index + 1} />
           )
            )}
        </Document>
    );
}

function PageSelection({ numPages, onSelect }) {
    const [selectedPages, selectedPages] = useState([]);

    const handleCheckboxChange = (pageNumber) => {
        const newSelectedPages = selectedPages.includes(pageNumber)
        ? selectedPages.filter((page) => page !== pageNumber)
        : [...selectedPages, pageNumber];
        setSelectedPages(newSelectedPages);
        onSelect(newSelectedPages);
    };

    return (
        <div>
            {Array.from({ length: numPages }), (_, index) => (
                <label key={index}>
                    <input 
                    type="checkbox"
                    value={index + 1}
                    checked={selectedPages.includes(index + 1)}
                    onChange={() => handleCheckboxChange(inedx + 1)}
                    />
                    Page {index +1}
                </label>
                )}
        </div>
    )
}
