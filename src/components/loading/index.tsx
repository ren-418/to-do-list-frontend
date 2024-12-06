import './index.css'

const Loading = () => {
    return (
        <div className='w-full flex justify-center'>
            <div className="loader">
                <div className="loader-inner">
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                    <div className="bg-slate-300 dark:bg-slate-600 loader-block"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading