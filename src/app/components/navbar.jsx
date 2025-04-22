'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({ links, brand }) => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center p-4 bg-white ">
            <div className='md:w-1/2 w-full flex justify-between items-center'>
                <div className="lg:text-xl  md:text-base text-sm font-bold text-black">{brand}</div>
                <ul className="flex space-x-4 lg:text-xl md:text-base text-sm ">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className={`${isActive ? 'text-black font-semibold' : 'text-black'
                                        } hover:font-semibold`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;