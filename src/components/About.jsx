// src/components/About.jsx

import profilePic from "../assets/IMG_4087-1.JPEG"; 

function About() {
  return (
    <section className="splits" id="about">
      <div className="about-grid">
        
        {/* ─────── Left Column: Photo + Name ─────── */}
        <div className="block block-small">
          <img 
            src={profilePic} 
            alt="Saksham Tejpal" 
            className="profile-image" 
          />
          <p style={{ marginTop: "1rem", fontWeight: 600 }}>
            Saksham Tejpal
          </p>
        </div>

        {/* ─────── Left Column: At a Glance ─────── */}
        <div className="block block-small">
          <h3 style={{ marginBottom: "0.5rem" }}>At a Glance</h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "1rem", textAlign: "left" }}>
            <li>
              🎓 B.Sc. Computer Science (In Progress), Ontario Tech University
            </li>
            <li>
              2 years Software Engineering diploma, Centennial College
            </li>
            <li>
              📍 Toronto (Originally from India)
            </li>
            <li>
              💻 Web Development: React, JavaScript, HTML, CSS
            </li>
            <li>
              🗄️ Data &amp; Databases: SQL, MongoDB, Python (pandas)
            </li>
            <li>
              📡 Telecommunications &amp; Networking (Cisco basics, LAN/WAN)
            </li>
            <li>
              📊 Data Analysis &amp; Data Engineering (ETL, dashboards)
            </li>
          </ul>
        </div>

        {/* ─────── Right Column: Detailed Bio ─────── */}
        <div className="block block-large">
          <h2 style={{ marginBottom: "1rem" }}>About Me</h2>
          <p>
            I am currently pursuing a B.Sc. in Computer Science at Ontario Tech University (since 2022), building on a two-year Software Engineering diploma from Centennial College. Born and raised in India, I moved to Toronto in 2016 after completing 12th grade to further my education and expand my horizons in technology. Between my time at Centennial and returning to university, I gained hands-on experience in web application development, database design, and telecommunications support.
          </p>

          <p>
            Over the past few years, I have developed a strong foundation in modern web technologies—primarily using React, JavaScript (ES6+), HTML5/CSS3—and have worked with Node.js and Firebase for back-end services. I’ve built and deployed small to medium-sized projects, including a real-time chat application, a personal dashboard with data visualizations, and a CRUD-based inventory system. On the data side, I am proficient with SQL (MySQL/PostgreSQL), MongoDB, and Python (pandas, NumPy) for data cleaning, transformation, and analysis. I enjoy designing ETL pipelines and have dabbled in basic data engineering tasks like building data models and generating insights through visualizations.
          </p>

          <p>
            In addition to software, I’ve worked in telecommunications and networking—setting up and troubleshooting LAN/WAN configurations, managing switches/routers, and helping clients optimize their network performance. This hybrid skill set allows me to understand both the application stack as well as the infrastructure beneath it.
          </p>

          <p>
            Beyond technical work, I’m passionate about problem-solving. I love tackling coding challenges, diving deep into data structures &amp; algorithms, and coming up with out-of-the-box solutions for complex problems. When I’m not coding, you’ll often find me playing basketball or kickboxing (I’ve trained regularly for fitness), testing my reflexes in FPS games (Call of Duty, Ghost of Tsushima), or stopping by new cafés and bars around Toronto. I’m a lifelong fan of science, tech, and space—so if I’m not debugging code, I’m probably watching Interstellar on repeat or reading about the latest Mars rover mission.
          </p>

          <p>
            I am actively seeking internships or entry-level roles in data engineering, data science, or full-stack development. My goal is to work on data-driven applications that leverage scalable back-ends and intuitive front-ends to solve real-world problems. I’m always eager to learn new frameworks and frameworks and stay up to date with industry trends—right now I’m experimenting with TypeScript, AWS Lambda, and Docker for containerized deployments.
          </p>

          <p>
            If you’d like to know more about my work or connect, please reach out via the Contact section below or check out my <a href="#projects" style={{ color: "#fff", textDecoration: "underline" }}>Projects</a> for code samples and demos.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;
