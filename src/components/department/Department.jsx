import react, { useEffect, useState } from "react";
import "datatables/media//js/jquery.dataTables.min.js";
import "datatables/media/css/jquery.dataTables.min.css";
import $ from "jquery";
import { axiosInstance } from "../../common/api";
import { string } from "yup/lib/locale";

export default function Department() {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState({
    departmentName: null,
    departmentDetails: null,
  });
  const fetchDepartmentData = async () => {
    const response = await axiosInstance.get("/department");
    if (response && response?.data) {
      setDepartmentList(response?.data);
      $(document).ready(function () {
        $("#departmentTable").DataTable();
      });
    }
  };
  const deleteDepartment = async (id) => {
    await axiosInstance.delete(`/department/${id}`);
    fetchDepartmentData();
  };
  const addDepartment = async () => {
    if (department.departmentName && department.departmentDetails) {
      const departmentData = await axiosInstance.post(
        "/department",
        department
      );
      fetchDepartmentData();
    }
    setDepartment({
      departmentName: null,
      departmentDetails: null,
    });
  };
  useEffect(() => {
    fetchDepartmentData();
  }, []);
  return (
    <div className="container-fluid mt-3">
      <table id="departmentTable" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Department Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departmentList.map((department) => (
            <tr key={department?.id}>
              <td>{department?.departmentName}</td>
              <td>{department?.departmentDetails}</td>
              <td>
                <button
                  onClick={() => deleteDepartment(department?.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              <div className="input-group">
                <input
                  type="text"
                  value={department.departmentName}
                  onChange={(event) =>
                    setDepartment({
                      ...department,
                      departmentName: event.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Department Name"
                />
              </div>
            </th>
            <th>
              <div className="input-group">
                <input
                  type="text"
                  value={department.departmentDetails}
                  onChange={(event) =>
                    setDepartment({
                      ...department,
                      departmentDetails: event.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Department Details"
                />
              </div>
            </th>
            <th>
              <button
                onClick={() => addDepartment()}
                type="button"
                className="btn btn-success"
              >
                Add
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
