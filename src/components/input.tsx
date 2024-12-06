import { getCaseSensitive } from "../context/helper"
import Icon from "./icon"

interface InputProps {
    value?: string | number
    onInput: Function
    icon?: string
    type: string
    placeholder?: string
    readOnly?: boolean
    inputType?: string
    padding?: string
    width?: string
    center?: boolean
    min?: number
    max?: number
}

export const Input = (props: InputProps) => {

    const { value, inputType, onInput, icon, type, placeholder, readOnly, padding, width, center, min, max } = props

    return (
        <div className="relative">
            <span className="absolute left-4.5 top-4">
                <Icon icon={icon ? icon : ""} />
            </span>
            <input
                className={`${icon ? "pl-11.5 py-3 pr-4.5" : padding ? padding : "pl-4.5 py-3 pr-4.5"} ${!readOnly ? "dark:focus:border-primary dark:bg-form-input" : " bg-meta-2 border-none dark:border-none"} ${width ? width : 'w-full'} ${center ? 'text-center' : 'text-left'} rounded border  bg-transparent text-black focus-visible:outline-none border-slate-300 dark:border-slate-600 dark:bg-form-input dark:text-white `}
                type={inputType ? inputType : "text"}
                value={value}
                onChange={(e) => onInput(e, type)}
                placeholder={placeholder ? placeholder : ""}
                readOnly={readOnly ? true : false}
                min={min ? min : undefined}
                max={max ? max : undefined}
            />
        </div>
    )
}

export const Select = ({ value, onChange, data }: { value: string, onChange: (chainLabel: string) => void, data: string[] }) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-2">
            <div className="relative w-full z-20 bg-transparent dark:bg-form-input">
                <select
                    value={value}
                    className={`relative  z-20 w-full appearance-none rounded border bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary}`}
                    onChange={e => onChange(e.target.value)}
                >
                    {data.map((i: string, k: number) => (
                        <option value={i} key={k} className="text-xs sm:text-[15px]">{getCaseSensitive(i)}</option>
                    ))}
                </select>

                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <Icon icon="ArrowDrop" />
                </span>
            </div>
        </div>
    )
}

export const Radio = ({ isChecked, onChangeRadio, value }: { value: string, isChecked: boolean, onChangeRadio: (e: any) => void }) => {
    return (
        <label className="flex items-center">
            <input
                type="radio"
                value={value}
                checked={isChecked}
                className="sr-only"
                onChange={onChangeRadio}
            />
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary dark:border-slate-300">
                <span
                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${isChecked && '!bg-primary dark:!bg-slate-300'
                        }`}
                >
                    {' '}
                </span>
            </div>
            <div className="text-black dark:text-white">{value}</div>
        </label>
    )
}