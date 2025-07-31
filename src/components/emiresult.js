import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const EmiResult = ({ data, isDarkMode = false }) => {
  const contentRef = useRef();
  const [isPdfMode, setIsPdfMode] = useState(false);
  
  if (!data)
    return (
      <div className="text-center text-gray-500">
        No data available. Please calculate EMI first.
      </div>
    );

    const exportToPDF = async () => {
      try {
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
          const backgroundColor = '#ffffff'; // Always white background for PDF
          
          // Capture summary section
          const summaryCanvas = await html2canvas(summarySection, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: backgroundColor,
            logging: false,
            letterRendering: true,
            foreignObjectRendering: false,
            removeContainer: true,
            imageTimeout: 0,
            width: summarySection.scrollWidth,
            height: summarySection.scrollHeight
          });
          
          // Capture table section
          const tableCanvas = await html2canvas(tableSection, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: backgroundColor,
            logging: false,
            letterRendering: true,
            foreignObjectRendering: false,
            removeContainer: true,
            imageTimeout: 0,
            width: tableSection.scrollWidth,
            height: tableSection.scrollHeight
          });
          
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
          
          // Add table to second page
          const tableImgData = tableCanvas.toDataURL('image/png');
          const tableImgWidth = usableWidth;
          const tableImgHeight = (tableCanvas.height * tableImgWidth) / tableCanvas.width;
          
          // Calculate how many pages needed for table
          const tableTotalPages = Math.ceil(tableImgHeight / usableHeight);
          
          for (let page = 0; page < tableTotalPages; page++) {
            if (page > 0) {
              pdf.addPage();
            }
            
            const sourceY = page * usableHeight * (tableCanvas.height / tableImgHeight);
            const sourceHeight = Math.min(usableHeight * (tableCanvas.height / tableImgHeight), tableCanvas.height - sourceY);
            
            const pageCanvas = document.createElement('canvas');
            const pageCtx = pageCanvas.getContext('2d');
            
            pageCanvas.width = tableCanvas.width;
            pageCanvas.height = sourceHeight;
            
            pageCtx.fillStyle = backgroundColor;
            pageCtx.fillRect(0, 0, tableCanvas.width, sourceHeight);
            
            pageCtx.drawImage(
              tableCanvas,
              0, sourceY, tableCanvas.width, sourceHeight,
              0, 0, tableCanvas.width, sourceHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png');
            const pageImgHeight = (sourceHeight * tableImgWidth) / tableCanvas.width;
            
            pdf.addImage(
              pageImgData,
              'PNG',
              marginLeft,
              marginTop,
              tableImgWidth,
              pageImgHeight
            );
          }
          
        } else {
          // Original logic for content with 5 or fewer rows
          // Always use light mode for PDF export
          const backgroundColor = '#ffffff'; // Always white background for PDF
          
          const canvas = await html2canvas(contentRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: backgroundColor,
            logging: false,
            letterRendering: true,
            foreignObjectRendering: false,
            removeContainer: true,
            imageTimeout: 0,
            width: contentRef.current.scrollWidth,
            height: contentRef.current.scrollHeight
          });
          
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
        }
        
        // Save the PDF
        pdf.save("EMI_Calculation_Result.pdf");
        
      } catch (error) {
        console.error('PDF generation error:', error);
      } finally {
        // Always disable PDF mode after export
        setIsPdfMode(false);
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

  return (
    <div className={`w-full shadow-xl rounded-2xl p-8 mt-8 border transition-all duration-300 ${
      isPdfMode || !isDarkMode
        ? 'bg-white border-indigo-100'
        : 'bg-slate-800 border-slate-600'
    }`}>
      <div
        className={`w-full shadow-lg rounded-xl p-8 border transition-all duration-300 ${
          isPdfMode || !isDarkMode
            ? 'bg-gray-50 border-gray-200'
            : 'bg-slate-700 border-slate-500'
        }`}
        ref={contentRef}
      >
        {/* Summary Section */}
        <div id="summary-section">
          <h2 className={`text-3xl font-bold text-center mb-6 ${
            isPdfMode || !isDarkMode
              ? 'text-indigo-700'
              : 'text-purple-300'
          }`}>
            💰 EMI Calculation Result
          </h2>

          <div className="mb-8 grid grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-emerald-50 border-emerald-400'
              : 'bg-emerald-900 border-emerald-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-emerald-700' : 'text-emerald-300'}>Total Cost:</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-emerald-800' : 'text-emerald-200'}`}>
              {currencySymbol}{totalCost}
            </span>
          </div>
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-blue-50 border-blue-400'
              : 'bg-blue-900 border-blue-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-blue-700' : 'text-blue-300'}>Total Cost with Tax:</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-blue-800' : 'text-blue-200'}`}>
              {currencySymbol}{totalCostWithTax}
            </span>
          </div>
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-amber-50 border-amber-400'
              : 'bg-amber-900 border-amber-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-amber-700' : 'text-amber-300'}>Total Fee(incl. fee):</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-amber-800' : 'text-amber-200'}`}>
              {currencySymbol}{totalFee}
            </span>
          </div>
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-purple-50 border-purple-400'
              : 'bg-purple-900 border-purple-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-purple-700' : 'text-purple-300'}>Grand Total (incl. Fee):</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-purple-800' : 'text-purple-200'}`}>
              {currencySymbol}{grandTotal}
            </span>
          </div>
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-rose-50 border-rose-400'
              : 'bg-rose-900 border-rose-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-rose-700' : 'text-rose-300'}>Extra:</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-rose-800' : 'text-rose-200'}`}>
              {currencySymbol}{extra}
            </span>
          </div>
          <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'bg-cyan-50 border-cyan-400'
              : 'bg-cyan-900 border-cyan-500'
          }`}>
            <strong className={isPdfMode || !isDarkMode ? 'text-cyan-700' : 'text-cyan-300'}>EMI Discount:</strong> 
            <span className={`font-semibold ml-2 ${isPdfMode || !isDarkMode ? 'text-cyan-800' : 'text-cyan-200'}`}>
              {currencySymbol}{emidisc}
            </span>
          </div>
        </div>
        </div>

        {/* EMI Plan Table */}
        <div id="table-section" className={`overflow-auto rounded-xl shadow-inner border transition-all duration-300 ${
          isPdfMode || !isDarkMode
            ? 'bg-white border-slate-200'
            : 'bg-slate-800 border-slate-600'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 p-4 rounded-t-xl border-b transition-all duration-300 ${
            isPdfMode || !isDarkMode
              ? 'text-slate-700 bg-slate-100 border-slate-200'
              : 'text-slate-300 bg-slate-700 border-slate-600'
          }`}>
            📊 EMI Plan Breakdown
          </h3>
          <div className="p-4">
            <table className={`w-full table-auto border-collapse border text-sm rounded-lg overflow-hidden ${
              isPdfMode || !isDarkMode ? 'border-slate-300' : 'border-slate-600'
            }`}>
              <thead>
                <tr className={`text-white ${
                  isPdfMode || !isDarkMode
                    ? 'bg-indigo-600'
                    : 'bg-purple-700'
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
                        isPdfMode || !isDarkMode ? 'border-indigo-500' : 'border-purple-500'
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
                      ? (isPdfMode || !isDarkMode ? 'bg-slate-50' : 'bg-slate-700')
                      : (isPdfMode || !isDarkMode ? 'bg-white' : 'bg-slate-800')
                  } ${isPdfMode || !isDarkMode ? 'hover:bg-indigo-50' : 'hover:bg-purple-800'}`}>
                    <td className={`border p-3 text-center font-medium ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-slate-700' : 'border-slate-600 text-slate-300'
                    }`}>
                      {item.month}
                    </td>
                    <td className={`border p-3 text-center font-semibold ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-emerald-700' : 'border-slate-600 text-emerald-300'
                    }`}>
                      {item.emi}
                    </td>
                    <td className={`border p-3 text-center ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-blue-700' : 'border-slate-600 text-blue-300'
                    }`}>
                      {item.ppm}
                    </td>
                    <td className={`border p-3 text-center ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-amber-700' : 'border-slate-600 text-amber-300'
                    }`}>
                      {item.ipm}
                    </td>
                    <td className={`border p-3 text-center ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-purple-700' : 'border-slate-600 text-purple-300'
                    }`}>
                      {item.balance}
                    </td>
                    <td className={`border p-3 text-center ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-rose-700' : 'border-slate-600 text-rose-300'
                    }`}>
                      {item.toi}
                    </td>
                    <td className={`border p-3 text-center font-semibold ${
                      isPdfMode || !isDarkMode ? 'border-slate-300 text-indigo-700' : 'border-slate-600 text-indigo-300'
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
          }`}
          onClick={exportToPDF}
        >
          📄 Export to PDF
        </button>
      </div>
    </div>
  );
};

export default EmiResult;
