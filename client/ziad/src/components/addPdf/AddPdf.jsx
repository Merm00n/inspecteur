import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const AddPdf = ({ open, onClose, profId }) => {
     const [title, setTitle] = useState("");
     const [file, setFile] = useState("");

     const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("file", file);

        try {
            await axios.post(`http://localhost:5000/upload-file/${profId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            toast.success("PDF ajouté avec succès");
            onClose();
            

        } catch (error) {
            console.error("Erreur lors de l'ajout du PDF:", error);
            toast.error("Erreur lors de l'ajout du PDF");
        }
        


     
    }
  return (
     <div className="fixed inset-0 text-black bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center">
      <div dir='rtl' className="modalcontainer bg-white p-4 rounded-lg pl-8 pr-10">
        <form onSubmit={onSubmit} >
         <div className="text-2xl text-[#284A62] text-left font-bold pb-5 pt-4">
            Ajouter un PDF
          </div>
          

          <div className="flex flex-row-reverse gap-x-10 mb-3">
            
            <input
              className="natureContr text-left w-96 px-3 py-2 focus:outline-none"
              type="text"
              placeholder="Titre"
              onChange={(e) => {setTitle(e.target.value)}}
              
            />
          </div>

          <div className="flex flex-row-reverse gap-x-11 mb-5">
            
            <input
             dir='ltr'
              className="natureContr text-gray text-left w-96 px-3 py-2 focus:outline-none"
              type='file'
              accept='application/pdf'
              required
              onChange={(e) => {setFile(e.target.files[0])}}
            
            />
          </div>

          <div className="btnContainer flex gap-x-3">
            <button type="button" className="btnCancel" onClick={onClose}>
              Fermer
            </button>
            <button type="submit" className="btnSave">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPdf
