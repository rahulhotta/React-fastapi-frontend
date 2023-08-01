import React, { useState, useEffect } from "react";
import "./FormComponent.css";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

function FormComponent(props) {
  const [employeeDetails, setEmployeeDetails] = useState({
    empId: 0,
    empName: "",
    empDOJ: "",
    empProject: "",
    // empPhoto: "",
  });

  const validateForm = () => {
    if (
      employeeDetails.empName === "" &&
      employeeDetails.empDOJ === "" &&
      employeeDetails.empProject === "" &&
      employeeDetails.empPhoto === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    validateForm();
  }, [employeeDetails]);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEmp = {
      empId: new Date().getTime().toString(),
      empName: employeeDetails.empName,
      empDOJ: employeeDetails.empDOJ,
      empProject: employeeDetails.empProject,
      // empPhoto: employeeDetails.empPhoto,
    };
    console.log(employeeDetails);
    props.addEmployeeToList(newEmp);
    setEmployeeDetails({
      empId: "",
      empName: "",
      empDOJ: "",
      empProject: "",
      // empPhoto: "",
    });
    props.handleDrawerToggle();
  };
  return (
    <div>
      <form className="employee-form" onSubmit={handleFormSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setEmployeeDetails((prev) => {
              return {
                ...prev,
                empName: e.target.value,
              };
            });
          }}
          value={employeeDetails.empName}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="date"
          placeholder="D.O.J"
          onChange={(e) => {
            setEmployeeDetails((prev) => {
              return {
                ...prev,
                empDOJ: e.target.value,
              };
            });
          }}
          value={employeeDetails.empDOJ}
        />
        {/* <DateField label="D.O.J" /> */}
        <TextField
          id="outlined-basic"
          label="Project"
          variant="outlined"
          onChange={(e) => {
            setEmployeeDetails((prev) => {
              return {
                ...prev,
                empProject: e.target.value,
              };
            });
          }}
          value={employeeDetails.empProject}
        />

        <div className="drawer__buttons__container">
          <button
            onClick={(e) => {
              e.preventDefault();
              props.handleDrawerToggle();
            }}
            className="drawer__form__button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="drawer__form__button"
            disabled={!validateForm()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
