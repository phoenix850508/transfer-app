import React from "react";

function ToastInfo({ infoMessage }) {
  return (
    <div
      className="max-w-xs bg-gray-400 text-sm text-white rounded-md shadow-lg dark:bg-gray-900 mb-3"
      role="alert"
    >
      <div className="p-4 font-bold">
        {infoMessage}
        <div className="ml-auto"></div>
      </div>
    </div>
  );
}

export default ToastInfo;
