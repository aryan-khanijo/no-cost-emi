import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";

const EmiResult = ({ data }) => {
  const contentRef = useRef();
  const [isPdfMode, setIsPdfMode] = useState(false);
  
  if (!data)
    return (
      <div className="text-center text-gray-500">
        No data available. Please calculate EMI first.
      </div>
    );

    const exportToPDF = () => {
      // Switch to PDF mode to use Rs. instead of ₹
      setIsPdfMode(true);
      
      // Small delay to ensure state update is rendered
      setTimeout(() => {
        const doc = new jsPDF("l", "pt", "a3");
        
        // Set font to support Unicode characters
        doc.setFont("helvetica");
        
        // Use HTML to PDF with better Unicode handling
        doc.html(contentRef.current, {
          callback: function (doc) {
            doc.save("EMI_Calculation_Result.pdf");
            // Switch back to web mode after PDF generation
            setIsPdfMode(false);
          },
          margin: [20, 20, 20, 20],
          x: 20,
          y: 20,
          width: 1150,
          windowWidth: 1200,
        });
      }, 100);
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

  // Currency symbol based on mode
  const currencySymbol = isPdfMode ? "Rs." : "₹";

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mt-8">
      <div
        className="w-full bg-white shadow-md rounded-lg p-6 mt-8"
        ref={contentRef}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          EMI Calculation Result
        </h2>

        {/* Summary Section */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Total Cost:</strong> {currencySymbol}{totalCost}
          </div>
          <div>
            <strong>Total Cost with Tax:</strong> {currencySymbol}{totalCostWithTax}
          </div>
          <div>
            <strong>Total Fee(incl. fee):</strong> {currencySymbol}{totalFee}
          </div>
          <div>
            <strong>Grand Total (incl. Fee):</strong> {currencySymbol}{grandTotal}
          </div>
          <div>
            <strong>Extra:</strong> {currencySymbol}{extra}
          </div>
          <div>
            <strong>EMI Discount:</strong> {currencySymbol}{emidisc}
          </div>
        </div>

        {/* EMI Plan Table */}
        <div className="overflow-auto">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">EMI Plan</h3>
          <table className="w-full table-auto border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-blue-100">
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
                    className="border border-gray-300 p-2 text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plan.map((item) => (
                <tr key={item.month} className="even:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.month}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.emi}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.ppm}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.ipm}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.balance}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.toi}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-gray-700">
                    {item.tpmit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full my-[1%]">
        <button
          className="bg-blue-500 p-5 mx-auto block text-white py-2 rounded-md hover:bg-blue-600"
          onClick={exportToPDF}
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default EmiResult;
