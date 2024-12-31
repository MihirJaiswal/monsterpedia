'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { navigation } from '../../constant';

const HomeNav = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClose = () => {
    if (openNavigation) setOpenNavigation(false);
  };

  return (
    <div className="relative">
      <nav
        className={`${
          openNavigation ? 'flex' : 'hidden'
        } fixed top-[5rem] left-0 right-0 bottom-0 bg-black lg:static lg:flex lg:mx-auto lg:bg-transparent`}
      >
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation.map((item) => {
            const isActive = pathname === item.route;
            return (
              <a
                key={item.label}
                href={item.route}
                onClick={handleClose}
                className={`block relative font-code text-xl uppercase transition-colors ${
                  isActive ? 'text-blue-500 font-bold' : 'text-white'
                } hover:text-gray-300 px-4 py-4 lg:text-sm lg:font-semibold lg:leading-5 xl:px-8`}
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
