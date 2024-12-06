import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  page?: string;
}
const Breadcrumb = ({ page }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-20">
      
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <div className="text-slate-400 dark:text-slate-500 font-medium">
              /
            </div>
          </li>
          <li className="font-medium text-primary"><Link to={`/`}>home</Link></li>
          <li className="font-medium text-primary">
            {page && <div className=' cursor-pointer '> <span className='text-slate-400dark:text-slate-500 font-medium'>/</span> {`${page.toLowerCase()}`}</div>}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
