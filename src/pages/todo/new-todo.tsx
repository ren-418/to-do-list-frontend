import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context';
import { restApi } from '../../context/http-request';
import Breadcrumb from '../../components/breadcrumb';
import { Input, Select } from '../../components/input';
import Layout from '../../components/layout/layout';
import Loader from '../../components/loader';
import DatePicker from '../../components/date-picker';
import Icon from '../../components/icon';
import { apiNotification } from '../../services';

const PRIORITY = ["Low", "Middle", "High"]

const NewTodo = () => {
    const navigate = useNavigate()
    const [state, { dispatch }]: GlobalContextType = useGlobalContext()
    const [status, setStatus] = React.useState({
        title: "",
        content: "",
        priority: "LOW",
        endDate: 0,
        tags: ["General"],
        tag: ""
    } as {
        title: string
        content: string
        priority: string
        endDate: number,
        tags: string[]
        tag: string
    })

    const [isAddTag, setAddTag] = React.useState(false)

    const onSend = async () => {

        dispatch({ type: "loading", payload: true })
        const res = await restApi.postRequest("create-task", status)



        dispatch({ type: "loading", payload: false });
    }

    const onInput = (e: any, type: string) => {
        const value = e.target.value
        setStatus({ ...status, [type]: value });
    }

    const onChangeDate = (value: Date) => {
        const timestamp = value.getTime()
        setStatus({ ...status, endDate: timestamp })
    }

    const onChangePriority = (v: string) => {
        setStatus({ ...status, priority: v })
    }

    const onAddTag = async () => {
        try {
            const res = await restApi.postRequest("add-tag", { tag: status.tag })
            if (res.message === "success") {
                setStatus({ ...status, tags: res.data })
            }
        } catch (error) {
            apiNotification(error)
        }
    }

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'cyan', 'lime', 'magenta', 'teal', 'indigo', 'gold', 'silver', 'navy', 'olive', 'coral', 'violet', 'aqua'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
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
                                <label className="mb-3 block text-md font-medium text-black dark:text-white" >Task Title</label>
                                <Input value={status.title} type="title" onInput={onInput} placeholder="Enter task title" />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    value={status.content}
                                    onChange={e => setStatus({ ...status, content: e.target.value })}
                                    rows={6}
                                    placeholder="Enter task description"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-full'>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Due To
                                    </label>
                                    <DatePicker onChangeDate={onChangeDate} />
                                </div>
                                <div className='w-full'>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Priority
                                    </label>
                                    <Select value={status.priority} onChange={onChangePriority} data={PRIORITY} />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Tags
                                </label>
                                {status.tags.map((i, k) => (
                                    <div key={k} className={`flex gap-2 w-24 items-center justify-center text-[${randomColor}] bg-[${randomColor}] bg-opacity-30 p-2 rounded-full text-sm`}>{i}</div>
                                ))}
                                <button onClick={() => setAddTag(!isAddTag)} className='flex gap-2 w-24 items-center justify-center text-warning bg-warning bg-opacity-30 p-2 rounded-full text-sm'><Icon icon="Plus" /> Add Tag</button>
                            </div>
                        </div>

                        {isAddTag && (
                            <div className='flex flex-row gap-2'>
                                <Input value={status.tag} type="tag" onInput={onInput} placeholder="Enter new tag name" />
                                <button onClick={onAddTag} className={`flex justify-center gap-3 items-center rounded border text-green-700 border-green-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90 cursor-pointer`}>
                                    Add
                                </button>
                            </div>
                        )}

                        <div className="flex justify-end gap-4.5 flex-col-reverse sm:flex-row">
                            <Link to="/" className="flex justify-center rounded py-2 px-6 font-medium hover:shadow-1 border text-red-500 border-red-500">
                                Cancel
                            </Link>

                            <button onClick={onAddTag} disabled={state.loading ? true : false} className={`flex justify-center gap-3 items-center rounded bg-green-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${state.loading ? 'cursor-not-allowed' : 'cursor-pointer'} `}>
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
