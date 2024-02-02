import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashProfile from "../component/DashProfile";
import DashSidebar from "../component/DashSidebar";


export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState();
  useEffect(()=>{
    const urlPriaramas = new URLSearchParams(location.search);
    const tabFromUrl = urlPriaramas.get('tab')
    console.log(tabFromUrl);
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div>
        <DashSidebar />
      </div>

      {/* profile */}
      {tab==='profile'&& <DashProfile />}
    </div>
  )
}
