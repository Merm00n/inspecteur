import React from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import triangle from '../../../assets/icons/triangle.svg';
import { Link } from 'react-router-dom';
import AddEtablissement from '../../../components/gestionEtablissement/AddEtablissement';
import supp from "../../../assets/icons/supp.svg"
import { useState } from 'react';
import "./Etablissement.css"
const Etablissement = () => {
       const etab = "abdelhafidh sanhadri"
        const [openPop,setOpenPop]= useState(false)
        const[etablissement,setEtablissement]=useState("");
       const [result,setResult]= useState("")

    //     const handleDelete = async (templateNature) => {
    //     try {
    //       const response = await axios.delete("http://localhost:5000/delete-nature", { data: { templateNature } });
    //       const updatedNature = readNature.filter(nature => nature !== templateNature);
    //       setReadNature(updatedNature);
    //     } catch (error) {
    //       console.error('Error deleting template nature:', error);
    //     }
    //   };



  return (
    <>
     <div className='flex flex-row-reverse h-[100%]'>
        <div className='w-[200px]'>
                <SideBar />
        </div>
        <div className='w-full flex flex-col'>



        <div dir='rtl' className='container-AddContract'>
            <div className='title-contract'>
                <div className='title-1-contract'>Gestion</div>
            </div>

            <div className=" soustitre-contract "> Liste Des Etablissements </div>
            
            <div className='search-addcontract' >
                <div className='search'>
                    <input
                        className='text text-left w-80 py-2 px-2'
                        type="search"
                        dir='ltr'
                        name='searchBar'
                        id='seacrhBar'
                        placeholder='rechercher'
                        onChange={e=>setResult(e.target.value)}
                    />
                </div>
                <div className='addcontr'>
                    <button className=' button1' onClick={()=> setOpenPop(true)}>Ajouter</button>
                    
                    <AddEtablissement open={openPop} onClose={()=> setOpenPop(false)}  />
                </div>
               
            </div>
            <div className='contractContainer '>
            <div className='flex justify-center text-center w-[100%]'>
                <div className='flex flex-row-reverse justify-between w-full mt-6 mb-5 mr-10' dir='ltr'>
                    <div className='t1'><div className='t2 t2-1'> numero d'établissement</div><div className='triangle'><img src={triangle}></img></div></div>
                    <div className='t1 ml-[9%]'><div className='t2 t2-2'>nom d'établissement</div><div className='triangle'><img src={triangle}></img></div></div>
                    <div className='t1 ml-[8%] '><div className='t2 t2-3'>nombre de professeurs</div><div className='triangle'><img src={triangle}></img></div></div>
                </div>
                </div>
                <div className='scrollbar'>
                     
                                    
                                <div className='flex'>
                                   <Link className='line-contract w-[89%] hover:bg-[#FFF5DE]' to={`/g_etablissement/${encodeURIComponent(etab)}`} dir='ltr'>
        
                                        <div className='numberOfContract'>1</div>
                                        <div className='natureOfContract'>abdelhafidh sanhadri</div>
                                        <div className='numberOfModels'><div className='models'>0</div></div>
            
                                    </Link>
                                    <button className=''><img src={supp} className='w-[30px] '  /></button>
                                    {/* <button onClick={() => handleDelete(data)} className='mr-[1%] h-max mt-[1%]'><img src={supp} className='w-[30px] '  /></button> */}
                                    </div>

                                      <div className='flex'>
                                    <Link className='line-contract  w-[89%] hover:bg-[#FFF5DE]' to={`/g_etablissement/${etab}`} dir='ltr'>
        
                                        <div className='numberOfContract'>1</div>
                                        <div className='natureOfContract'>abdelhafidh sanhadri</div>
                                        <div className='numberOfModels'><div className='models'>0</div></div>
            
                                    </Link>
                                    <button className=''><img src={supp} className='w-[30px] '  /></button>
                                    {/* <button onClick={() => handleDelete(data)} className='mr-[1%] h-max mt-[1%]'><img src={supp} className='w-[30px] '  /></button> */}
                                    </div>
                          
                          
                          
                              </div> 
                              

                              
            </div>
            </div>
            </div>
            </div>
    </>
  )
}

export default Etablissement
