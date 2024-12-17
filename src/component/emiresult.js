import React from "react";

const EmiResult = ({ data }) => {
  if (!data)
    return (
      <div className="text-center text-gray-500">
        No data available. Please calculate EMI first.
      </div>
    );

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
      <div className="overflow-x-auto max-h-96">
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
  );
};

export default EmiResult;
