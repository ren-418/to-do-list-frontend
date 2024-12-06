import React from "react";

import Layout from "../../components/layout/layout";
import Breadcrumb from "../../components/breadcrumb";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import Icon from "../../components/icon";

const TodoList = () => {

    const [status, setStatus] = React.useState({
        isLoading: false
    })

    return (
        <Layout>
            <Breadcrumb page="" />
            {status.isLoading ? <Loading /> : (
                <div>
                    <div className='w-full text-center text-2xl text-black dark:text-white'>Todo List</div>
                    <div className="mt-2 sm:mt-4 rounded-sm border border-stroke flex flex-col gap-3 bg-white px-3 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className='flex items-center justify-end'>
                            <Link
                                to="/create"
                                className="flex justify-center gap-3 items-center rounded-md px-5 py-3 text-center font-medium bg-green-700 text-white hover:bg-opacity-90"
                            >
                                Create New Task
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default TodoList