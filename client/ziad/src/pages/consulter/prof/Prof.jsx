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




    return (
        <>
        <div className='flex flex-row-reverse h-[100%]'>
        <div className='w-[200px]'>
            <SideBar />
        </div>
        <div dir='rtl' className='w-full overflow-y-scroll'>
        <div dir='ltr'>
            <div className='title'>
                <div className='title-1'> Etablissements </div>
            </div>
            <div>
                <div className="content">
                <Link className='soustitle' to='/etablissements'><div>Les Etablissements</div></Link>
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
               
            </div>
            <div className='contractContainer'>
            <div className='flex justify-end text-center w-[100%]'>
                <div className='flex flex-row-reverse justify-between w-[50%] mt-6 mb-5 mr-10'>
                    <div className='ti'><div className='t2 '>numero du professeur</div><div className='triangle'><img src={triangle} alt="triangle" /></div></div>
                    <div className='ti ml-[9%] '><div className='t2 '>nom du professeur</div><div className='triangle'><img src={triangle} alt="triangle" /></div></div>
                </div>
            </div>
           
            <div className='scrollbar' dir='rtl'>
                {profs.filter(prof=>
                    prof.nom.toLowerCase().includes(result.toLowerCase())
                ).map((prof, index) => (
                    <div className='flex  items-center' key={prof.id}>
                        <Link
                         dir='ltr'
                            className='line-contract1 flex w-[89%] hover:bg-[#FFF5DE]'
                            to={`/etablissements/${etabId}/${etab}/${prof.id}/${prof.nom}`}
                        >
                            <div className='flex flex-row-reverse justify-between w-[50%]'>
                                <div className='numberOfContract'>{index + 1}</div>
                                <div className='natureOfContract'>{prof.nom}</div>
                            </div>
                        </Link>
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