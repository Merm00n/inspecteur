import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import direction from "../../../assets/icons/direction.svg";
import "./infoprof.css";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";
import toast from "react-hot-toast";

function InfoProf() {
  const { etabId, etab, profId, prof } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    echelon: "", // Ajouté
    email: "",
    situation: "Titulaire",
    niveaux: [],
    derniereVisite: "", // Ajouté
    note: "", // Ajouté
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNiveauChange = (niveau) => {
    setFormData((prev) => {
      if (prev.niveaux.includes(niveau)) {
        return { ...prev, niveaux: prev.niveaux.filter((n) => n !== niveau) };
      } else {
        return { ...prev, niveaux: [...prev.niveaux, niveau] };
      }
    });
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/add-info/${profId}`, {
        nom: formData.nom,
        prenom: formData.prenom,
        echelon: formData.echelon,
        adresse: formData.email,
        situation: formData.situation,
        niveau: formData.niveaux.join(", "),
        derniereVisite: formData.derniereVisite,
        note: formData.note,
      });
      toast.success("Informations ajoutées ✅");
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row-reverse h-[100%]">
      <div className="w-[200px]">
        <SideBar />
      </div>

      <div className="w-full flex flex-col">
        <div className="title">
          <div className="title-1">Gestion</div>
        </div>

        <div>
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
        </div>

        <div className="flex">
          <div className="flex flex-col w-1/5 gap-y-6 justify-center items-center">
            <div className="addcontr">
              <button className="button2 w-52 py-3" onClick={handleSave}>
                Enregistrer
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center items-center" dir="ltr">
            <div className="info-contr w-[70%] p-6 mt-10">
              <form className="flex flex-col gap-y-4 w-full">
                {/* Champs texte */}
                {[
                  { id: "nom", label: "Nom", name: "nom" },
                  { id: "prenom", label: "Prénom", name: "prenom" },
                  {
                    id: "echelon",
                    label: "Echelon",
                    name: "echelon",
                    type: "number",
                    min: 1,
                    max: 12,
                  },
                  { id: "email", label: "Adresse email", name: "email" },
                ].map(({ id, label, name, type = "text", min, max }) => (
                  <div key={id} className="flex items-center w-full">
                    <label htmlFor={id} className="label-3 text-[14pt] w-[30%]">
                      {label}
                    </label>
                    <input
                      id={id}
                      name={name}
                      type={type}
                      min={min}
                      max={max}
                      className="input-contr-1 p-2 px-2 w-[70%]"
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* Dernière visite */}
                <div className="flex items-center w-full">
                  <label
                    htmlFor="derniereVisite"
                    className="label-3 text-[14pt] w-[30%]"
                  >
                    Dernière visite
                  </label>
                  <input
                    id="derniereVisite"
                    name="derniereVisite"
                    type="date"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={formData.derniereVisite}
                    onChange={handleChange}
                  />
                </div>

                {/* Note */}
                <div className="flex items-center w-full">
                  <label
                    htmlFor="note"
                    className="label-3 text-[14pt] w-[30%]"
                  >
                    Note (max 20)
                  </label>
                  <input
                    id="note"
                    name="note"
                    type="number"
                    min="0"
                    max="20"
                    className="input-contr-1 p-2 px-2 w-[70%]"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </div>

                {/* Situation administrative */}
                <div className="items-start w-full">
                  <label className="label-3 text-[14pt] w-[30%] mt-1">
                    Situation administrative
                  </label>
                  <div className="w-[70%] flex justify-around mt-3 gap-1">
                    {["Titulaire", "Vacataire", "En stage"].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="situation"
                          value={option}
                          checked={formData.situation === option}
                          onChange={handleChange}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Niveaux pris en charge */}
                <div className="items-start w-full">
                  <label className="label-3 text-[14pt] w-[30%] mt-1">
                    Niveaux pris en charge
                  </label>
                  <div className="w-[70%] flex justify-around mt-3 gap-1">
                    {["1AM", "2AM", "3AM", "4AM"].map((niveau) => (
                      <label key={niveau} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={niveau}
                          checked={formData.niveaux.includes(niveau)}
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
      </div>
    </div>
  );
}

export default InfoProf;
