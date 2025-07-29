import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import direction from "../../../assets/icons/direction.svg";
import "./infoProf.css";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";
import toast from "react-hot-toast";

function DisplayEmploi() {
  const { etabId, etab, profId, prof } = useParams();
  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
const heures = ["08:00 - 09:00", "09:00 - 10:00","10:00 - 11:00", "11:00 - 12:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

      const [emploi, setEmploi] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/get-creneau/${profId}`).then(res => {
            setEmploi(res.data);
        });
    }, [profId]);
  
  return (
    <>
      <div className="flex flex-row-reverse h-[100%]">
        <div className="w-[200px]">
          <SideBar />
        </div>

        <div className="w-full flex flex-col">
          <div className="container-clients" dir="rtl">
            {/* ✅ Titre */}
            <div className="title flex justify-between" dir="rtl">
              
              <div className="title-1">Etablissements</div>
 <div className="flex gap-x-4 ml-36">
 <Link to={`/etablissements/${etabId}/${etab}/${profId}/${prof}`} className='hover:bg-[#DDB660] font-bold border-2 flex border-[#DDB660] justify-center text-[#DDB660] hover:text-white rounded-md drop-shadow-xl w-40 py-5 text-lg'  >Informations</Link>
        
            <Link to={`/etablissements/${etabId}/${etab}/${profId}/${prof}/emploi`} className='flex justify-center text-[#284A62] font-bold text2 rounded-md drop-shadow-2xl hover:bg-[#284A62] hover:text-white w-40 py-5 text-lg'  >Emploi du temps</Link>
           <Link to={`/etablissements/${etabId}/${etab}/${profId}/${prof}/pdf`} className="flex justify-center text-[#284A62] font-bold text2 rounded-md drop-shadow-2xl hover:bg-[#284A62] hover:text-white w-40 py-5 text-lg" >Documents</Link>
            </div>
            </div>

            {/* ✅ Fil d'ariane */}
            <div className="content">
              <Link className="soustitle" to="/etablissements">
                <div>Les Etablissements</div>
              </Link>
              <div className="path">
                <img src={direction} alt="Direction" />
              </div>
              <Link to={`/etablissements/${etabId}/${etab}`} className="lien">
                <div>{etab}</div>
              </Link>
              <div className="path">
                <img src={direction} alt="Direction" />
              </div>
              <div className="lien">{prof}</div>
               
               <div className="  flex  gap-x-3 justify-center items-center ">

             </div>
            </div>




            <div className="w-full flex justify-center">





                  <div className="overflow-x-auto  mt-5">
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
    className={`border transition-all duration-300 h-20 w-32 rounded-md shadow-md  items-center justify-center
        ${active ? "bg-[#284A62]" : "bg-white "}
    `}
>
    {active && (
        <span className="text-white font-semibold">
            {emploi.find(e => e.jour === j && e.heure === h)?.texte || ""}
        </span>
    )}
</td>


                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </div>

           
           
            </div>
          </div>
        </div>
  
    </>
  );
}

export default DisplayEmploi;
