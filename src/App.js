import StudentLogin from "./studentlogin";

function App() {
  return <StudentLogin />;
}

/*export default App;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/some-endpoint") // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white text-3xl font-bold">
      {data ? JSON.stringify(data) : "Fetching Data..."}
    </div>
  );
}

export default App;
*/