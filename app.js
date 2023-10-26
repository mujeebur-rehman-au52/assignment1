const express = require('express');
const fileUpload = require('express-fileupload');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;

const app = express();
app.use(express.json());
app.use(fileUpload());
const PORT = 3000;

app.listed(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/upload', async (req, res) => {
    try {
        const { file } = req;
        if (!files || !files.pdf) {
            return res.status(400).send('No PDF file uploaded');
        }
        const uploadedFile = files.pdf;
        const fileName = uploadedFile.name;
        await uploadedFile.mv(fileName);

        res.send('File uploaded successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/pdf/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = `./${fileName}`;

    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.post('/manipulate-pdf', async (req, res) => {
    try {
        const { inputFileName, outputFileName, selectedPages } = req.body;

        const existingPdfBytes = await fs.readFile(inputFileName);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdfDoc.getPages(), {
            includePageNumbers: selectedPages: selectedPages, // Array of page numbers
        });
        const newPdfDoc= await PDFDocument.create();
        for (const page of copiedPages) {
            newPdfDoc.addPage(page);
        }
        const pdfBytes = await newPdfDoc.save();

        await fs.writeFile(outputFileName, pdfBytes);

        res.send('PDF manipilation successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internat Server Error');
    }
});