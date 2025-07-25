import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import triangle from '../../../assets/icons/triangle.svg';
import direction from '../../../assets/icons/direction.svg';
import './prof.css';
import AddProf from "../../../components/gestionProf/AddProf"
import supp from "../../../assets/icons/supp.svg";
import SideBar from '../../../components/SideBar/SideBar';

function Prof() {
 const prof = "melissa"
   
    const [openPop, setOpenPop] = useState(false);
    const { etab } = useParams();
        const [result,setResult]=useState("");
    
    console.log("etab", etab);


    return (
        <>
        <div className='flex flex-row-reverse h-[100%]'>
        <div className='w-[200px]'>
            <SideBar />
        </div>
        <div className='w-full'>
        <div>
            <div className='title'>
                <div className='title-1'> Gestion </div>
            </div>
            <div>
                <div className="content">
                <Link className='soustitle' to='/g_etablissement'><div> Les Etablissements</div></Link>
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
                    <AddProf open={openPop} onClose={() => setOpenPop(false)} />
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

                                <div className='flex '>
                            <Link
                                dir='ltr'
                                to={`/g_etablissement/${etab}/${prof}`}

                                className='line-contract2  w-[89%] hover:bg-[#FFF5DE]'
                            >
                              <div className='flex flex-row-reverse justify-between w-[50%]'>
                                <div className='numberOfContract'>1</div>
                                <div className='natureOfContract'>ziad melissa</div>
                                </div>
                            </Link>
                            <button  className='mr-[1%] h-max mt-[1%]'><img src={supp} className='w-[30px] '  /></button>
                            </div>
                            
            </div> </div>
        </div>
        </div>
        </div>
        </>
    );
}

export default Prof;