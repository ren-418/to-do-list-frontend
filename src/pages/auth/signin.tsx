import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import { restApi } from "../../context/http-request";
import { emailValidator, showToast, strongPasswordValidator } from "../../context/helper";
import Icon from "../../components/icon";
import Loader from "../../components/loader";
import { apiNotification } from "../../services";
import { ValidateError } from "../../services/customError";

interface LoginTypes {
  email: string,
  password: string,
  isValidEmail: {
    msg: string,
    status: boolean
  },
  isStrongPassword: {
    msg: string,
    status: boolean
  },
  isView: boolean
  isLoading: boolean
}

const SignIn = () => {
  const navigate = useNavigate()
  const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext()
  const [status, setStatus] = React.useState({
    email: "apple@gmail.com",
    password: "1q1q!Q!Q",
    isValidEmail: {
      msg: "",
      status: false
    },
    isStrongPassword: {
      msg: "",
      status: false
    },
    isView: false,
    isLoading: false
  } as LoginTypes)
  const onInput = (e: any, k: string, v: string) => {
    const value = e.target.value

    const validation = () => {
      if (k === "email") {
        return emailValidator(value)
      }
      if (k === 'password') {
        return strongPasswordValidator(value)
      }
    }
    setStatus({ ...status, [k]: value, [v]: validation() })
  }

  const onSignin = async () => {
    if (status.email === "") {
      return setStatus({ ...status, isValidEmail: { status: false, msg: "Email is required!" } })
    }
    if (status.password === "") {
      return setStatus({ ...status, isStrongPassword: { status: false, msg: "Password is required!" } })
    }
    dispatch({ type: 'loading', payload: true })

    try {
      const res = await restApi.postRequest("login", { email: status.email, password: status.password })
      if (typeof res?.token !== "string") {
        throw new ValidateError("Login Failed!");
      }
      dispatch({ type: "authToken", payload: res.token });
      setStore(res.token)
      showToast("You have successfully logged in.", "success")
      navigate("/")
    } catch (error) {
      apiNotification(error)
    }

    dispatch({ type: 'loading', payload: false })
  }

  return (
    <div className='Pg-white shadow-default dark:border-strokedark dark:bg-boxdark h-[100vh] flex justify-center items-center'>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[100%] lg:w-[70%]">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <div className="mb-5.5 inline-block">
              </div>
              <span className="inline-block">
                <Icon icon="Login" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <label className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Todo Book
              </label>

              <div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-5">
                      <Icon icon="Email" />
                    </span>
                    <input
                      value={status.email}
                      onChange={e => onInput(e, "email", "isValidEmail")}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {!status.isValidEmail.status ? <div className="text-red-500">{status.isValidEmail.msg}</div> : <></>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={!status.isView ? "password" : "text"}
                      value={status.password}
                      onChange={e => onInput(e, "password", "isStrongPassword")}
                      placeholder="Enter your Password!"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute left-4 top-4"><Icon icon="Password" /></span>
                    <span onClick={() => setStatus({ ...status, isView: !status.isView })} className="absolute right-4 top-5">
                      <Icon icon={status.isView ? "View" : "EyeOff"} />
                    </span>
                  </div>
                  {!status.isStrongPassword.status ? <div className="text-red-500">{status.isStrongPassword.msg}</div> : <></>}
                </div>

                <div className="pt-5">
                  <button
                    onClick={onSignin}
                    className="flex flex-row gap-4 justify-center items-center w-full cursor-pointer rounded-lg border border-blue-600 bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                  >
                    {state.loading && <Loader />}<div>Sign in</div>
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Don't have account?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    Sign up
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

export default SignIn;
