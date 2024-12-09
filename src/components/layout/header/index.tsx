import { Link } from 'react-router-dom';

import DarkModeSwitcher from './dark-mode-switcher';
import DropdownUser from './dropdown-user';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-[2000] flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex w-full justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">

          <Link className="flex gap-2 justify-between items-center flex-shrink-0 lg:hidden" to="/">
            <img src="/image/logo64.png" width={40} alt="Logo" />
            <label className="font-bold text-black dark:text-white text-lg">
              Todo App
            </label>
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
