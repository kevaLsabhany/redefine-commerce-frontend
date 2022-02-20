import react, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../common/api";
import { useLocation } from "react-router-dom";
import Error from "../../common/Error";

type FormValues = {
  employeeFirstName: string;
  employeeSecondName: string;
  employeeDob: string;
  employeeSalary: number;
  departmentId: number;
};

const addEmployeeSchema = yup.object().shape({
  employeeFirstName: yup.string().required("First name is Required"),
  employeeSecondName: yup.string().required("Last name is Required"),
  employeeDob: yup.string().required("DOB is required"),
  employeeSalary: yup.string().required("Salary is Required"),
});

export default function AddEmployee() {
  const [departmentList, setDepartmentList] = useState<any>([]);
  const [submitted, setSubmitted] = useState(false);
  const { state } = useLocation<any>();
  const fetchDepartmentData = async () => {
    const response = await axiosInstance.get("/department");
    if (response && response?.data) {
      setDepartmentList(response.data);
    }
  };
  const postEmployeeData = async (employeeData: FormValues) => {
    const employeeId = await axiosInstance.post("/employee", employeeData);
    if (employeeId) return true;
    return false;
  };
  const updateEmployeeData = async (employeeData: FormValues) => {
    console.log(state?.employee?.department?.id);
    const employee = await axiosInstance.put(
      `/employee/${state?.employee?.id}`,
      employeeData
    );
    if (employee) return employee;
    return null;
  };

  useEffect(() => {
    fetchDepartmentData();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addEmployeeSchema),
    defaultValues: state?.employee
      ? {
          employeeFirstName: state?.employee?.employeeFirstName as string,
          employeeSecondName: state?.employee?.employeeSecondName as string,
          employeeDob: new Date(state?.employee?.employeeDob)
            .toISOString()
            .slice(0, 10) as string,
          employeeSalary: state?.employee?.employeeSalary as number,
          departmentId: state?.employee?.department?.id as number,
        }
      : { departmentId: departmentList.length !== 0 && departmentList[0]?.id },
  });
  const onSubmit = async (employeeData: FormValues) => {
    let isSubmitted = null;
    if (state?.employee) {
      isSubmitted = await updateEmployeeData(employeeData);
    } else {
      isSubmitted = await postEmployeeData(employeeData);
    }
    setSubmitted(isSubmitted as boolean);
  };
  return (
    <form
      className="container-fluid"
      style={{ width: "80%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group mt-3">
        <label>First Name</label>
        <input
          type="text"
          {...register("employeeFirstName")}
          className="form-control"
          placeholder="Enter First Name"
        />
        <Error errorMessage={errors?.employeeFirstName?.message} />
      </div>
      <div className="form-group mt-3">
        <label>Last Name</label>
        <input
          type="text"
          {...register("employeeSecondName")}
          className="form-control"
          placeholder="Enter Last Name"
        />
        <Error errorMessage={errors?.employeeSecondName?.message} />
      </div>
      <div className="form-group mt-3">
        <label>DOB</label>
        <input
          type="date"
          {...register("employeeDob")}
          className="form-control"
          placeholder="Enter Date Of Birth"
        />
        <Error errorMessage={errors?.employeeDob?.message} />
      </div>
      <div className="form-group mt-3">
        <label>Salary</label>
        <input
          type="number"
          {...register("employeeSalary")}
          className="form-control"
          id="employeeSalary"
          placeholder="Enter Salary"
        />
        <Error errorMessage={errors?.employeeSalary?.message} />
      </div>
      <div className="dropdown">
        <label>Select Department</label>
        <div>
          <select
            className="dropdown btn btn-secondary dropdown-toggle mb-3"
            {...register("departmentId")}
          >
            {departmentList &&
              departmentList.map((department: any) => (
                <option
                  key={department.id}
                  value={department?.id}
                  selected={department?.id === state?.employee?.department?.id}
                >
                  {department?.departmentName}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {submitted ? <span> Submitted successfully</span> : null}
    </form>
  );
}
