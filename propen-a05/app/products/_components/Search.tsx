'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = ({ search }: { search?: string }) => {
    const router = useRouter();
    const initialRender = useRef(true);

    const [text, setText] = useState(search);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (!query) {
            router.push(`/products`);
        } else {
            router.push(`/products?search=${query}`);
        }
    }, [query]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setQuery(e.target.value);
    };

    return (
        <div className='relative rounded-md'>
            <div className='pointer-events-none absolute inset-y-0 left-10 flex items-center pl-3'>
                <SearchIcon className='h-5 w-20 text-gray-400' aria-hidden='true' />
            </div>
                <input
                    value={text}
                    placeholder='Search'
                    onChange={handleSearch}
                    className='block w-5/6 rounded-md border-0 py-1.5 pl-10 pr-6 mx-auto text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white'
                />
        </div>
    );
};

export default Search;