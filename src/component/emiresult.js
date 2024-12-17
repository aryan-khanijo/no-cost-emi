import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const EmiResult = ({ data }) => {
  const contentRef = useRef();
  if (!data)
    return (
      <div className="text-center text-gray-500">
        No data available. Please calculate EMI first.
      </div>
    );

//   const exportToPDF = () => {
//     const doc = new jsPDF("p", "pt", "a4");

//     // Capture the content of the HTML element you want to export as PDF
//     doc.html(contentRef.current, {
//       callback: function (doc) {
//         doc.save("download.pdf"); // Save the PDF with a custom name
//       },
//       margin: [1, 1, 1, 1],
//       x: 1,
//       y: 1,
//     });
//   };

  const {
    plan,
    total_cost,
    total_cost_with_tax,
    total_fee,
    grand_total,
    extra,
    emidisc,
  } = data;

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
            <strong>Total Cost:</strong> ₹{total_cost}
          </div>
          <div>
            <strong>Total Cost with Tax:</strong> ₹{total_cost_with_tax}
          </div>
          <div>
            <strong>Total Fee(incl. fee):</strong> ₹{total_fee}
          </div>
          <div>
            <strong>Grand Total (incl. Fee):</strong> ₹{grand_total}
          </div>
          <div>
            <strong>Extra:</strong> ₹{extra}
          </div>
          <div>
            <strong>EMI Discount:</strong> ₹{emidisc}
          </div>
        </div>

        {/* EMI Plan Table */}
        <div className="overflow-auto max-h-96" style={{ overflow: "auto" }}>
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
                    className="border border-black p-2 text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plan.map((item) => (
                <tr key={item.month} className="even:bg-gray-50">
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.month}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.emi}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.ppm}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.ipm}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.balance}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.toi}
                  </td>
                  <td className="border border-black p-2 text-center text-gray-700">
                    {item.tpmit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full">
        {/* <button
          className="bg-blue-500 p-5 mx-auto block text-white py-2 rounded-md hover:bg-blue-600"
          onClick={exportToPDF}
        >
          Export to PDF
        </button> */}
      </div>
    </div>
  );
};

export default EmiResult;
