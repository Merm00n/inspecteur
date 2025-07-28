import React, { useState, useEffect } from 'react';
import SideBar from '../../../components/SideBar/SideBar';
import triangle from '../../../assets/icons/triangle.svg';
import { Link } from 'react-router-dom';
import AddEtablissement from '../../../components/gestionEtablissement/AddEtablissement';
import supp from "../../../assets/icons/supp.svg";
import axios from "axios";
import toast from "react-hot-toast";
import "./Etablissement.css";

const Etablissement = () => {
  const [openPop, setOpenPop] = useState(false);
  const [etabs, setEtabs] = useState([]);
  const [result, setResult] = useState("");

  // Charger la liste des établissements
  const fetchEtabs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all");
      setEtabs(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des établissements", error);
    }
  };

  useEffect(() => {
    fetchEtabs();
  }, []);

  // ✅ Suppression avec confirmation toast
  const handleDelete = (id) => {
   
    toast((t) => (
      <div className="text-center">
        <p className="font-semibold mb-2">Supprimer cet établissement ?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Lance la suppression
              toast.promise(
                axios.delete(`http://localhost:5000/delete/${id}`),
                {
                  loading: "Suppression en cours...",
                  success: "Établissement supprimé ✅",
                  error: "Erreur lors de la suppression ❌",
                }
              ).then(() => fetchEtabs());
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Oui
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Non
          </button>
        </div>
      </div>
    ), { duration: 4000 });
  };

  return (
    <>
      <div className='flex flex-row-reverse h-[100%]'>
        <div className='w-[200px]'>
          <SideBar />
        </div>
        <div className='w-full overflow-y-scroll flex flex-col'>

          <div dir='rtl' className='container-AddContract'>
            <div className='title-contract'>
              <div className='title-1-contract'>Gestion</div>
            </div>

            <div className="soustitre-contract">Les Etablissements</div>

            <div className='search-addcontract'>
              <div className='search'>
                <input
                  className='text text-left w-80 py-2 px-2'
                  type="search"
                  dir='ltr'
                  name='searchBar'
                  id='seacrhBar'
                  placeholder='Rechercher'
                  onChange={e => setResult(e.target.value)}
                />
              </div>
              
            </div>

            <div className='contractContainer'>
              <div className='flex justify-center text-center w-[100%]'>
                <div className='flex flex-row-reverse justify-between w-full mt-10 mb-5 mr-10' dir='ltr'>
                  <div className='t1'><div className='t2 t2-1'>Numéro</div><div className='triangle'><img src={triangle} alt=""/></div></div>
                  <div className='flex gap-x-2 ml-14'><div className='t2 t2-2 '>Nom de <br/> l'Etablissement</div><div className='triangle'><img src={triangle} alt=""/></div></div>
                  <div className='t1 ml-[8%] '><div className='t2 t2-3'>Lieu de <br/>l'Etablissement</div><div className='triangle'><img src={triangle} alt=""/></div></div>
                </div>
              </div>

              <div className='scrollbar'>
                {etabs
                  .filter(etab =>
                    etab.nom.toLowerCase().includes(result.toLowerCase()) ||
                    etab.lieu.toLowerCase().includes(result.toLowerCase())
                  )
                  .map((etab, index) => (
                    <div className='flex' key={etab.id}>
                      <Link
                        className='line-contract1 flex w-[89%] hover:bg-[#FFF5DE]'
                       to={`/etablissements/${etab.id}/${etab.nom}`}
                        dir='ltr'
                      >
                        <div className='flex justify-between w-1/2 flex-row-reverse'>
                          <div>{index + 1}</div>
                          <div>{etab.nom}</div>
                        </div>
                        <div className='text-left w-1/2'>
                          <div className='models'>{etab.lieu}</div>
                        </div>
                      </Link>
                    
                    </div>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Etablissement;
