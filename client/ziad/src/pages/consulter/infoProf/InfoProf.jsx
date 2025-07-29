import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import direction from "../../../assets/icons/direction.svg";
import "./infoProf.css";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";
import toast from "react-hot-toast";

function InfoProf() {
  const { etabId, etab, profId, prof } = useParams();

  const [info, setInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    situation: "",
    derniereVisite: "",
    note: "",
    niveaux: "",
    echelon: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-info/${profId}`);
        if (response.data) {
          setInfo({
            nom: response.data.nom || "",
            prenom: response.data.prenom || "",
            email: response.data.email || "",
            situation: response.data.situation || "",
            derniereVisite: response.data.derniereVisite || "",
            note: response.data.note || "",
            niveaux: response.data.niveaux || "",
            echelon: response.data.echelon || ""
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
        toast.error("Erreur lors de la récupération des informations.");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
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
            <div className="title" dir="ltr">
              <div className="title-1">Etablissements</div>
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
            </div>

            {/* ✅ Contenu */}
            <div className="flex ">
            <div className="cln2 mt-8 mb-4 w-[70%]">
              {loading ? (
                <div className="text-center text-xl text-gray-500">Chargement...</div>
              ) : (
                <div className="info-client w-[80%]">
                  {/* ✅ Nom et prénom */}
                  <div className="text-center">
                    <div className="text-[#284A68] font-bold mt-4 text-4xl">{info.nom}</div>
                    <div className="text-[#284A68] font-bold mt-2 text-4xl">{info.prenom}</div>
                  </div>

                  {/* ✅ Détails */}
                  <div dir="ltr" className="p-10 flex flex-col gap-y-3 text-2xl">
                    <div className="text-[#284A68] mb-3">Email : {info.email}</div>
                    <div className="text-[#284A68]">Situation : {info.situation}</div>

                    <div className="flex gap-x-16 items-center text-[#284A68]">
                      <div>Dernière Visite : {info.derniereVisite}</div>
<div className="relative border border-[#DDB660] rounded-md text-[#866829] px-6 py-3 font-semibold overflow-hidden animate-gradient">
  <span className="relative z-10">Note : {info.note}</span>
</div>
                    </div>

                    <div className="text-[#284A68]">Les niveaux : {info.niveaux}</div>
                  </div>

                  {/* ✅ Echelon */}
                  <div className="foot-client">
                    <div className="circle-clt">
                      <div className="mb-4">
                        <div className="border-[#284A68] rounded-full w-36 h-36 border-8 flex justify-center mr-5">
                          <div className="flex text-[#284A62] justify-center items-center text-center">
                            <div className="text-4xl">{info.echelon}</div>
                          </div>
                        </div>
                        <div className="mr-4 mt-3 text-center text-2xl text-[#284A62]">Echelon</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[30%]  flex flex-col gap-y-6 mt-32">
              <Link src={`/etablissements/${etabId}/${etab}/${prof.id}/${prof.nom}`} className='hover:bg-[#DDB660] drop-shadow-2xl font-bold border-2 flex border-[#DDB660] justify-center text-[#DDB660] hover:text-white rounded-md  w-52 py-5 text text-2xl'  >Informations</Link>
              <Link to={`/etablissements/${etabId}/${etab}/${profId}/${prof}/emploi`} className=' flex justify-center text-[#284A62]  font-bold text2 rounded-md drop-shadow-2xl hover:bg-[#284A62] hover:text-white w-52 py-5 text-2xl' >Emploi du temps</Link>
              <Link to={`/etablissements/${etabId}/${etab}/${profId}/${prof}/pdf`} className=' flex justify-center text-[#284A62]  font-bold text2 rounded-md drop-shadow-2xl hover:bg-[#284A62] hover:text-white w-52 py-5 text-2xl' >Documents</Link>

            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoProf;
