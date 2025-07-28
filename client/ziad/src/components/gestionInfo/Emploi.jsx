import React, { useState, useEffect } from 'react';
import axios from "axios";

const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
const heures = ["08:00 - 09:00", "09:00 - 10:00","10:00 - 11:00", "11:00 - 12:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

const Emploi = ({ profId }) => {
    const [emploi, setEmploi] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/get-creneau/${profId}`).then(res => {
            setEmploi(res.data);
        });
    }, [profId]);

    const toggleCase = async (jour, heure) => {
        const exists = emploi.some(e => e.jour === jour && e.heure === heure);

        if (exists) {
            await axios.delete(`http://localhost:5000/delete-creneau/${profId}`, {
                data: { jour, heure }
            });
            setEmploi(emploi.filter(e => !(e.jour === jour && e.heure === heure)));
        } else {
            await axios.post(`http://localhost:5000/insert-creneau/${profId}`, { jour, heure });
            setEmploi([...emploi, { jour, heure }]);
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <table
                dir="ltr"
                className="border-separate w-full text-center"
                style={{ borderSpacing: '8px 8px' }} // 8px horizontal + 8px vertical
            >
                <thead>
                    <tr>
                        <th className="p-4 bg-[#DDB660] border border-[#DDB660] text-white text-lg rounded-md">
                            Heures
                        </th>
                        {jours.map(j => (
                            <th
                                key={j}
                                className="p-4 border border-[#284A62] text-[#284A62] text-lg rounded-md"
                            >
                                {j}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {heures.map(h => (
                        <tr key={h}>
                            <td className="p-4 text-md font-semibold bg-gray-100 rounded-md shadow-md">
                                {h}
                            </td>
                            {jours.map(j => {
                                const active = emploi.some(e => e.jour === j && e.heure === h);
                                return (
                                    <td
    key={j + h}
    className={`border cursor-pointer transition-all duration-300 h-20 w-32 rounded-md shadow-md 
        ${active ? "bg-[#284A62]" : "bg-white hover:bg-[#284A62]"}
    `}
    onClick={() => toggleCase(j, h)}
></td>

                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Emploi;
