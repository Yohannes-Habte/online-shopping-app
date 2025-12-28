
import { XCircleIcon } from "lucide-react"; 

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}) => {
  return (
    <div
      className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md"
      role="alert"
    >
      <XCircleIcon className="w-6 h-6 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
