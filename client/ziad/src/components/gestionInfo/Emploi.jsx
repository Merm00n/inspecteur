import React, { useState, useEffect } from 'react';
import axios from "axios";

const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
const heures = ["08:00 - 09:00", "09:00 - 10:00","10:00 - 11:00", "11:00 - 12:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

const Emploi = ({ profId }) => {
    const [emploi, setEmploi] = useState([]);
    const [editing, setEditing] = useState(null); // {jour, heure}

    useEffect(() => {
        axios.get(`http://localhost:5000/get-creneau/${profId}`).then(res => {
            console.log(res.data);
            setEmploi(res.data);
        });
    }, [profId]);

    const handleClick = (jour, heure) => {
        const exists = emploi.find(e => e.jour === jour && e.heure === heure);
        if (!exists) {
            setEmploi([...emploi, { jour, heure, texte: "" }]);
        }
        setEditing({ jour, heure });
    };

    const handleBlur = async (jour, heure, texte) => {
        setEditing(null);
        const exists = emploi.find(e => e.jour === jour && e.heure === heure);

        if (exists && texte.trim() === "") {
            await axios.delete(`http://localhost:5000/delete-creneau/${profId}`, {
                data: { jour, heure }
            });
            setEmploi(emploi.filter(e => !(e.jour === jour && e.heure === heure)));
        } else {
            await axios.post(`http://localhost:5000/insert-creneau/${profId}`, { jour, heure, texte });
            setEmploi(emploi.map(e => (e.jour === jour && e.heure === heure ? { ...e, texte } : e)));
        }
    };

    const handleChange = (jour, heure, value) => {
        setEmploi(emploi.map(e => (e.jour === jour && e.heure === heure ? { ...e, texte: value } : e)));
    };

    return (
        <div className="overflow-x-auto p-4">
            <table
                dir="ltr"
                className="border-separate w-full text-center"
                style={{ borderSpacing: '8px 8px' }}
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
                                const item = emploi.find(e => e.jour === j && e.heure === h);
                                const active = !!item;
                                const isEditing = editing && editing.jour === j && editing.heure === h;
                                return (
                                    <td
                                        key={j + h}
                                        className={`border cursor-pointer transition-all duration-300 h-20 w-32 rounded-md shadow-md  items-center justify-center
                                            ${active ? "bg-[#284A62]" : "bg-white hover:bg-[#284A62]/50"}
                                        `}
                                        onClick={() => handleClick(j, h)}
                                    >
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="bg-transparent text-white text-center outline-none w-full"
                                                value={item?.texte || ""}
                                                onChange={(e) => handleChange(j, h, e.target.value)}
                                                onBlur={() => handleBlur(j, h, item?.texte || "")}
                                                autoFocus
                                            />
                                        ) : (
                                            active && (
                                                <span className="text-white font-semibold">{item.texte}</span>
                                            )
                                        )}
                                    </td>
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
