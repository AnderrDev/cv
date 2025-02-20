import React, { useState } from 'react';

const DownloadCV = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Simula un retardo para mostrar el loader (1 segundo)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Crea un enlace temporal para descargar el asset cv.pdf
      const link = document.createElement('a');
      link.href = '/CV.pdf'; // Asegúrate de que cv.pdf esté en la carpeta public
      link.download = 'CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error descargando el PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`bg-primary text-white px-8 py-4 rounded-lg transition-all duration-300 transform font-medium shadow-lg ${
          loading ? 'cursor-not-allowed opacity-75' : 'hover:bg-primary/90 hover:scale-105'
        }`}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span>Descargando...</span>
          </div>
        ) : (
          'Descargar CV'
        )}
      </button>
    </div>
  );
};

export default DownloadCV;