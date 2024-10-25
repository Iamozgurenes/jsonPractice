"use client";

import Card from "@/components/card";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from 'react';
import { FaCog, FaSun, FaMoon } from 'react-icons/fa'; // İkonu ekleyin

export default function Home() {
    const [countries, setCountries] = useState<any[]>([]); // Ülkeleri saklamak için dizi
    const [limit, setLimit] = useState(20); // Başlangıçta gösterilecek ülke sayısı 20
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Arama sorgusunu saklamak için
    const [totalCountries, setTotalCountries] = useState(0); // Toplam ülke sayısını saklamak için
    const [totalPopulation, setTotalPopulation] = useState(0); // Toplam nüfusu saklamak için
    const [continents, setContinents] = useState<string[]>([]); // Kıtaları saklamak için
    const [theme, setTheme] = useState('light'); // Tema durumu için state ekleyin
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown durumu için state ekleyin

    const fetchCountryData = async (query: string = '') => { // Varsayılan sorgu boş
        try {
            const res = await fetch(`https://restcountries.com/v3.1/${query ? 'name' : 'all'}/${query}`); // Arama sorgusunu kullan
            if (!res.ok) {
                throw new Error('Ülke bulunamadı');
            }
            const data = await res.json();
            setCountries(data);
            setTotalCountries(data.length); // Toplam ülke sayısını ayarla
            setTotalPopulation(data.reduce((acc: number, country: any) => acc + country.population, 0)); // Toplam nüfusu hesapla
            setContinents(Array.from(new Set(data.map((country: any) => country.region)))); // Kıtaları ayarla
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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Dropdown'u aç/kapa
    };

    const changeTheme = (newTheme: string) => {
        setTheme(newTheme); // Temayı değiştir
        setDropdownOpen(false); // Dropdown'u kapat
        // Tema değişikliği için gerekli CSS sınıflarını ekleyin
        document.body.className = newTheme === 'dark' ? 'dark' : 'light'; // Koyu mod için sınıf ekleyin
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'; // Temayı değiştir
        setTheme(newTheme);
        document.body.className = newTheme; // Koyu mod için sınıf ekleyin
    };

    return (
        <div className={`p-4 ${theme}`}>
            <h1 className="text-2xl font-bold mb-4 text-center flex justify-between items-center">
                <span>{searchQuery ? 'Ülke Bilgileri' : 'Dünya Bilgileri'}</span>
                <button onClick={toggleTheme} className="ml-2">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />} {/* Güneş veya Ay ikonunu göster */}
                </button>
            </h1>
            <SearchBar onSearch={handleSearchChange} /> {/* Arama fonksiyonunu güncelledik */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {/* Toplam ülke sayısı, kıtalar ve nüfus bilgilerini gösteren kart */}
            <div className="mb-4 p-4 border rounded shadow">
                <h2 className="text-xl font-bold">Dünya Bilgileri</h2>
                <p>Toplam Ülke Sayısı: {totalCountries}</p>
                <p>Toplam Nüfus: {totalPopulation.toLocaleString()}</p>
                <p>Kıtalar: {continents.join(', ')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.slice(0, limit).map((country, index) => (
                    <Card key={index} data={country} />
                ))}
            </div>
            {countries.length > limit && ( // Butonun görünürlüğünü kontrol et
                <button onClick={loadMoreCountries} className="mt-4 p-2 bg-blue-500 text-white w-full">
                    Daha Fazla
                </button>
            )}
        </div>
    );
}
