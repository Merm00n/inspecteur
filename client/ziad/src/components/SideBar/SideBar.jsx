import {
      Link,
      NavLink,
    } from "react-router-dom";
    import logoE_N from "../../assets/icons/ziad.svg";
    import logoC from "../../assets/icons/control.svg";
    import logoContr from "../../assets/icons/contract.svg";
    import logoModel from "../../assets/icons/model.svg";
    import logoE from "../../assets/icons/exit.svg";



    
    const SideBar = () => {
   
    
      return (
        <>
          <div className="SideBar h-full  ">
            
    
            <div className="logoE-N w-[100%] flex justify-center text-center">
              <div className=" logoe">
                <img  src={logoE_N} className="logo " alt="logo" />
              </div>
            </div>
            <div className="flex flex-col h-[80%] justify-between">
    
            <div className="links">
              <div className="link ">
                <div className="l-ink">
                  <NavLink className="navlink" to="/">
                    <div className="control ">Tableau de  bord</div>
                    <div className="icon-1 pl-[5%] ">
                      <img src={logoC} className="icon i1 " />
                    </div>
                  </NavLink>
                </div>
              </div>
           
              <div className="link ">
                <div className="l-ink">
                  <NavLink className="navlink" to="/etablissements">
                    <div className="control">Etablissements</div>
                    <div className="icon-1  ">
                      <img src={logoContr} className="icon i3" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="link ">
                <div className="l-ink">
                  <NavLink className="navlink" to="/g_etablissement">
                    <div className="control">Gestion</div>
                    <div className="icon-1 ">
                      {" "}
                      <img src={logoModel} className="icon i4" />
                    </div>
                  </NavLink>
                </div>
              </div>
             
          
           
            </div>
    
            <div className="flex justify-center items-center">
              <div className=" text-center text-[10pt] w-[70%] text-gray-500 ">  ZIAD Abderrahmane Aziz</div>
              
            </div>
          </div>
          </div>
        </>
      );
    };
    export default SideBar;