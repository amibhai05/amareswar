import React from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Startup from './components/Startup';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Startup />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
