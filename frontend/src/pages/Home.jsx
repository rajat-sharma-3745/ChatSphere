import { FiMessageSquare } from "react-icons/fi";

export default function Home() {
  
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center max-w-md px-6 py-10 bg-white rounded-3xl shadow-lg border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-blue-100 rounded-2xl">
            <FiMessageSquare className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Select a Conversation
        </h1>

        <p className="text-gray-500 mb-6 leading-relaxed">
          Choose a chat from the left sidebar to start messaging. Your
          conversations will appear here.
        </p>

       
      </div>
    </div>
  );
}
