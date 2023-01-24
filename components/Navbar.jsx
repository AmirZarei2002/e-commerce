import Link from 'next/link';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
    const { status, data: session } = useSession();
    useEffect(() => {
        AOS.init();
    }, []);
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };

    return (
        <header
            className="shadow-sm bg-gradient-to-r from-cyan-700
            to-sky-400"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600"
        >
            <div className="mx-auto flex h-16 max-w-screen items-center justify-between px-4">
                <div className="flex w-0 flex-1 lg:hidden">
                    <button
                        className="rounded-full bg-gray-100 p-2 text-gray-600"
                        type="button"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <LocalMallIcon className="text-[1.7rem] light-yellow" />
                    <Link href="/">
                        <a className="font-mono text-xl light-yellow">
                            E-commerce
                        </a>
                    </Link>

                    <form className="mb-0 hidden lg:flex">
                        <div className="relative">
                            <input
                                className="h-10 rounded-lg border-gray-200 pr-10 pl-2 text-sm placeholder-gray-300 font-thin outline-none"
                                placeholder="Search..."
                                type="text"
                            />

                            <button
                                className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
                                type="submit"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex w-0 flex-1 justify-end lg:hidden">
                    {status === 'loading' ? (
                        'Loading'
                    ) : session?.user ? (
                        <Menu
                            as="div"
                            className="rounded-lg relative px-2 bg-gray-100 text-sm font-medium text-gray-600"
                        >
                            <Menu.Button className="text-blue-600">
                                {session.user.name}
                            </Menu.Button>
                            <Menu.Items className="bg-white shadow-lg absolute right-0 p-2 w-fit">
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/profile"
                                    >
                                        Profile
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/order-history"
                                    >
                                        Order History
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <a
                                        className="dropdown-link"
                                        href="#"
                                        onClick={logoutClickHandler}
                                    >
                                        Logout
                                    </a>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <Link href="/login">
                            <a className="flex-shrink-0 rounded-lg bg-gray-100 px-2 mx-1 py-1 text-sm font-medium text-gray-600">
                                Login
                            </a>
                        </Link>
                    )}
                </div>

                <nav className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1">
                    <Link href="/cart">
                        <a className="text-white text-lg font-mono hover:light-yellow">
                            Cart
                            {cartItemsCount > 0 && (
                                <span className="ml-1 rounded-full bg-light-red text-white text-xs font-bold px-2 py-1">
                                    {cartItemsCount}
                                </span>
                            )}
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className="text-white text-lg font-mono hover:light-yellow">
                            About
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a className="text-white text-lg font-mono hover:light-yellow">
                            Contact
                        </a>
                    </Link>
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                    {status === 'loading' ? (
                        'Loading'
                    ) : session?.user ? (
                        <Menu as="div" className="relative inline-block">
                            <Menu.Button className="text-blue-600">
                                {session.user.name}
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/profile"
                                    >
                                        Profile
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink
                                        className="dropdown-link"
                                        href="/order-history"
                                    >
                                        Order History
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <a
                                        className="dropdown-link"
                                        href="#"
                                        onClick={logoutClickHandler}
                                    >
                                        Logout
                                    </a>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <Link href="/login">
                            <a className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600 hover:translate-y-1 duration-300">
                                Login
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            <div className="border-t border-gray-100 lg:hidden">
                <nav className="flex justify-evenly py-2 text-sm font-medium">
                    <div>
                        <Link href="/cart">
                            <a className="flex-shrink-0 sm:px-4 text-white">
                                Cart
                                {cartItemsCount > 0 && (
                                    <span className="ml-1 rounded-full bg-light-red text-white text-xs font-bold px-2 py-1">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/about">
                            <a className="flex-shrink-0 px-3 sm:px-4 text-white">
                                About
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/contact">
                            <a className="flex-shrink-0 px-3 sm:px-4 text-white">
                                Contact
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
