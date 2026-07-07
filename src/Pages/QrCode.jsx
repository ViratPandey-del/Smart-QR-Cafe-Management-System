import { QRCodeCanvas } from "qrcode.react";

export const QrCode = () => {
  const tables = ["T1", "T2", "T3", "T4", "T5", "T6"];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Burger House QR Codes
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {tables.map((table) => (
          <div
            key={table}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Table {table}
            </h2>

            <QRCodeCanvas
              value={`http://burgerhousecafe.netlify.app/categories?table=${table}`}
              size={200}
            />

            <p className="mt-4 text-gray-600">
              Scan to Order
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};