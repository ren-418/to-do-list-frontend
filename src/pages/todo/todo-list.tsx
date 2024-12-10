import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import { restApi } from "../../context/http-request";
import { showToast,getCaseSensitive } from "../../context/helper";

import Layout from "../../components/layout/layout";
import Breadcrumb from "../../components/breadcrumb";
import Loading from "../../components/loading";
import Icon from "../../components/icon";


const TodoList = () => {
  const [state, {dispatch}]: GlobalContextType = useGlobalContext();

  const [status, setStatus] = React.useState<{
    isLoading: boolean;
    taskList: TaskItem[];
  }>({
    isLoading: false,
    taskList: state.userData.taskList,
  });

  const navigate = useNavigate();
  useEffect(() => {
    setStatus({
      isLoading: false,
      taskList: state.userData.taskList,
    });
  }, [state]);


  const handleDelete = async (id: string) => {
    // delete item by id
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const res = await restApi.postRequest("todo/delete", { id: id });
      
      if (!!res.deletedItem) {
        showToast("Successfully deleted task", "success");
        dispatch({ type: "updated", payload: !state.updated });
        navigate("/");
      } else {
        showToast("Delete Failed", "error");
      }
    } else {
      showToast("Delete action canceled", "info");
    }
  };
  return (
    <Layout>
      <Breadcrumb page="" />
      {status.isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full text-center text-2xl text-black dark:text-white">
            {getCaseSensitive(state.userData.username)}'s to do List
          </div>
          <div className="mt-2 pb-3 sm:mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex items-center justify-end mb-4 p-5">
              
              <Link
                to="/create"
                className="flex justify-center gap-3 items-center rounded-md px-5 py-3 text-center font-medium bg-green-700 text-white hover:bg-opacity-90"
              >
                Create New Task
              </Link>
            </div>
            {status.taskList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        No
                    </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-boxdark border-stroke dark:border-strokedark divide-y divide-gray-200">
                    {status.taskList.map((item,key) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {key+1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm  ${item.status=="Pending"?"text-orange-500 ":"text-green-500"}`}>
                          {item.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.priority}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.due_date
                            ? new Date(item.due_date).toLocaleDateString()
                            : "Not defined."}
                        </td>
                        <td className=" flex px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Link
                            to={`/detail/${item.id}`}
                            className="text-blue-600 flex  hover:text-blue-900"
                          >
                            <Icon icon="Edit" />
                          </Link>
                          <button className="ml-4 flex  text-red-600 hover:text-red-900" onClick={() => handleDelete(item.id)}>
                            <Icon icon="Delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No tasks available.
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TodoList;


