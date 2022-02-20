import react, { useEffect, useState } from "react";
import { axiosInstance } from "../../common/api";

import "datatables/media//js/jquery.dataTables.min.js";
import "datatables/media/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";

export default function Employee() {
  const [employeeList, setEmployeeList] = useState([]);
  const fetchEmployeeData = async () => {
    const response = await axiosInstance.get("/employee");
    if (response && response?.data) {
      setEmployeeList(response?.data);
      $(document).ready(function () {
        $("#employeeTable").DataTable();
      });
    }
  };
  const deleteEmployee = async (id) => {
    await axiosInstance.delete(`/employee/${id}`);
    fetchEmployeeData();
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  return (
    <div className="container-fluid mt-3">
      <table id="employeeTable" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee?.id}>
              <td>{employee?.employeeFirstName}</td>
              <td>{employee?.employeeSecondName}</td>
              <td>{new Date(employee?.employeeDob).toDateString()}</td>
              <td>{employee?.employeeSalary}</td>
              <td>{employee?.department?.departmentName}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: `/add-employee/${employee?.id}`,
                      state: { employee },
                    }}
                  >
                    Edit
                  </Link>
                </button>{" "}
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
