import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import direction from "../../../assets/icons/direction.svg";
import "./infoProf.css";
import SideBar from "../../../components/SideBar/SideBar";
import toast from "react-hot-toast"
import supp from "../../../assets/icons/supp.svg";


function DisplayPdf() {
  const [pdfs, setPdfs] = useState([]);
  const [visiblePdfIndex, setVisiblePdfIndex] = useState(null); // index du PDF visible
  const { etabId, etab, profId, prof } = useParams();

  useEffect(() => {
    const fetchPdfs = async (e) => {
      try {
        const response = await axios.get(`http://localhost:5000/getPdf/${profId}`);
        setPdfs(response.data);
        console.log("PDFs récupérés:", response.data);
       
      } catch (error) {
        console.error("Erreur lors de la récupération des PDFs:", error);
      }
    };

    fetchPdfs();


    
  }, [])
  

  const togglePdf = (index) => {
    setVisiblePdfIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    
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
               
              
            </div>




            <div className="w-full flex justify-center">





                  <div dir="ltr" className="overflow-x-auto w-[90%]  mt-5">
           <div className="">
      {pdfs.map((pdf, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex mt-3 items-center w-[50%] justify-between">
            <h4 className="font-medium text-xl text-[#284A62]">{index+1}- {pdf.title}</h4>
            <div className="flex gap-x-4">
            <button
              onClick={() => togglePdf(index)}
              className="bg-[#DDB660] text-white px-3 py-1 rounded  hover:bg-[#284A62] "
            >
              {visiblePdfIndex === index ? "Masquer PDF" : "Afficher PDF"}
            </button>
              <button >
                   <img src={supp} className='w-[30px]' alt="Supprimer" />
              </button>
              </div>
          </div>
          {visiblePdfIndex === index && (
            <iframe
              src={`http://localhost:5000/${pdf.file_path}`}
              width="100%"
              height="1000px"
              className="mt-4 text-black border"
              title={`pdf-${index}`}
            ></iframe>
          )}
        </div>
      ))}
    </div>
        </div>
            </div>

           
           
            </div>
          </div>
        </div>
        













   
  );
}

export default DisplayPdf;
