import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { axiosInstance } from "../../common/api";
import Error from "../../common/Error";

type FormValues = {
  departmentName: string;
  departmentDetails: string;
};
const addDepartmentSchema = yup.object().shape({
  departmentName: yup.string().required("Department name is required"),
  departmentDetails: yup.string().required("Department detail is require"),
});
export default function AddDepartment() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addDepartmentSchema),
    defaultValues: {},
  });
  const postDepartmentData = async (departmentData: FormValues) => {
    const departmentId = await axiosInstance.post(
      "/department",
      departmentData
    );
    if (departmentId) return true;
    return false;
  };
  const onSubmit = async (departmentData: FormValues) => {
    const isSubmitted = await postDepartmentData(departmentData);
    setSubmitted(isSubmitted);
  };
  return (
    <form
      className="container-fluid"
      style={{ width: "80%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group mt-3">
        <label>Department Name</label>
        <input
          type="text"
          {...register("departmentName")}
          className="form-control"
          id="firstName"
          placeholder="Department Name"
        />
        <Error errorMessage={errors?.departmentName?.message} />
      </div>
      <div className="form-group mt-3">
        <label>Department Details</label>
        <input
          type="text"
          {...register("departmentDetails")}
          className="form-control"
          id="lastName"
          placeholder="Department Details"
        />
        <Error errorMessage={errors?.departmentDetails?.message} />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {submitted ? <span> Submitted successfully</span> : <span></span>}
    </form>
  );
}
