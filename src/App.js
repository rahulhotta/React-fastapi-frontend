import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import GraphPage from "./Components/GraphPage/GraphPage";
import CardPage from "./Components/CardPage/CardPage";
import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
export const EmpContext = createContext();
function App() {
  const [employeeData, setEmployeeData] = useState([]);
  // Function to delete tasks from existing list
  const getEmployeeFromDb = () => {
    axios.get("http://localhost:8000/view-all-students").then((res) => {
      setEmployeeData(res.data);
    });
  };

  async function addEmployeeToList(emp) {
    await axios.post("http://localhost:8000/add-student", emp);
    await getEmployeeFromDb();
  }

  async function deleteTaskFromList(taskId) {
    // console.log("Deleted a emp");
    // const updatedList = employeeData.filter((item) => item.empId !== taskId);
    // setEmployeeData(updatedList);
    await axios.delete(`http://localhost:8000/delete-student/${taskId}`);
    await getEmployeeFromDb();
  }

  // Function to edit tasks in existing list
  async function editTaskInList(taskId, updatedTask) {
    // const updatedList = employeeData.map((item) => {
    //   if (item.empId === taskId) {
    //     return updatedTask;
    //   }
    //   return item;
    // });
    // setEmployeeData(updatedList);
    await axios.put(
      `http://localhost:8000/update-student/${taskId}`,
      updatedTask
    );
    await getEmployeeFromDb();
  }

  useEffect(() => {
    getEmployeeFromDb();
  }, []);

  return (
    <div className="App">
      <>
          <NavBar
            setEmployeeData={setEmployeeData}
          />
          <EmpContext.Provider
            value={{
              employeeData,
              setEmployeeData,
              addEmployeeToList,
              deleteTaskFromList,
              editTaskInList,
            }}
          >
            <NavBar
              setEmployeeData={setEmployeeData}
              addEmployeeToList={addEmployeeToList}
            />
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route path="graph" element={<GraphPage />} />
              <Route path="cards" element={<CardPage />} />
            </Routes>
          </EmpContext.Provider>
        </>

      {/* {!isLoggedIn ? (
        <LoginPage
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <>
          <NavBar
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            setEmployeeData={setEmployeeData}
          />
          <EmpContext.Provider
            value={{
              employeeData,
              setEmployeeData,
              addEmployeeToList,
              deleteTaskFromList,
              editTaskInList,
            }}
          >
            <NavBar
              currentUser={currentUser}
              setIsLoggedIn={setIsLoggedIn}
              setEmployeeData={setEmployeeData}
              addEmployeeToList={addEmployeeToList}
            />
            <Routes>
              <Route
                path="/"
                element={<HomePage currentUser={currentUser} />}
              />
              <Route path="graph" element={<GraphPage />} />
              <Route path="cards" element={<CardPage />} />
            </Routes>
          </EmpContext.Provider>
        </>
      )} */}
    </div>
  );
}

export default App;
