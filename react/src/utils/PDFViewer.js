import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdfBuffer }) => {
  return (
      <Document file={{ data: pdfBuffer }} options={{
          disableAnnotationLayer: true
        }}>
        <Page pageNumber={1} width={351} height={100} />
      </Document>
    
  );
};

export default PDFViewer;
