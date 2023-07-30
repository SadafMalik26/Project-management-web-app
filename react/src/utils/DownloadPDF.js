import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
function DownloadPdf({ buffer, fileName }) {

  const downloadPdf = () => {
    const pdfData = new Uint8Array(buffer);
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  saveAs(blob, fileName+'.pdf');
  }
  return (
     <FontAwesomeIcon onClick={downloadPdf} icon={faDownload} />
  );
}

export default DownloadPdf;
