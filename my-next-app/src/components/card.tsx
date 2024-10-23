// components/Card.js
export default function Card({ data }:any) {
    return (
        <div className="card">
            <h2>{data.name.common}</h2>
            <img src={data.flags.svg} alt={`${data.name.common} bayrağı`} width={100} />
            <p>Başkent: {data.capital}</p>
            <p>Nüfus: {data.population}</p>
            <p>Bölge: {data.region}</p>
            {/* Diğer bilgileri buraya ekleyebilirsiniz */}
        </div>
    );
}

