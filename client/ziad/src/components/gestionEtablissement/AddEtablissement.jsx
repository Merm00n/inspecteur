import React, { useState } from "react";
import "./BtnSave.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddEtablissement = ({ open, onClose }) => {
  const [etablissement, setEtablissement] = useState("");
  const [lieu, setLieu] = useState("");

  const changeEtablissement = (event) => {
    setEtablissement(event.target.value);
  };

  const changeLieu = (event) => {
    setLieu(event.target.value);
  };


  const onSubmit = async (event) =>{
    event.preventDefault();
        try{
        const response = await axios.post("http://localhost:5000/add", {
            nom: etablissement,
            lieu: lieu
        });
         setEtablissement("");
         setLieu("");
         onClose(); 
        toast.success("L'établissement est ajouté avec succès")
        window.location.reload();
    }catch(error){
        console.error("Erreur",error)

    }
}

    

    if(!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="modalcontainer bg-white p-4 rounded-lg pl-8 pr-10">
        <form onSubmit={onSubmit}>
          <div className="text-left text-2xl font-bold pb-5 pt-4">
            Ajouter un établissement
          </div>

          <div className="flex flex-row-reverse gap-x-10 mb-3">
            <div className="name ml-1 font-bold text-slate-700">
              Nom de l'établissement
            </div>
            <input
              className="natureContr text-left w-96 px-3 py-2 focus:outline-none"
              type="text"
              placeholder="Nom"
              value={etablissement}
              onChange={changeEtablissement}
            />
          </div>

          <div className="flex flex-row-reverse gap-x-11 mb-5">
            <div className="name ml-1 font-bold text-slate-700">
              Lieu de l'établissement
            </div>
            <input
              className="natureContr text-left w-96 px-3 py-2 focus:outline-none"
              type="text"
              placeholder="Lieu"
              value={lieu}
              onChange={changeLieu}
            />
          </div>

          <div className="btnContainer flex gap-x-3">
            <button type="button" className="btnCancel" onClick={onClose}>
              Fermer
            </button>
            <button type="submit" className="btnSave">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEtablissement;
