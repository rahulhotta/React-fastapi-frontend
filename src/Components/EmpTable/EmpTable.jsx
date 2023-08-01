import React, { useContext, useState } from "react";
import "./EmpTable.css";
import { EmpContext } from "../../App";
import Modal from "@mui/material/Modal";
import Button from "../UI/Button";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

function EmpTable() {
  const employee = useContext(EmpContext);
  const { employeeData, deleteTaskFromList, editTaskInList } = employee;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "rgb(196, 223, 223)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "black",
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedEmpData, setUpdatedEmpData] = useState({
    empId: "",
    empName: "",
    empDOJ: "",
    empProject: "",
    empPhoto: "",
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Function to delete task on double click
  const editClickHandler = (emp) => {
    setUpdatedEmpData({
      empId: emp.empId,
      empName: emp.empName,
      empDOJ: emp.empDOJ,
      empProject: emp.empProject,
      empPhoto: emp.empPhoto,
    });
    handleModalOpen();
  };
  const updateHandler = (e) => {
    e.preventDefault();
    let updatedData = {
      empId: updatedEmpData.empId,
      empName: updatedEmpData.empName,
      empDOJ: updatedEmpData.empDOJ,
      empProject: updatedEmpData.empProject,
      empPhoto: updatedEmpData.empPhoto,
    };
    editTaskInList(updatedEmpData.empId, updatedData);
    handleModalClose();
  };
  return (
    <div className="empTable__container">
      {employeeData.length === 0 ? (
        <h1> You dont have any data </h1>
      ) : (
        <table>
          <tr>
            <th>Name</th>
            <th>D.O.J</th>
            <th>project</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {employeeData.map((emp) => {
            return (
              <tr>
                <td>{emp.empName}</td>
                <td>{emp.empDOJ}</td>
                <td>{emp.empProject}</td>
                <td>
                  <Button
                    onClick={() => {
                      editClickHandler(emp);
                    }}
                  >
                    <BsPencilSquare />
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      console.log("Clicked in empCard");
                      deleteTaskFromList(emp.empId);
                    }}
                  >
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      )}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="employee-form" onSubmit={updateHandler}>
            <TextField
              id="outlined-basic"
              label="Id"
              variant="outlined"
              onChange={(e) => {
                setUpdatedEmpData((prev) => {
                  return {
                    ...prev,
                    empId: e.target.value,
                  };
                });
              }}
              value={updatedEmpData.empId}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => {
                setUpdatedEmpData((prev) => {
                  return {
                    ...prev,
                    empName: e.target.value,
                  };
                });
              }}
              value={updatedEmpData.empName}
            />
            <TextField
              id="outlined-basic"
              type="date"
              variant="outlined"
              onChange={(e) => {
                setUpdatedEmpData((prev) => {
                  return {
                    ...prev,
                    empDOJ: e.target.value,
                  };
                });
              }}
              value={updatedEmpData.empDOJ}
            />
            <TextField
              id="outlined-basic"
              label="Project"
              variant="outlined"
              onChange={(e) => {
                setUpdatedEmpData((prev) => {
                  return {
                    ...prev,
                    empProject: e.target.value,
                  };
                });
              }}
              value={updatedEmpData.empProject}
            />
            
            <div className="drawer__buttons__container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleModalClose();
                }}
                className="drawer__form__button"
              >
                Cancel
              </button>
              <button type="submit" className="drawer__form__button">
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default EmpTable;
