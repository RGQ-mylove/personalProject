import { Outlet } from 'react-router-dom';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import ParticleBackground, { type ParticleBackgroundRef } from '../components/ParticleBackground';
import { ParticleBgRefContext } from '../context';
import './MainLayout.css';

const MainLayout = () => {
  const particleRef = useRef<ParticleBackgroundRef>(null);

  return (
    <ParticleBgRefContext.Provider value={particleRef}>
      <div className="main-layout">
        <ParticleBackground ref={particleRef} />
        <Navbar />
        <div className="main-layout-content">
          <Outlet />
        </div>
      </div>
    </ParticleBgRefContext.Provider>
  );
};

export default MainLayout;
