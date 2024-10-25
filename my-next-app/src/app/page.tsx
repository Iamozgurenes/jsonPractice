"use client";

import Card from "@/components/card";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from 'react';

export default function Home() {
    const [countries, setCountries] = useState<any[]>([]); // Ülkeleri saklamak için dizi
    const [limit, setLimit] = useState(20); // Başlangıçta gösterilecek ülke sayısı 20
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Arama sorgusunu saklamak için

    const fetchCountryData = async (query: string = '') => { // Varsayılan sorgu boş
        try {
            const res = await fetch(`https://restcountries.com/v3.1/${query ? 'name' : 'all'}/${query}`); // Arama sorgusunu kullan
            if (!res.ok) {
                throw new Error('Ülke bulunamadı');
            }
            const data = await res.json();
            setCountries(data.slice(0, limit)); // İlk 'limit' kadar ülkeyi sakla
            setError(''); // Hata mesajını sıfırla
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Bilinmeyen bir hata oluştu');
            }
            setCountries([]); // Hata durumunda veriyi sıfırla
        }
    };

    useEffect(() => {
        fetchCountryData(); // Sayfa yüklendiğinde ilk 20 ülkeyi yükle
    }, []);

    useEffect(() => {
        if (searchQuery) {
            fetchCountryData(searchQuery); // Arama sorgusu değiştiğinde verileri getir
        } else {
            fetchCountryData(); // Arama sorgusu boşsa tüm ülkeleri getir
        }
    }, [searchQuery]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query); // Arama sorgusunu güncelle
        setLimit(20); // Arama yapıldığında limit'i sıfırla
    };

    const loadMoreCountries = () => {
        setLimit(limit + 20); // "Daha Fazla" butonuna tıklandığında 20 ülke daha yükle
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Ülke Bilgileri</h1>
            <SearchBar onSearch={handleSearchChange} /> {/* Arama fonksiyonunu güncelledik */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.slice(0, limit).map((country, index) => (
                    <Card key={index} data={country} />
                ))}
            </div>
            {limit < countries.length && (
                <button onClick={loadMoreCountries} className="mt-4 p-2 bg-blue-500 text-white w-full">
                    Daha Fazla
                </button>
            )}
        </div>
    );
}
