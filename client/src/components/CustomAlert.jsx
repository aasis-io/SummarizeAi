// CustomAlert.js
import React from "react";

const CustomAlert = ({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-sm`}
    >
      <div
        className={`bg-white px-24 py-12 rounded-xl max-w-2xl text-center shadow-lg ${
          type === "warning" ? "border-l-4 border-red-500" : ""
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-700">
          {type === "warning" ? "Warning" : "Info"}
        </h2>
        <p className="mt-4 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center gap-4">
          {cancelText && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:cursor-pointer rounded-lg hover:bg-gray-400 transition"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-main hover:cursor-pointer text-white rounded-lg hover:bg-main-dark transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
