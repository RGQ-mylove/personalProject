import HeroSection from './HeroSection';
import MusicSection from './MusicSection';
import PhotoSection from './PhotoSection';
import MessageSection from './MessageSection';
import './Home.css';

const Home = () => (
  <div className="home-page">
    <HeroSection />
    <MusicSection />
    <PhotoSection />
    <MessageSection />
  </div>
);

export default Home;
