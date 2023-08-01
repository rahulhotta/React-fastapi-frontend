import React, {useContext} from "react";
import EmpCard from "../EmpCard/EmpCard";
import "./EmpList.css";
import { EmpContext } from "../../App";
function EmpList(props) {
    const employee = useContext(EmpContext);
    const {employeeData, setEmployeeData} = employee
  return (
    <div className="empList__container">
      {employeeData.length === 0 ? (
        <h1>You dont have any Data</h1>
      ) : (
        employeeData.map((item) => {
          return <EmpCard key={item.empId} item={item} />;
        })
      )}
      {/* {props.taskList.map((item)=>{
            return (
                <TaskCard key={item.taskId} task={item}/>
            )
        })} */}
    </div>
  );
}

export default EmpList;