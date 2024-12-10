import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import { showToast } from "../../context/helper";
import { restApi } from "../../context/http-request";

import Breadcrumb from "../../components/breadcrumb";
import { Input, Select } from "../../components/input";
import Layout from "../../components/layout/layout";
import Loader from "../../components/loader";
import DatePicker from "../../components/date-picker";

const PRIORITY = ["Low", "Middle", "High"];

const NewTodo = () => {
  const navigate = useNavigate();
  const [state, { dispatch }]: GlobalContextType = useGlobalContext();
  const [status, setStatus] = React.useState({
    title: "",
    description: "",
    priority: "LOW",
    due_date: null,
    isValidTitle: {
      msg: "",
      status: false,
    },
    isValidDesc: {
      msg: "",
      status: false,
    },
  } as {
    title: string;
    description: string;
    priority: string;
    due_date: Date | null;
    isValidTitle: {
      msg: string;
      status: boolean;
    };
    isValidDesc: {
      msg: string;
      status: boolean;
    };
  });

  const onSend = async () => {
    // update if input values are valid
    if (status.isValidTitle.status && status.isValidDesc.status) {
      dispatch({ type: "loading", payload: true });
      const res = await restApi.postRequest("todo/create", status);
      if (!!res.item) {
        showToast("Successfully added one task ", "success");
        dispatch({ type: "loading", payload: false });
        dispatch({ type: "updated", payload: !state.updated });
        navigate("/");
      } else {
        showToast(" Create failed", "error");
      }
    } else {
      showToast("Please ensure all fields are valid.", "warning");
    }
  };

  const onChangeDate = (value: Date) => {
    setStatus({ ...status, due_date: value });
  };

  const onChangePriority = (v: string) => {
    setStatus({ ...status, priority: v });
  };

  const onInput = (e: any, type: string, vaildkey: string) => {
    const value = e.target.value;
    const validVal = validateTask(type, value);
    setStatus({ ...status, [type]: value, [vaildkey]: validVal });
  };

  const validateTask = (k: string, val: string) => {
    if (k === "title") {
      if (!val) {
        return { status: false, msg: "Title is required." };
      } else if (val.length < 3) {
        return {
          status: false,
          msg: "Title must be at least 3 characters long.",
        };
      } else if (val.length > 50) {
        return { status: false, msg: "Title must not exceed 50 characters." };
      } else {
        return { status: true, msg: "" };
      }
    }

    if (k === "description") {
      if (!val) {
        return { status: false, msg: "Description is required." };
      } else if (val.length < 5) {
        return {
          status: false,
          msg: "Description must be at least 5 characters long.",
        };
      } else if (val.length > 200) {
        return {
          status: false,
          msg: "Description must not exceed 200 characters.",
        };
      } else {
        return { status: true, msg: "" };
      }
    }

    return { status: true, msg: "" };
  };

  return (
    <Layout>
      <div className="mx-auto max-w-270">
        <Breadcrumb page="new" />
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-4 md:px-7 dark:border-strokedark">
              <label className=" text-black dark:text-white text-lg font-bold">
                Create New Task
              </label>
            </div>
            <div className="p-4 md:p-7 flex flex-col gap-4">
              <div>
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Task Title
                </label>
                <Input
                  value={status.title}
                  type="title"
                  onInput={(e: any) => onInput(e, "title", "isValidTitle")}
                  placeholder="Enter task title"
                />
                {!status.isValidTitle.status ? (
                  <div className="text-red-500">{status.isValidTitle.msg}</div>
                ) : (
                  <></>
                )}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  value={status.description}
                  onChange={(e) => onInput(e, "description", "isValidDesc")}
                  rows={6}
                  placeholder="Enter task description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {!status.isValidDesc.status ? (
                  <div className="text-red-500">{status.isValidDesc.msg}</div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    Due To(optional)
                  </label>
                  <DatePicker onChangeDate={onChangeDate} />
                </div>
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    Priority
                  </label>
                  <Select
                    value={status.priority}
                    onChange={onChangePriority}
                    data={PRIORITY}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4.5 p-5 flex-col-reverse sm:flex-row">
              <Link
                to="/"
                className="flex justify-center rounded py-2 px-6 font-medium hover:shadow-1 border text-red-500 border-red-500"
              >
                Cancel
              </Link>

              <button
                onClick={onSend}
                disabled={state.loading ? true : false}
                className={`flex justify-center gap-3 items-center rounded bg-green-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${state.loading ? "cursor-not-allowed" : "cursor-pointer"} `}
              >
                {state.loading && <Loader />}
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewTodo;
