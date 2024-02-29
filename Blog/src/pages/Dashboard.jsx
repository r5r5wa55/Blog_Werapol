import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashProfile from "../component/DashProfile";
import DashSidebar from "../component/DashSidebar";
import DashPost from "../component/DashPost";
import DashUser from "../component/DashUser";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-64'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* posts... */}
      {tab === 'posts' && <DashPost />}
      {/* user... */}
      {tab === 'users' && <DashUser />}
    </div>
  );
}

