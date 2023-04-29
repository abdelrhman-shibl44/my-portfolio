import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Home } from "./components/Home/Home";
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Contact } from './components/Contact/Contact';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Sidebar />
      {/* end the animation after exit */}
      <AnimatePresence mode='wait'>
        <motion.div className='motionDiv' key={location.pathname}
          inital={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
