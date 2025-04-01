import { FaHistory, FaCog, FaPlus, FaChevronLeft, FaChevronRight,FaRegLightbulb } from "react-icons/fa";

const Sidebar = ({ chatHistory, setMessages, isDarkMode, toggleDarkMode, isCollapsed, toggleCollapse }) => {
  return (
    <div
      className={`w-1/4 p-4 flex flex-col space-y-4 transition-all duration-300 bg-gray-800 text-white ${isDarkMode ? "bg-gray-800 text-white" : "bg-opacity-30 bg-white  text-black"} ${isCollapsed ? "w-16" : "w-1/4"}`}
    >
      {/* Collapse Button */}
      <button
        onClick={toggleCollapse}
        className="absolute top-4 right-0 bg-gray-500 hover:bg-gray-600 p-2 rounded-full"
      >
        {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
      </button>

      {/* New Chat Button */}
      {!isCollapsed && (
        <button
          onClick={() => setMessages([])}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 p-3 rounded-lg"
        >
          <FaPlus size={18} /> <span className="ml-2">New Chat</span>
        </button>
      )}

      {/* Chat History */}
      {!isCollapsed && (
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <FaHistory className="mr-2" /> Chat History
          </h2>
          <ul className="h-60 overflow-y-auto bg-gray-700 bg-opacity-60 p-2 rounded-lg">
            {chatHistory.map((session, index) => (
              <li
                key={index}
                className="text-sm text-gray-300 py-1 cursor-pointer hover:bg-white hover:bg-opacity-30 p-1 rounded-md"
                onClick={() => setMessages(chatHistory[index] || [])}
              >
                Chat {index + 1}: {session.length} messages
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Change Mode Button */}
      {!isCollapsed && (
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 p-3 rounded-lg"
        >
          <FaRegLightbulb size={18} /> <span className="ml-2">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
