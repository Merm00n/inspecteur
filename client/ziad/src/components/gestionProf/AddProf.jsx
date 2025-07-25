import React, { useState } from "react";
import './gestionProf.css';
const AddProf = ({open, onClose})=>{
     const [prof,setProf]=useState("")
    

    const changeProf = (event) =>{
        setProf(event.target.value);

    }
    // const onSubmit = async (event) => {
    //     try{
    //         const response = await axios.post("http://localhost:5000/", {
    //             templateNature:nature
    //         })
    //         setNature("");
    //         toast.success("تم اضافة الطبيعة بنجاح")
    //     }catch(error){
    //         console.error("add failed",error)
    
    //     }
    // }

    if(!open) return null

    return(
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center ">
            <div className="modalcontainer bg-white p-4 rounded-lg pl-8 pr-10">
                <div className="text-left text-2xl font-bold pb-5 pt-4">Ajouter un professeur</div>
                <div className="flex flex-row-reverse gap-x-5">
                    <div className="name ml-1 font-bold  text-slate-700"> Nom du professeur</div>
                    <input
                    name="natureOfContract"
                    className="natureContr text-left w-96 px-3 py-2 focus:outline-none " 
                    type="text" 
                    placeholder="Nom du professeur " 
                    onChange={changeProf}  >
                    

                    </input>
                </div>
                <div className="btnContainer flex gap-x-3">
                    <button className="btnCancel" onClick={onClose}>Fermer</button>
                    <button className="btnSave"  >Sauvegarder</button>


                </div>
            </div>
        </div>
    )


}
export default AddProf;