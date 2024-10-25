// components/Card.js
export default function Card({ data }:any) {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
            <img
                src={data.flags.svg}
                alt={`${data.name.common} bayrağı`}
                className="w-full h-32 object-cover"
            />
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{data.name.common}</h2>
                <p className="text-gray-600">Başkent: <span className="font-semibold">{data.capital}</span></p>
                <p className="text-gray-600">Nüfus: <span className="font-semibold">{data.population}</span></p>
                <p className="text-gray-600">Bölge: <span className="font-semibold">{data.region}</span></p>
            </div>
        </div>
    );
}

