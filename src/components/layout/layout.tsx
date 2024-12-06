import React, { useState, ReactNode } from 'react';
import Header from './header/index';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-[1700px] px-2 py-4 sm:p-4 md:p-4 2xl:p-4  relative">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
