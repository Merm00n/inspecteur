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
                  <NavLink className="navlink" to="/تحرير عقد">
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
    
            <div className="foot">
              <div className="admin-name ">  ZIAD Abderahmane Aziz</div>
              <Link to="/" className="exit">
                <button className="w-8">
                  <img src={logoE} className="" />
                </button>
              </Link>
            </div>
          </div>
          </div>
        </>
      );
    };
    export default SideBar;