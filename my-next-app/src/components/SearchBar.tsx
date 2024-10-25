// src/components/SearchBar.tsx
import { useState } from 'react';

export default function SearchBar({ onSearch }:any) {
    const [query, setQuery] = useState('');

    const handleSearch = (e:any) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <input
                type="text"
                placeholder="Ülke ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white rounded p-2 w-full">
                Ara
            </button>
        </form>
    );
}

