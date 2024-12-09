import React, { useEffect } from 'react';
import { useReducer, useMemo } from "react";
import { createContext, useContext } from "react";

import { restApi } from './http-request';
import { ValidateError } from '../services/customError';
import config from '../config/config';

const INIT_STATE: InitStateObject = {
    loading: false,
    authToken: "",
    updated:false,
    userData: {
        email: "",
        username: "",
        taskList:[]
    }
}


const GlobalContext = createContext<any>({});
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => {
    return { ...state, [type]: payload };
}


function useGlobalContext() {
    return useContext(GlobalContext);
}

// setAuthToken to localstorage Start
const getStore = async (): Promise<string> => {

    try {
        const appKey = config.APPKEY + '-config';
        const authToken = localStorage.getItem(`${appKey}_authToken`);
        if (typeof authToken === 'string' && !!authToken) {
            return authToken;

        } else {
            throw new Error("Type Error!");
        }
    } catch (err) {
        return '';
    }
}

const setStore = async (authToken: string) => {
    try {
        const appKey = config.APPKEY + '-config';
        await localStorage.setItem(`${appKey}_authToken`, authToken);
    } catch (err: any) {
        console.log("authToken_setStore_error::", err.message);
    }
}
// setAuthToken to localstorage End

const GlobalContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    useEffect(() => {
        initSessionSetting();
    }, [state.updated])

 const initSessionSetting = async () => {
        try {
            const authToken = await getStore();

            if (!!authToken) {
                const loginStatus = await restApi.loginStatus(authToken);
                if (!!loginStatus) {
                    const userData = {
                        email: loginStatus.email,
                        username: loginStatus.username,
                        taskList:loginStatus.taskList
                    }
                    dispatch({ type: "authToken", payload: authToken });
                    dispatch({ type: "userData", payload: userData });
                    setTimeout(() => { dispatch({ type: "showLoadingPage", payload: false }) }, 1000);
                } else {
                    throw new ValidateError("Invalid authToken!");
                }
            } else {
                throw new ValidateError("Invalid authToken!");
            }
        } catch (err: any) {
            setTimeout(() => { dispatch({ type: "showLoadingPage", payload: false }) }, 1000);
        }
    }

    return (
        <GlobalContext.Provider
            value={useMemo(() => [
                state, { dispatch, setStore }
            ], [state])}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { useGlobalContext, GlobalContextProvider };