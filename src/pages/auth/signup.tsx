import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context';
import { emailValidator, passwordMatch, showToast, strongPasswordValidator } from '../../context/helper';
import Icon from '../../components/icon';
import { restApi } from '../../context/http-request';
import Loader from '../../components/loader';
import { apiNotification } from '../../services';

interface SignUpType {
    email: string,
    fullName: string
    password: string,
    confPassword: string,
    isValidName: {
        msg: string,
        status: boolean
    },
    isValidEmail: {
        msg: string,
        status: boolean
    },
    isStrongPassword: {
        msg: string,
        status: boolean
    },
    isMatch: {
        msg: string,
        status: boolean
    }
    isLoading: boolean
}
const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const [state, { dispatch }]: GlobalContextType = useGlobalContext()

    const [status, setStatus] = React.useState({
        email: "apple@gmail.com",
        fullName: "Apple",
        password: "1q1q!Q!Q",
        confPassword: "1q1q!Q!Q",
        isValidName: {
            msg: "",
            status: false
        },
        isValidEmail: {
            msg: "",
            status: false
        },
        isStrongPassword: {
            msg: "",
            status: false
        },
        isMatch: {
            msg: "",
            status: false
        },
        isLoading: false
    } as SignUpType)

    const onInput = (e: any, k: string, v: string) => {
        const value = e.target.value

        const validation = () => {
            if (k === "fullName") {
                if (!v) {
                    return { status: false, msg: 'Name is required!' }
                }
                return { status: true, msg: '' }
            }
            if (k === "email") {
                return emailValidator(value)
            }
            if (k === 'password') {
                return strongPasswordValidator(value)
            }
            if (k === "confPassword") {
                return passwordMatch(value, status.password)
            }
        }
        setStatus({ ...status, [k]: value, [v]: validation() })
    }

    const onSignUp = async () => {

        if (status.fullName === "") {
            return setStatus({ ...status, isValidName: { status: false, msg: "Name is required!" } })
        }
        if (status.email === "") {
            return setStatus({ ...status, isValidEmail: { status: false, msg: "Email is required!" } })
        }
        if (status.password === "") {
            return setStatus({ ...status, isStrongPassword: { status: false, msg: "Password is required!" } })
        }
        // if (status.isValidEmail.status && status.isMatch.status && status.isStrongPassword.status && status.isValidName.status) {
        dispatch({ type: 'loading', payload: true })
        try {
            const res = await restApi.postRequest("signup", { fullName: status.fullName, email: status.email, password: status.password })
            console.log(res)
            if (res.message === "success") {
                showToast("Registration Successful! ", "success")
                navigate("/auth/signin")
                dispatch({ type: 'loading', payload: false })
                return
            }
        } catch (error: any) {
            apiNotification(error)
        }
        dispatch({ type: 'loading', payload: false })
        // }
    }

    return (
        <div className='bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-[100vh] flex justify-center items-center'>
            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[100%] lg:w-[70%] h-[70%]">
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <span className="inline-block">
                                <Icon icon="Login" />
                            </span>
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-15">
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={status.fullName}
                                        onChange={e => onInput(e, "fullName", "isValidName")}
                                        placeholder="Enter your full name"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute left-4 top-5">
                                        <Icon icon='User' />
                                    </span>
                                    {!status.isValidName.status ? <div className="text-red-500">{status.isValidName.msg}</div> : <></>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={status.email}
                                        onChange={e => onInput(e, "email", "isValidEmail")}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute left-4 top-5">
                                        <Icon icon="Email" />
                                    </span>
                                    {!status.isValidEmail.status ? <div className="text-red-500">{status.isValidEmail.msg}</div> : <></>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={status.password}
                                        onChange={e => onInput(e, "password", "isStrongPassword")}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute left-4 top-5">
                                        <Icon icon="Password" />
                                    </span>
                                    {!status.isStrongPassword.status ? <div className="text-red-500">{status.isStrongPassword.msg}</div> : <></>}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Conform Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={status.confPassword}
                                        onChange={e => onInput(e, "confPassword", "isMatch")}
                                        placeholder="Conform your password"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute left-4 top-5">
                                        <Icon icon="Password" />
                                    </span>
                                    {!status.isMatch.status ? <div className="text-red-500">{status.isMatch.msg}</div> : <></>}
                                </div>
                            </div>

                            <div className="">
                                <button
                                    onClick={onSignUp}
                                    className="flex flex-row gap-4 justify-center items-center w-full cursor-pointer rounded-lg border border-blue-600 bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                                >
                                    {state.loading && <Loader />}<div>Sign Up</div>
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p>
                                    Already have an user?{' '}
                                    <Link to="/auth/signin" className="text-primary">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
