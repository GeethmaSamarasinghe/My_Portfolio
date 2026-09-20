import React, { useState, useEffect, useRef } from "react";

/**
 * Portfolio — React recreation of the original static HTML/CSS/JS site.
 *
 * Swap-in points for your real assets (search for "PLACEHOLDER" below):
 *   1. introGif      -> your typing-intro gif
 *   2. profilePic    -> your About Me photo
 *   3. skillIcons    -> your tech icon set (or keep using simple-icons CDN as-is)
 *   4. contactImage  -> your "Contact Me" graphic
 */

// ---- Reusable scroll-reveal hook (replaces IntersectionObserver blocks in script.js) ----
function useReveal(threshold = 0.15, once = true) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}

// ---- Typing effect (replaces typeEffect() in script.js) ----
function useTypedText(text, speed = 100, showGifAtChar = 3) {
  const [typed, setTyped] = useState("");
  const [showGif, setShowGif] = useState(false);
 
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      // Slice from the source string each tick (instead of appending to
      // previous state) so a double-invoked effect (React StrictMode in
      // dev, or a Vite HMR reload) just recomputes the same correct
      // string rather than skipping or duplicating characters.
      setTyped(text.slice(0, i));
      if (i === showGifAtChar) setShowGif(true);
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, showGifAtChar]);
 
  return [typed, showGif];
}

// These point at /public/images/*.png — the same filenames your original
// site used. Drop your existing icon PNGs into public/images/ and these
// will just work. (Left as-is from your original <img> src values.)
const skillCategories = [
  {
    title: "Programming Languages",
    items: [
      { name: "Html", icon: "/images/html.png" },
      { name: "CSS", icon: "/images/css.png" },
      { name: "TailwindCSS", icon: "/images/tailwind.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "Reactjs", icon: "/images/reactjs.png" },
      { name: "Java", icon: "/images/java.png" },
      { name: "C", icon: "/images/c.png" },
    ],
  },
  {
    title: "Databases",
    items: [{ name: "MySQL", icon: "/images/mysql.png" }],
  },
  {
    title: "Design Tools",
    items: [
      { name: "Figma", icon: "/images/figma.png" },
      { name: "Canva", icon: "/images/canva.png" },
    ],
  },
];

// Add more projects here as you build them — the grid below lays out
// 1, 2, or many cards cleanly. `tools` reuses the same icon files as the
// Skills section. `repoUrl` is PLACEHOLDER "#" for now — swap in the
// GitHub link for each specific project's repo.
const projects = [
  {
    title: "Driving School Management System",
    description:
      "A system that streamlines student enrollment, lesson scheduling, instructor management, payments, and progress tracking through a centralized digital platform.",
    tools: [
      { name: "React.js", icon: "/images/reactjs.png" },
      { name: "Node.js", icon: "/images/nodejs.png" }, // add this icon to public/images
      { name: "Express.js", icon: "/images/express.png" }, // add this icon to public/images
      { name: "MySQL", icon: "/images/mysql.png" },
    ],
    repoUrl: "https://github.com/GeethmaSamarasinghe/Driving-School-Management-System",
  },
  {
    title: "360LK",
    description:
      "A virtual tourism platform that lets users explore Sri Lanka's natural landscapes, cultural landmarks, and historical sites through immersive 360° interactive experiences, bringing the country's most iconic destinations to life from anywhere in the world.",
    tools: [
      { name: "HTML", icon: "/images/html.png" },
      { name: "CSS", icon: "/images/css.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "Figma", icon: "/images/figma.png" },
    ],
    repoUrl: "https://github.com/GeethmaSamarasinghe/360LK",
  },
  {
    title: "DermaScan",
    description:
      "A mobile application powered by AI and computer vision that lets users capture an image of an affected skin area, analyzes it with a trained model, and returns instant feedback with a confidence score and suggested next steps.",
    tools: [
      { name: "HTML", icon: "/images/html.png" },
      { name: "CSS", icon: "/images/css.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "Figma", icon: "/images/figma.png" },
    ],
    repoUrl: "https://github.com/GeethmaSamarasinghe/DermaScan",
  },
  {
    title: "ECOFY",
    description:
      "A smart, web-based waste management system that digitalizes private waste collection services, ensuring timely pickups, transparent operations, and enhanced communication between customers, staff, and administrators.",
    tools: [
      { name: "React.js", icon: "/images/reactjs.png" },
      { name: "Node.js", icon: "/images/nodejs.png" }, // add this icon to public/images
      { name: "Express.js", icon: "/images/express.png" }, // add this icon to public/images
      { name: "MongoDB", icon: "/images/mongodb.png" }, // add this icon to public/images
    ],
    repoUrl: "https://github.com/Ecofy-Waste-Management-Website/Ecofy-Fullstack",
  },
];

function NavBar() {
  const links = ["home", "about", "skills", "projects", "contact"];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="fixed top-0 right-0 z-[1000] bg-black/85 hover:bg-neutral-800/90 transition-colors duration-300 rounded-bl-2xl px-8 py-4">
      <ul className="flex gap-5 list-none">
        {links.map((id) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className="text-neutral-100 font-medium capitalize hover:text-neutral-400 hover:-translate-y-0.5 transition-all duration-200 bg-transparent"
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const [typed, showGif] = useTypedText("Hi, I'm Geethma Samarasinghe!", 100, 2);
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-5 py-24"
    >
      <h1 className="text-3xl md:text-5xl font-light">
        <span>{typed}</span>
        <span className="animate-pulse">|</span>
      </h1>
      <p className="mt-3 mb-5 text-lg md:text-xl text-neutral-300">
        Information Systems Undergraduate | Aspiring Business Analyst | Data Analyst 
      </p>
      <img
        src="/images/gif 2.gif" // put your intro gif at public/images/intro.gif
        alt="Coding Girl"
        className={`w-[300px] mt-5 transition-all duration-500 ease-out ${
          showGif ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      />
    </section>
  );
}

function About() {
  const [textRef, textVisible] = useReveal();
  const [picRef, picVisible] = useReveal();
  return (
    <section id="about" className="flex justify-center px-8 py-16 -mt-24">
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-12 items-stretch">
        <div
          ref={textRef}
          className={`flex-1 flex flex-col justify-center transition-all duration-700 ease-out ${
            textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <h2 className="text-3xl mb-11 text-center">About Me</h2>
          <p className="bg-neutral-800 rounded-xl px-6 py-8 text-lg leading-relaxed">
            A curious and creative problem-solver interested in how technology, business, and user needs come together to create
            better products and solutions. I enjoy exploring problems from different perspectives and turning ideas into practical
            digital experiences. With a blend of analytical thinking, creativity, business understanding, and technical knowledge, I am
            particularly interested in business analysis, data analytics and product management.
          </p>
        </div>
        <div
          ref={picRef}
          className={`flex-1 flex flex-col justify-center transition-all duration-700 ease-out ${
            picVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <img
            src="/images/img 1.jpg" // put your photo at public/images/profile.jpg
            width="180"
            height="420"
            alt="Geethma Samarasinghe"
            className="w-full rounded-xl object-cover shadow-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [sectionRef, visible] = useReveal(0.2);
  return (
    <section id="skills" ref={sectionRef} className="max-w-6xl mx-auto px-5 py-12">
      <h2 className="text-center text-3xl mb-10">Skills</h2>
      <div className="flex flex-wrap justify-between gap-8">
        {skillCategories.map((cat, i) => (
          <div
            key={cat.title}
            style={{ transitionDelay: visible ? `${i * 200}ms` : "0ms" }}
            className={`flex-1 min-w-[250px] bg-neutral-800 rounded-xl p-6 text-center shadow-md hover:-translate-y-1 hover:bg-neutral-700 transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
            }`}
          >
            <h3 className="text-xl mb-5">{cat.title}</h3>
            <ul className="list-none space-y-2.5">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 bg-neutral-900 rounded-lg px-3 py-2 hover:bg-neutral-600 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <img src={item.icon} alt={item.name} className="w-6 h-6" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// Small inline icon so we don't pull in an icon library just for one glyph.
function CodeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16" {...props}>
      <path
        d="M7 6 3 10l4 4M13 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className="group flex flex-col h-full w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:border-neutral-600 hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {project.tools?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tools.map((tool) => (
              <span
                key={tool.name}
                className="inline-flex items-center gap-1.5 bg-neutral-800 rounded-full pl-2 pr-3 py-1 text-xs text-neutral-300"
              >
                <img src={tool.icon} alt="" className="w-3.5 h-3.5" />
                {tool.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-5 pt-4 border-t border-neutral-800 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
            >
              <CodeIcon />
              View project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, visible] = useReveal(0.15);
  return (
    <section id="projects" ref={ref} className="max-w-6xl mx-auto px-5 py-16">
      <div
        className={`transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-center text-3xl mb-2">Projects</h2>
        <p className="text-center text-neutral-400 mb-12">
          A few things I've designed and built along the way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`h-full transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-5 py-24">
      <img
        src="/images/Contact Me.png" // put your contact graphic at public/images/contact-me.png
        width="900"
        height="500"
        alt="Contact Me"
        className="max-w-full h-auto rounded-xl"
      />
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 text-center py-5 px-3 text-sm border-t border-neutral-700">
      <p>© 2025 Geethma Samarasinghe | All Rights Reserved</p>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div
      className="min-h-screen text-neutral-100"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background:
          "radial-gradient(circle at top left, #2a2a2a, #0a0a0a), linear-gradient(135deg, #0a0a0a, #1c1c1c, #2a2a2a)",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <Hero />
      <About />
      <SkillsSection />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}