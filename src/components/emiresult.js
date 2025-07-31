import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Toast from "./Toast";

const EmiResult = ({ data, isDarkMode = false }) => {
  const contentRef = useRef();
  const [isPdfMode, setIsPdfMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error', isVisible: false });
  
  if (!data)
    return (
      <div className="text-center text-gray-500">
        No data available. Please calculate EMI first.
      </div>
    );

  // Check browser compatibility and library availability
  const checkCompatibility = () => {
    // Check if required APIs are available
    if (typeof window === 'undefined') {
      throw new Error('PDF export is not available in server-side environment');
    }
    
    if (!window.HTMLCanvasElement) {
      throw new Error('Canvas support is required for PDF export');
    }
    
    if (!html2canvas) {
      throw new Error('html2canvas library failed to load');
    }
    
    if (!jsPDF) {
      throw new Error('jsPDF library failed to load');
    }
    
    // Check for required canvas features
    const canvas = document.createElement('canvas');
    if (!canvas.getContext || !canvas.getContext('2d')) {
      throw new Error('2D canvas context is not supported');
    }
    
    return true;
  };

  const showErrorMessage = (message) => {
    setToast({
      message,
      type: 'error',
      isVisible: true
    });
  };

  const showSuccessMessage = (message) => {
    setToast({
      message,
      type: 'success',
      isVisible: true
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const captureElementWithFallback = async (element, options) => {
    try {
      // First attempt with full options
      return await html2canvas(element, options);
    } catch (error) {
      console.warn('html2canvas failed with full options, trying with reduced options:', error);
      
      // Fallback with minimal options
      const fallbackOptions = {
        scale: 1, // Reduce scale
        useCORS: false,
        allowTaint: true,
        backgroundColor: options.backgroundColor,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight
      };
      
      try {
        return await html2canvas(element, fallbackOptions);
      } catch (fallbackError) {
        console.error('html2canvas failed even with fallback options:', fallbackError);
        throw new Error('Failed to capture content. This might be due to browser limitations or CORS restrictions.');
      }
    }
  };

    const exportToPDF = async () => {
      if (isExporting) return; // Prevent multiple simultaneous exports
      
      try {
        setIsExporting(true);
        
        // Check browser compatibility first
        checkCompatibility();
        
        // Ensure content reference exists
        if (!contentRef.current) {
          throw new Error('Content reference is not available');
        }
        // Enable PDF mode to force light styling
        setIsPdfMode(true);
        
        // Wait for the DOM to update with new styles
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 200);
          });
        });
        
        // Create PDF instance
        const pdf = new jsPDF('l', 'mm', 'a4');
        
        // Define margins and page dimensions
        const pageWidth = 297;
        const pageHeight = 210;
        const marginTop = 15;
        const marginBottom = 15;
        const marginLeft = 10;
        const marginRight = 10;
        
        const usableWidth = pageWidth - marginLeft - marginRight;
        const usableHeight = pageHeight - marginTop - marginBottom;
        
        // Check if we need to separate the table to next page
        const shouldSeparateTable = plan.length > 5;
        
        if (shouldSeparateTable) {
          // Create separate canvases for summary and table
          const summarySection = contentRef.current.querySelector('#summary-section');
          const tableSection = contentRef.current.querySelector('#table-section');
          
          // Always use light mode for PDF export
          const backgroundColor = '#ffffff';
          
          // Check if sections exist
          if (!summarySection || !tableSection) {
            throw new Error('Required content sections not found');
          }
          
          // Capture both sections with error handling
          const summaryCanvas = await captureElementWithFallback(summarySection, getCanvasOptions(summarySection, backgroundColor));
          const tableCanvas = await captureElementWithFallback(tableSection, getCanvasOptions(tableSection, backgroundColor));
          
          // Add summary to first page
          const summaryImgData = summaryCanvas.toDataURL('image/png');
          const summaryImgWidth = usableWidth;
          const summaryImgHeight = (summaryCanvas.height * summaryImgWidth) / summaryCanvas.width;
          
          pdf.addImage(
            summaryImgData,
            'PNG',
            marginLeft,
            marginTop,
            summaryImgWidth,
            Math.min(summaryImgHeight, usableHeight)
          );
          
          // Add new page for table
          pdf.addPage();
          
          // Add table using helper function
          addCanvasToPDF(pdf, tableCanvas, marginLeft, marginTop, usableWidth, usableHeight, backgroundColor);
          
        } else {
          // Original logic for content with 5 or fewer rows
          const backgroundColor = '#ffffff';
          const canvas = await captureElementWithFallback(contentRef.current, getCanvasOptions(contentRef.current, backgroundColor));
          
          // Add content using helper function
          addCanvasToPDF(pdf, canvas, marginLeft, marginTop, usableWidth, usableHeight, backgroundColor);
        }
        
        // Save the PDF
        pdf.save("EMI_Calculation_Result.pdf");
        
        // Show success message
        showSuccessMessage('PDF has been generated and downloaded successfully!');
        
      } catch (error) {
        console.error('PDF generation error:', error);
        
        // Show user-friendly error message
        let userMessage = 'Failed to generate PDF. ';
        
        if (error.message.includes('Canvas support')) {
          userMessage += 'Your browser does not support the required features.';
        } else if (error.message.includes('CORS')) {
          userMessage += 'Security restrictions prevented content capture.';
        } else if (error.message.includes('html2canvas')) {
          userMessage += 'Content capture failed. Try using a different browser.';
        } else if (error.message.includes('jsPDF')) {
          userMessage += 'PDF generation library error.';
        } else {
          userMessage += 'Please try again or contact support.';
        }
        
        showErrorMessage(userMessage);
      } finally {
        // Always disable PDF mode and export state after export
        setIsPdfMode(false);
        setIsExporting(false);
      }
    };

  const {
    plan,
    totalCost,
    totalCostWithTax,
    totalFee,
    grandTotal,
    extra,
    emidisc,
  } = data;

  // Currency symbol - always use ₹ for web UI
  const currencySymbol = "₹";

  // Helper function to get theme classes
  const getThemeClasses = (lightClass, darkClass) => {
    return isPdfMode || !isDarkMode ? lightClass : darkClass;
  };

  // Helper function to get canvas capture options
  const getCanvasOptions = (element, backgroundColor = '#ffffff') => ({
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor,
    logging: false,
    letterRendering: true,
    foreignObjectRendering: false,
    removeContainer: true,
    imageTimeout: 0,
    width: element.scrollWidth,
    height: element.scrollHeight
  });

  // Helper function to create PDF pages from canvas
  const addCanvasToPDF = (pdf, canvas, marginLeft, marginTop, usableWidth, usableHeight, backgroundColor) => {
    const imgWidth = usableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const totalPages = Math.ceil(imgHeight / usableHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      const sourceY = page * usableHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(usableHeight * (canvas.height / imgHeight), canvas.height - sourceY);

      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');

      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;

      pageCtx.fillStyle = backgroundColor;
      pageCtx.fillRect(0, 0, canvas.width, sourceHeight);

      pageCtx.drawImage(
        canvas,
        0, sourceY, canvas.width, sourceHeight,
        0, 0, canvas.width, sourceHeight
      );

      const pageImgData = pageCanvas.toDataURL('image/png');
      const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;

      pdf.addImage(
        pageImgData,
        'PNG',
        marginLeft,
        marginTop,
        imgWidth,
        pageImgHeight
      );
    }
  };

  // Helper function to create summary card
  const SummaryCard = ({ title, value, colorPrefix }) => (
    <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
      getThemeClasses(`bg-${colorPrefix}-50 border-${colorPrefix}-400`, `bg-${colorPrefix}-900 border-${colorPrefix}-500`)
    }`}>
      <strong className={getThemeClasses(`text-${colorPrefix}-700`, `text-${colorPrefix}-300`)}>
        {title}:
      </strong> 
      <span className={`font-semibold ml-2 ${getThemeClasses(`text-${colorPrefix}-800`, `text-${colorPrefix}-200`)}`}>
        {currencySymbol}{value}
      </span>
    </div>
  );

  return (
    <div className={`w-full shadow-xl rounded-2xl p-8 mt-8 border transition-all duration-300 ${
      getThemeClasses('bg-white border-indigo-100', 'bg-slate-800 border-slate-600')
    }`}>
      <div
        className={`w-full shadow-lg rounded-xl p-8 border transition-all duration-300 ${
          getThemeClasses('bg-gray-50 border-gray-200', 'bg-slate-700 border-slate-500')
        }`}
        ref={contentRef}
      >
        {/* Summary Section */}
        <div id="summary-section">
          <h2 className={`text-3xl font-bold text-center mb-6 ${
            getThemeClasses('text-indigo-700', 'text-purple-300')
          }`}>
            💰 EMI Calculation Result
          </h2>

          <div className="mb-8 grid grid-cols-2 gap-6">
            <SummaryCard title="Total Cost" value={totalCost} colorPrefix="emerald" />
            <SummaryCard title="Total Cost with Tax" value={totalCostWithTax} colorPrefix="blue" />
            <SummaryCard title="Total Fee(incl. fee)" value={totalFee} colorPrefix="amber" />
            <SummaryCard title="Grand Total (incl. Fee)" value={grandTotal} colorPrefix="purple" />
            <SummaryCard title="Extra" value={extra} colorPrefix="rose" />
            <SummaryCard title="EMI Discount" value={emidisc} colorPrefix="cyan" />
          </div>
        </div>

        {/* EMI Plan Table */}
        <div id="table-section" className={`overflow-auto rounded-xl shadow-inner border transition-all duration-300 ${
          getThemeClasses('bg-white border-slate-200', 'bg-slate-800 border-slate-600')
        }`}>
          <h3 className={`text-xl font-semibold mb-4 p-4 rounded-t-xl border-b transition-all duration-300 ${
            getThemeClasses('text-slate-700 bg-slate-100 border-slate-200', 'text-slate-300 bg-slate-700 border-slate-600')
          }`}>
            📊 EMI Plan Breakdown
          </h3>
          <div className="p-4">
            <table className={`w-full table-auto border-collapse border text-sm rounded-lg overflow-hidden ${
              getThemeClasses('border-slate-300', 'border-slate-600')
            }`}>
              <thead>
                <tr className={`text-white ${
                  getThemeClasses('bg-indigo-600', 'bg-purple-700')
                }`}>
                  {[
                    "Month",
                    "EMI",
                    "Principle",
                    "Interest", 
                    "Balance",
                    "Tax on Interest",
                    "Total Per Month",
                  ].map((header) => (
                    <th
                      key={header}
                      className={`border p-3 font-semibold text-center ${
                        getThemeClasses('border-indigo-500', 'border-purple-500')
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.map((item, index) => (
                  <tr key={item.month} className={`transition-colors duration-200 ${
                    index % 2 === 0 
                      ? getThemeClasses('bg-slate-50', 'bg-slate-700')
                      : getThemeClasses('bg-white', 'bg-slate-800')
                  } ${getThemeClasses('hover:bg-indigo-50', 'hover:bg-purple-800')}`}>
                    <td className={`border p-3 text-center font-medium ${
                      getThemeClasses('border-slate-300 text-slate-700', 'border-slate-600 text-slate-300')
                    }`}>
                      {item.month}
                    </td>
                    <td className={`border p-3 text-center font-semibold ${
                      getThemeClasses('border-slate-300 text-emerald-700', 'border-slate-600 text-emerald-300')
                    }`}>
                      {item.emi}
                    </td>
                    <td className={`border p-3 text-center ${
                      getThemeClasses('border-slate-300 text-blue-700', 'border-slate-600 text-blue-300')
                    }`}>
                      {item.ppm}
                    </td>
                    <td className={`border p-3 text-center ${
                      getThemeClasses('border-slate-300 text-amber-700', 'border-slate-600 text-amber-300')
                    }`}>
                      {item.ipm}
                    </td>
                    <td className={`border p-3 text-center ${
                      getThemeClasses('border-slate-300 text-purple-700', 'border-slate-600 text-purple-300')
                    }`}>
                      {item.balance}
                    </td>
                    <td className={`border p-3 text-center ${
                      getThemeClasses('border-slate-300 text-rose-700', 'border-slate-600 text-rose-300')
                    }`}>
                      {item.toi}
                    </td>
                    <td className={`border p-3 text-center font-semibold ${
                      getThemeClasses('border-slate-300 text-indigo-700', 'border-slate-600 text-indigo-300')
                    }`}>
                      {item.tpmit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <button
          className={`font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mx-auto block border-0 focus:ring-4 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white focus:ring-purple-400/30'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-300'
          } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={exportToPDF}
          disabled={isExporting}
        >
          {isExporting ? '⏳ Generating PDF...' : '📄 Export to PDF'}
        </button>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
        duration={5000}
      />
    </div>
  );
};

export default EmiResult;
