import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import direction from "../../../assets/icons/direction.svg";
import "./infoprof.css";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";
import toast from "react-hot-toast";
import Emploi from "../../../components/gestionInfo/Emploi";
import AddPdf from "../../../components/addPdf/AddPdf";

function InfoProf() {
  const { etabId, etab, profId, prof } = useParams();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [echelon, setEchelon] = useState("");
  const [email, setEmail] = useState("");
  const [derniereVisite, setDerniereVisite] = useState("");
  const [note, setNote] = useState("");
  const [situation, setSituation] = useState("");
  const [niveaux, setNiveaux] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  

  // ✅ Vérifier si des infos existent
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-info/${profId}`);
        const data = response.data;

        if (data && Object.keys(data).length > 0) {
          setNom(data.nom || "");
          setPrenom(data.prenom || "");
          setEchelon(data.echelon || "");
          setEmail(data.email || "");
          setDerniereVisite(data.derniereVisite || "");
          setNote(data.note || "");
          setSituation(data.situation || "");
          setNiveaux(data.niveaux ? data.niveaux.split(", ") : []);
          setIsUpdate(true);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        toast.error("Erreur lors de la récupération des données");
      }
    };

    fetchInfo();
  }, [profId]);

  const handleNiveauChange = (niveau) => {
    setNiveaux((prev) =>
      prev.includes(niveau) ? prev.filter((n) => n !== niveau) : [...prev, niveau]
    );
  };

  // ✅ Vérifications des champs
  const validateForm = () => {
    if (!nom || !prenom || !echelon || !email || !derniereVisite || !note || !situation || niveaux.length === 0) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (parseInt(echelon) > 12) {
      toast.error("L'échelon ne doit pas dépasser 12");
      return false;
    }
    if (parseInt(note) > 20) {
      toast.error("La note ne doit pas dépasser 20");
      return false;
    }
    const today = new Date().toISOString().split("T")[0];
    if (derniereVisite > today) {
      toast.error("La date ne peut pas dépasser la date d'aujourd'hui");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide");
      return false;
    }
    return true;
  };

  // ✅ Enregistrer pour la première fois
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await axios.post(`http://localhost:5000/add-info/${profId}`, {
        nom,
        prenom,
        echelon,
        email,
        derniereVisite,
        note,
        situation,
        niveaux: niveaux.join(", ")
      });
      toast.success("Informations enregistrées ✅");
      setIsUpdate(true);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/update-info/${profId}`, {
        nom,
        prenom,
        echelon,
        email,
        derniereVisite,
        note,
        situation,
        niveaux: niveaux.join(", ")
      });
      toast.success("Informations mises à jour ✅");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour des données");
    }
  };

  return (
    <div className="flex flex-row-reverse h-[100%]">
      <div className="w-[200px]">
        <SideBar />
      </div>

      <div dir="rtl" className="w-full overflow-x-hidden overflow-y-scroll flex flex-col">
        <div dir="ltr" className="title">
          <div className="title-1">Gestion</div>
        </div>

        {/* Fil d'ariane */}
        <div className="content">
          <Link className="soustitle" to="/g_etablissement">
            <div>Les Etablissements</div>
          </Link>
          <div className="path">
            <img src={direction} alt="Direction" />
          </div>
          <Link to={`/g_etablissement/${etabId}/${etab}`} className="lien">
            <div>{etab}</div>
          </Link>
          <div className="path">
            <img src={direction} alt="Direction" />
          </div>
          <div className="lien">{prof}</div>
        </div>

        {/* Formulaire */}
        <div className="flex" dir="ltr">
          <div className="flex flex-col w-1/5 gap-y-6 justify-center items-center">
            {!isUpdate && (
              <button className="button2 hover:bg-white hover:text-[#DDB660] w-52 py-3" onClick={handleSave}>
                Enregistrer
              </button>
            )}
            {isUpdate && (
              <button className="button2 hover:bg-white hover:text-[#DDB660] w-52 py-3" onClick={handleUpdate}>
                Enregistrer les modifications
              </button>
            )}
            <div className="button2 hover:bg-white hover:text-[#DDB660] w-52 py-3">
                 <button className="w-full" onClick={() => {setOpenPop(true)}}>Ajouter <br /> Des Documents</button> 
                {openPop && <AddPdf open={openPop} onClose = {() => {setOpenPop(false)}} profId={profId} />
}
            </div>
          </div>

          <div className="w-full flex justify-center items-center" dir="ltr">
            <div className="info-contr mb-5 w-[70%] p-6 mt-10">
              <form className="flex flex-col gap-y-4 w-full">
                {/* Nom */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Nom</label>
                  <input
                    type="text"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>

                {/* Prénom */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Prénom</label>
                  <input
                    type="text"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>

                {/* Echelon */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Echelon</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={echelon}
                    onChange={(e) => setEchelon(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Email</label>
                  <input
                    type="email"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Dernière visite */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Dernière visite</label>
                  <input
                    type="date"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={derniereVisite}
                    onChange={(e) => setDerniereVisite(e.target.value)}
                  />
                </div>

                {/* Note */}
                <div className="flex items-center w-full">
                  <label className="label-3 text-[14pt] w-[30%]">Note</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* Situation administrative */}
                <div className="items-start w-full">
                  <label className="label-3 text-[14pt] w-[30%] mt-1">Situation administrative</label>
                  <div className="w-[90%] flex justify-around mt-3 gap-1">
                    {["Titulaire", "Vacataire", "En stage", "Suppléant(e)"].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="situation"
                          value={option}
                          checked={situation === option}
                          onChange={() => setSituation(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Niveaux pris en charge */}
                <div className="items-start w-full">
                  <label className="label-3 text-[14pt] w-[30%] mt-1">Niveaux pris en charge</label>
                  <div className="w-[70%] flex justify-around mt-3 gap-1">
                    {["1AM", "2AM", "3AM", "4AM"].map((niveau) => (
                      <label key={niveau} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={niveau}
                          checked={niveaux.includes(niveau)}
                          onChange={() => handleNiveauChange(niveau)}
                        />
                        {niveau}
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      <div className="w-full flex justify-center ">
        <div className="w-[90%]">
        <Emploi profId={profId} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default InfoProf;
