import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import triangle from '../../../assets/icons/triangle.svg';
import direction from '../../../assets/icons/direction.svg';
import './prof.css';
import AddProf from "../../../components/gestionProf/AddProf"
import supp from "../../../assets/icons/supp.svg";
import SideBar from '../../../components/SideBar/SideBar';
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from 'react';


function Prof() {


   
    const [openPop, setOpenPop] = useState(false);
const { etabId, etab } = useParams();
    const [result,setResult]=useState("");
    const [profs, setProfs] = useState([]);
    
    const fetchProfs = async () => {
    try {
      console.log("Fetching profs for etabId:", etabId);
      const response = await axios.get(`http://localhost:5000/all-prof/${etabId}`);
      setProfs(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error("Erreur lors de la récupération des profs", error);
    }
  };

  useEffect(() => {
    fetchProfs();
  }, []);

  // ✅ Suppression avec confirmation toast
  const handleDelete = (id) => {
    console.log("prof id ", id)
   
    toast((t) => (
      <div className="text-center">
        <p className="font-semibold mb-2">Supprimer ce professeur ?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Lance la suppression
              toast.promise(
                axios.delete(`http://localhost:5000/delete-prof/${id}`),
                {
                  loading: "Suppression en cours...",
                  success: "Professeur supprimé ✅",
                  error: "Erreur lors de la suppression ❌",
                }
              ).then(() => fetchProfs());
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
        <div className='w-full overflow-y-scroll' dir='rtl'>
        <div dir='ltr'>
            <div className='title'>
                <div className='title-1'> Gestion </div>
            </div>
            <div>
                <div className="content">
                <Link className='soustitle' to='/g_etablissement'><div>Les Etablissements</div></Link>
                    <div className="path">
                        <img src={direction} alt="Direction" />
                    </div>
                    <div className="lien">{etab}</div>
             

                </div>
            </div>
            <div className='search-addcontract' dir='rtl'>
                <div className='search'>
                    <input
                        className='text text-left w-80 py-2 px-2'
                        type="search"
                        dir='ltr'

                        name='searchBar'
                        id='searchBar'
                        placeholder='rechercher'
                        onChange={e => setResult(e.target.value)}
                    />
                </div>
                <div className='addcontr'>
                    <button className='button1' onClick={() => setOpenPop(true)}>Ajouter</button>
                    <AddProf open={openPop} etabId={etabId} onClose={() => setOpenPop(false)}  />
                </div>
            </div>
            <div className='contractContainer'>
            <div className='flex justify-end text-center w-[100%]'>
                <div className='flex flex-row-reverse justify-between w-[50%] mt-6 mb-5 mr-10'>
                    <div className='ti'><div className='t2 '>numero du professeur</div><div className='triangle'><img src={triangle} alt="triangle" /></div></div>
                    <div className='ti ml-[9%] '><div className='t2 '>nom du professeur</div><div className='triangle'><img src={triangle} alt="triangle" /></div></div>
                </div>
            </div>
           
            <div className='' dir='rtl'>
                {profs.filter(prof=>
                    prof.nom.toLowerCase().includes(result.toLowerCase())
                ).map((prof, index) => (
                    <div className='flex  items-center' key={prof.id}>
                        <Link
                         dir='ltr'
                            className='line-contract1 flex w-[89%] hover:bg-[#FFF5DE]'
                            to={`/g_etablissement/${etabId}/${etab}/${prof.id}/${prof.nom}`}
                        >
                            <div className='flex flex-row-reverse justify-between w-[50%]'>
                                <div className='numberOfContract'>{index + 1}</div>
                                <div className='natureOfContract'>{prof.nom}</div>
                            </div>
                        </Link>
                        <button onClick={() => handleDelete(prof.id)} className='mr-[1%] h-max mt-[1%]'><img src={supp} className='w-[30px]' alt="Supprimer" /></button>
                    </div>  
                ))
            }

                     

                            
            </div> </div>
        </div>
        </div>
        </div>
        </>
    );
}

export default Prof;