import Image from "next/image";
import Card from '../components/card';

export default async function Home() {
  const res = await fetch('https://restcountries.com/v3.1/name/turkey');
  const countryData = await res.json();

  return (
    <div>
      <h1>Türkiye Bilgileri</h1>
      <Card data={countryData[0]} />
    </div>
  );
}

export async function getStaticPropss() {
  const res = await fetch('https://restcountries.com/v3.1/name/turkey');
  const countryData = await res.json();

  return {
    props: {
      countryData: countryData[0], // İlk öğeyi al
    },
  };
}
