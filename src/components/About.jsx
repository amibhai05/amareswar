import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2 className="section-title">MY JOURNEY</h2>
        <p className="about-text">
          I am Amareswar Nayak, a Computer Science student passionate about building modern web applications and solving problems using Data Structures and Algorithms.
        </p>
        <p className="about-text">
          I specialize in frontend development and full-stack technologies like React, Node.js, Express.js, MongoDB, and Supabase. I am currently strengthening my problem-solving skills by studying Java with Data Structures and Algorithms.
        </p>
        <p className="about-text">
          I am also building a startup called LaunchXpax focused on helping students get better opportunities and internships.
        </p>
        <div className="about-tags">
          <span className="tag">Problem Solver</span>
          <span className="tag">Startup Builder</span>
          <span className="tag">Creative Thinker</span>
          <span className="tag">Team Player</span>
          <span className="tag">Detail Oriented</span>
        </div>
      </div>
    </section>
  );
};

export default About;