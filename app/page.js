"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Typed from "typed.js";
import { scroller } from "react-scroll";
import { motion } from "motion/react";
import { toast, ToastContainer } from "react-toastify";

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-out"
    >
      <div className="img-cont relative w-full h-[250px]">
        <Image className="group-hover:scale-180 group-hover:opacity-15 object-cover object-center origin-top transition-all duration-300 ease-out" fill src={project.img} alt={project.img} />
      </div>
      <div className="p-2 z-10 relative space-y-2">
        <h3 className="font-semibold text-xl">{project.pName}</h3>
        <div className={`${expanded ? "absolute p-2 scale-103 bg-[#1a1a2e] rounded-lg" : ""} transition-all duration-300`}>
          <p className={`text-sm text-gray-300 ${expanded ? "line-clamp-none" : "line-clamp-2"}`}>{project.pDesc}</p>
          <button onClick={() => setExpanded(!expanded)} className="text-cyan-400 text-xs mt-2 hover:underline cursor-pointer">{expanded ? "Show Less" : "Read More"}</button>
        </div>
        <div className={`flex gap-2 ${expanded && "mt-[82.4px]"}`}>
          {project.tech.map((t, i) => {
            return (
              <span key={i} className="bg-cyan-600 text-xs px-2 py-1 rounded-md">{t}</span>
            )
          })}
        </div>
        <div className="w-full">
          <a href={project.github} target="_blank" className="block text-center bg-violet-500 mx-auto w-full px-3 py-1 mt-4 rounded-md cursor-pointer hover:bg-violet-600">GitHub</a>
        </div>
      </div>

    </motion.div>
  );
}


export default function Home() {
  const typedRef = useRef(null)
  const [active, setActive] = useState("home")
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sidebar, setSidebar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const skills = [
    { name: "HTML5", level: 85 },
    { name: "CSS", level: 80 },
    { name: "JavaScript", level: 60 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 60 },
    { name: "Java", level: 40 },
  ]

  const projects = [
    {
      img: "/expense_tracker.jpg",
      alt: "project_image",
      pName: "Expense Tracker",
      pDesc: "A web app to manage daily expenses with categories and real-time updates.",
      tech: ["React", "Next.js"],
      github: "https://github.com/maheshchaudhary845/expense-tracker"
    },
    {
      img: "/bitlink.jpg",
      alt: "project_image",
      pName: "BitLink",
      pDesc: "A simple and efficient URL shortener that generates custom short links, making long URLs easy to share and manage.A simple and efficient URL shortener that generates custom short links, making long URLs easy to share and manage.",
      tech: ["React", "Next.js", "MongoDB"],
      github: "https://github.com/maheshchaudhary845/BitLink-A_URL_Shortener"
    },
    {
      img: "/bittree.png",
      alt: "project_image",
      pName: "BitTree",
      pDesc: "A free, elegant link-in-bio tool built with React, Next.js, and heart.",
      tech: ["React", "Next.js"],
      github: "https://github.com/maheshchaudhary845/BitTree"
    },
    {
      img: "/donate.jpg",
      alt: "project_image",
      pName: "Get Me a Chai",
      pDesc: "This project is about supporting each other by donating money to them. You can donate to your friend, or other creators you like. It is built using Next.js framework.",
      tech: ["React", "Next.js", "MongoDB"],
      github: "https://github.com/maheshchaudhary845/Get_Me_a_Chai-Donation_Platform"
    },
    {
      img: "/password.jpg",
      alt: "project_image",
      pName: "passop - The Password Manager",
      pDesc: "It is a password manager which stores your password on browser's local storage. It is developed using HTML, CSS, JS library React. The user has to enter the Website URL, Username, and Password in order to save the password.",
      tech: ["React", "Next.js"],
      github: "https://github.com/maheshchaudhary845/passop-The-Password-Manager-on-Local-Storage"
    },
    {
      img: "/spotify.jpg",
      alt: "project_image",
      pName: "Spotify - UI Clone",
      pDesc: "This project is built using HTML, CSS and JavaScript only. No backend is included in this project but it includes music player in which you can listen to the local songs.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/maheshchaudhary845/Spotify-Single-Page-Clone"
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0);
    const typed = new Typed(typedRef.current, {
      strings: ["Frontend Developer", "Video Editor", "Full-Stack Engineer"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
    })
    return () => {
      typed.destroy();
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }, {
      rootMargin: "-50% 0px -50% 0px",
    })

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id) => {
    scroller.scrollTo(id, {
      duration: 500,
      smooth: true,
      offset: 0,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!")
        setForm({ name: "", email: "", subject: "", message: "" })
      }
      else {
        toast.error("Failed to send message. Try again.")
      }
      setIsLoading(false)
    }
    catch (error) {
      console.error(error);
      toast.warn("Something went wrong.")
    }
  }

  return (
    <>
      <ToastContainer />
      <aside className={`"sidebar" ${sidebar ? "translate-x-0" : "-translate-x-80"} md:translate-x-0 fixed z-50 transition-all duration-300 ease-in bg-[#040b14] text-white w-[300px] h-screen max-h-screen p-4 overflow-hidden`}>
        <div className="mt-6">
          <div className="flex flex-col items-center gap-3">
            <div className="img-container relative w-[110px] h-[110px] rounded-full overflow-hidden outline-8 outline-gray-800">
              <Image className="object-cover" fill src="/avatar.jpg" alt="avatar" />
            </div>
            <h1 className="text-xl font-semibold">Mahesh Chaudhary</h1>
            <div className="social flex gap-2">
              <a href="https://www.facebook.com/maheshchaudhary845" target="_blank" className="bg-gray-800 hover:bg-sky-600 transition-colors duration-200 cursor-pointer p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://www.instagram.com/maheshchaudhary845" target="_blank" className="bg-gray-800 hover:bg-sky-600 transition-colors duration-200 cursor-pointer p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.1088 20.1088C18.7175 22 16.4783 22 12 22C7.52166 22 5.28249 22 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="#ffffff" strokeWidth="2" />
                  <path d="M17.5078 6.5L17.4988 6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://www.x.com/maheshh078" target="_blank" className="bg-gray-800 hover:bg-sky-600 transition-colors duration-200 cursor-pointer p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
              <a href="https://in.linkedin.com/in/maheshchaudhary845" target="_blank" className="bg-gray-800 hover:bg-sky-600 transition-colors duration-200 cursor-pointer p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M7 10V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.00801 7L6.99902 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.1088 20.1088C18.7175 22 16.4783 22 12 22C7.52166 22 5.28249 22 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://github.com/maheshchaudhary845" target="_blank" className="bg-gray-800 hover:bg-sky-600 transition-colors duration-200 cursor-pointer p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <nav className="mt-4">
          <ul className="flex flex-col gap-1 p-2">
            <li onClick={() => handleClick("home")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "home" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9A9A9A" fill="none">
                  <path d="M12.8924 2.80982L21.4876 9.59547C21.8112 9.85095 22 10.2405 22 10.6528C22 11.3969 21.3969 12 20.6528 12H20V15.5C20 18.3284 20 19.7426 19.1213 20.6213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 20.6213C4 19.7426 4 18.3284 4 15.5V12H3.34716C2.60315 12 2 11.3969 2 10.6528C2 10.2405 2.1888 9.85095 2.5124 9.59547L11.1076 2.80982C11.3617 2.60915 11.6761 2.5 12 2.5C12.3239 2.5 12.6383 2.60915 12.8924 2.80982Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M14.5 22V17C14.5 16.0654 14.5 15.5981 14.299 15.25C14.1674 15.022 13.978 14.8326 13.75 14.701C13.4019 14.5 12.9346 14.5 12 14.5C11.0654 14.5 10.5981 14.5 10.25 14.701C10.022 14.8326 9.83261 15.022 9.70096 15.25C9.5 15.5981 9.5 16.0654 9.5 17V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className={`${active === "home" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Home</span>
              </span>
            </li>
            <li onClick={() => handleClick("about")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "about" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className={`${active === "about" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>About</span>
              </span>
            </li>
            <li onClick={() => handleClick("skills")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "skills" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M5 16L10 13M14 11L19 8M12 5V10M12 14V19M5 8L10 11M14 13L19 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M20.5 9.00001V14.5M13.5 20.5L19 17.5M4.5 17.5L10.5 20.5M3.5 15V9.00001M4.5 6.5L10.5 3.5M19.5 6.5L13.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="3.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="20.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="3.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="20.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="20.5" cy="16.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="3.5" cy="16.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 9.75L14 10.875V13.125L12 14.25L10 13.125V10.875L12 9.75Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span className={`${active === "skills" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Skills</span>
              </span>
            </li>
            <li onClick={() => handleClick("education")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "education" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                  <path d="M5.33333 3.00001C7.79379 2.99657 10.1685 3.88709 12 5.5V21C10.1685 19.3871 7.79379 18.4966 5.33333 18.5C3.77132 18.5 2.99032 18.5 2.64526 18.2792C2.4381 18.1466 2.35346 18.0619 2.22086 17.8547C2 17.5097 2 16.8941 2 15.6629V6.40322C2 4.97543 2 4.26154 2.54874 3.68286C3.09748 3.10418 3.65923 3.07432 4.78272 3.0146C4.965 3.00491 5.14858 3.00001 5.33333 3.00001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M18.6667 3.00001C16.2062 2.99657 13.8315 3.88709 12 5.5V21C13.8315 19.3871 16.2062 18.4966 18.6667 18.5C20.2287 18.5 21.0097 18.5 21.3547 18.2792C21.5619 18.1466 21.6465 18.0619 21.7791 17.8547C22 17.5097 22 16.8941 22 15.6629V6.40322C22 4.97543 22 4.26154 21.4513 3.68286C20.9025 3.10418 20.3408 3.07432 19.2173 3.0146C19.035 3.00491 18.8514 3.00001 18.6667 3.00001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className={`${active === "education" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Education</span>
              </span>
            </li>
            <li onClick={() => handleClick("experience")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "experience" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                  <path d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 7C16 5.11438 16 4.17157 15.4142 3.58579C14.8284 3 13.8856 3 12 3C10.1144 3 9.17157 3 8.58579 3.58579C8 4.17157 8 5.11438 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 11L6.65197 11.202C10.0851 12.266 13.9149 12.266 17.348 11.202L18 11M12 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`${active === "experience" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Experience</span>
              </span>
            </li>
            <li onClick={() => handleClick("projects")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "projects" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M16.2627 10.5H7.73725C5.15571 10.5 3.86494 10.5 3.27143 11.3526C2.67793 12.2052 3.11904 13.4258 4.00126 15.867L5.08545 18.867C5.54545 20.1398 5.77545 20.7763 6.2889 21.1381C6.80235 22 7.47538 22 8.82143 22H15.1786C16.5246 22 17.1976 22 17.7111 21.1381C18.2245 20.7763 18.4545 20.1398 18.9146 18.867L19.9987 15.867C20.881 13.4258 21.3221 12.2052 20.7286 11.3526C20.1351 10.5 18.8443 10.5 16.2627 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                  <path d="M19 8C19 7.53406 19 7.30109 18.9239 7.11732C18.8224 6.87229 18.6277 6.67761 18.3827 6.57612C18.1989 6.5 17.9659 6.5 17.5 6.5H6.5C6.03406 6.5 5.80109 6.5 5.61732 6.57612C5.37229 6.67761 5.17761 6.87229 5.07612 7.11732C5 7.30109 5 7.53406 5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 4C16.5 3.53406 16.5 3.30109 16.4239 3.11732C16.3224 2.87229 16.1277 2.67761 15.8827 2.57612C15.6989 2.5 15.4659 2.5 15 2.5H9C8.53406 2.5 8.30109 2.5 8.11732 2.57612C7.87229 2.67761 7.67761 2.87229 7.57612 3.11732C7.5 3.30109 7.5 3.53406 7.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`${active === "projects" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Projects</span>
              </span>
            </li>
            <li onClick={() => handleClick("contact")} className="cursor-pointer py-2 hover:bg-slate-900 rounded-sm">
              <span className="flex gap-2 items-center">
                <svg className={`${active === "contact" ? "text-cyan-500" : "text-[#9A9A9A]"} transition-all duration-300 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span className={`${active === "contact" ? "text-white" : "text-[#9A9A9A]"} transition-all duration-300 font-medium `}>Contact</span>
              </span>
            </li>
          </ul>
        </nav>
        <Footer />
      </aside>
      <main className="body-container md:ml-[300px] transition-all duration-300 ease-in flex-1 overflow-x-hidden">
        <section id="home" className="grid lg:grid-cols-2 min-h-screen bg-[#242735] lg:p-2 p-5 pt-10 lg:pt-0 text-white overflow-hidden">
          <div onClick={() => setSidebar(!sidebar)} className="fixed z-20 md:hidden top-0 right-0 mt-4 mr-4 bg-cyan-600 rounded-full p-2 cursor-pointer">
            {sidebar ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
              <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M4 5L20 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4 12L20 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4 19L20 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            }
          </div>
          <div className="flex flex-col gap-2 md:gap-4 justify-center lg:min-h-screen lg:align-middle">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-[1320px]:text-5xl min-[1100px]:text-4xl min-[400px]:text-3xl text-2xl font-bold"
            ><span className="text-yellow-400">Mahesh</span> Chaudhary</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="min-[1320px]:text-3xl min-[1100px]:text-2xl min-[400px]:text-2xl text-xl font-medium">I&apos;m <span className="font-semibold underline underline-offset-6 lg:underline-offset-10 decoration-sky-300 lg:decoration-4" ref={typedRef}></span></motion.p>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md lg:text-lg text-sm text-gray-300 text-pretty">a passionate Full-Stack Developer and Programmer who loves building web applications, solving problems, and creating digital experiences.</motion.p>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-fit my-4" >
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 w-fit bg-violet-600 hover:bg-violet-700 transition duration-200 ease-out p-2 px-4 cursor-pointer rounded-lg">
                <span>Download CV</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                  <path d="M16.0001 12C16.0001 12 13.0542 16 12.0001 16C10.946 16 8.00012 12 8.00012 12M12.0001 15.5L12.0001 3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.0001 8C19.2093 8 21.0001 9.79086 21.0001 12V14.5C21.0001 16.8346 21.0001 18.0019 20.5278 18.8856C20.1549 19.5833 19.5834 20.1547 18.8857 20.5277C18.0021 21 16.8348 21 14.5001 21H9.50052C7.16551 21 5.99801 21 5.11426 20.5275C4.41677 20.1546 3.84547 19.5834 3.47258 18.8859C3.00012 18.0021 3.00012 16.8346 3.00012 14.4996V11.999C3.00067 9.79114 4.78999 8.00125 6.99785 8H7.00012" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </a>
          </div>
          <div>
            <div className="flex justify-center items-center h-full">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="img-cont relative w-full h-[400px]">
                <Image className="object-cover" fill src="/pc.gif" alt="Computer animation" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#00182a] min-h-screen text-white p-2">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10">
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex lg:flex-row flex-col justify-center gap-5 mt-10"
          >
            <div className="img-container relative w-full max-w-[200px] h-[200px] rounded-full overflow-hidden border-8 border-gray-800">
              <Image className="object-cover" fill src="/avatar.jpg" alt="avatar" />
            </div>
            <p>
              <span className="font-semibold">Hi, I&apos;m Mahesh Chaudhary</span>, a passionate Full-Stack Developer with a strong foundation in JavaScript, and modern web technologies like React, Next.js, Node.js, Express, and MongoDB.
              <br /> <br />
              I graduated with a BTech in Computer Science and Engineering (2024), and I enjoy building projects that solve real-world problems while also improving my coding and design skills.
              <br /> <br />
              Alongside web development, I&apos;m also skilled in video editing (Premiere Pro & After Effects), which allows me to blend creativity with technical knowledge.
              <br /> <br />
              I&apos;m always curious about learning new technologies, contributing to open-source, and exploring areas like AI integration in web apps.
              <br /> <br />
              My goal is to grow as a software engineer while creating impactful applications and continuously sharpening my skills.
            </p>
          </motion.div>
          <div className="grid xl:grid-cols-2 mt-10 space-y-1 w-fit">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="col1">
              <ul className="flex flex-col gap-1 text-sm md:text-[16px] w-fit">
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Email:</strong>
                  <a href="mailto:mehits7@gmail.com">mehits7@gmail.com</a>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>DOB:</strong>
                  <span>18 April 2001</span>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Phone:</strong>
                  <a href="tel:+917018808347">+91 7018808347</a>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Location:</strong>
                  <span>Himachal Pradesh, India</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="col2">
              <ul className="flex flex-col gap-1 text-sm md:text-[16px] w-fit">
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Hobbies:</strong>
                  <span>Exploring AI integration, video editing</span>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Languages:</strong>
                  <span>Hindi, English, Punjabi</span>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Degree:</strong>
                  <span>B.tech in Computer Science</span>
                </li>
                <li className="flex items-center gap-2 md:gap-4 p-1 md:p-2">
                  <svg className="min-w-fit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#00689d" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <strong>Freelance:</strong>
                  <span>Available for freelance projects</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="bg-[#001f1f] text-white p-2 min-h-screen">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10">
            Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10"
          >
            Here are some of the technologies and tools I&apos;ve worked with. I&apos;m always exploring new technologies to expand my skillset and improve as a developer.
          </motion.p>
          <div className="grid md:grid-cols-2 mt-5">
            {skills.map((skill, index) => {
              return <div key={index} className="w-full p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="h-3 bg-cyan-500 rounded-full"
                  ></motion.div>
                </motion.div>
              </div>
            })}
          </div>
        </section>

        <section id="education" className="relative text-white p-2 min-h-screen">
          <div className="absolute inset-0 bg-cover bg-center bg-[url('/education_bg.jpg')]"></div>
          <div className="absolute bg-black inset-0 opacity-90"></div>
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10">
              Education
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative mt-10 border-l-2 ml-3 border-cyan-500">

              <div className="mb-10 pl-6">
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full border-2 border-white -left-3"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn", delay: 0.3 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">B.tech in Computer Science &amp; Engineering</h3>
                  <p className="text-sm font-medium  ml-4 text-gray-300">2021 - 2024</p>
                  <p className="text-gray-400 font-medium italic">Chandigarh University, Punjab</p>
                </motion.div>
              </div>

              <div className="mb-10 pl-6">
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full border-2 border-white -left-3"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn", delay: 0.4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Diploma in Computer Science &amp; Engineering</h3>
                  <p className="text-sm font-medium  ml-4 text-gray-300">2019 - 2021</p>
                  <p className="text-gray-400 font-medium italic">Govt. Polytechnic Paonta Sahib</p>
                </motion.div>
              </div>

              <div className="mb-10 pl-6">
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full border-2 border-white -left-3"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Class XII - Non-Med (Senior Secondary)</h3>
                  <p className="text-sm font-medium  ml-4 text-gray-300">2018 - 2019</p>
                  <p className="text-gray-400 font-medium italic">Bibi Jeet Kaur Memorial Sr Sec School Paonta Sahib</p>
                </motion.div>
              </div>

              <div className="mb-10 pl-6">
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full border-2 border-white -left-3"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Class X (Matriculation)</h3>
                  <p className="text-sm font-medium  ml-4 text-gray-300">2015 - 2016</p>
                  <p className="text-gray-400 font-medium italic">Guru Nanak Public School Jagatpur</p>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </section>


        <section id="experience" className="relative text-white p-2 min-h-screen">
          <div className="absolute inset-0 bg-cover bg-center bg-[url('/experience_bg.jpg')]"></div>
          <div className="absolute inset-0 bg-black opacity-90"></div>

          <div className="relative z-10 max-w-full w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10"
            >
              Experience
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-full w-full mt-6 text-gray-300 leading-relaxed"
            >
              As a recent Computer Science graduate and aspiring Full-Stack Developer, I may be a fresher in the
              corporate world, but I have actively honed my skills through internships, personal projects, and
              freelance work. My journey includes building real-world applications with the MERN stack, creating
              scalable projects like a Student-Teacher Appointment System, and developing side projects such as
              a password manager, URL shortener, and Spotify clone. Alongside web development, I have freelance
              experience in video editing, which has sharpened my creativity and attention to detail. I’m eager
              to bring this blend of technical expertise, problem-solving ability, and passion for learning into
              a professional role.
            </motion.p>

            <div className="my-16 ml-2 relative border-l-2 border-gray-600 pl-6 space-y-12">
              <div className="relative">
                <div className="absolute -left-9 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                >
                  <h3 className="text-xl font-semibold">Full-Stack Developer Intern</h3>
                  <p className="text-sm text-gray-400">Unified Mentor | Aug 2025 - Oct 2025</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1 text-sm">
                    <li>Built a <strong>Student-Teacher Appointment System</strong> using MERN stack.</li>
                    <li>Developed 4 mini-projects including Expense Tracker, Weather App, Chat App.</li>
                    <li>Improved my skills in frontend (React, Tailwind) and backend (Node.js, MongoDB).</li>
                  </ul>
                </motion.div>
              </div>

              <div className="relative">
                <div className="absolute -left-9 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                >
                  <h3 className="text-xl font-semibold">Personal Projects</h3>
                  <p className="text-sm text-gray-400">Self-Learning | 2025 - Present</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1 text-sm">
                    <li>Created <strong>Passop</strong> – a password manager storing credentials in local storage.</li>
                    <li>Developed <strong>Spotify UI Clone</strong> using HTML, CSS, JS with a local music player.</li>
                    <li>Built <strong>BitLink</strong> – a URL shortener with custom short links (Next.js + MongoDB).</li>
                  </ul>
                </motion.div>
              </div>

              <div className="relative">
                <div className="absolute -left-9 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                >
                  <h3 className="text-xl font-semibold">Freelance Video Editor</h3>
                  <p className="text-sm text-gray-400">Remote | 2022 - Present</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1 text-sm">
                    <li>Edited videos using <strong>Adobe Premiere Pro</strong> & <strong>After Effects</strong>.</li>
                    <li>Created motion graphics and smooth transitions for YouTube creators.</li>
                    <li>Combined technical editing with creative storytelling.</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>


        <section id="projects" className="bg-[#0f0818] text-white p-2 min-h-screen">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10">
            Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-2xl mx-auto mt-6 text-gray-300"
          >
            Here are some of the projects I&apos;ve worked on, showcasing my skills in frontend, backend, and full-stack development.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            {projects.map((project, index) => {
              return <ProjectCard key={index} project={project} />
            })}
          </div>
        </section>

        <section id="contact" className="relative text-white p-2 min-h-screen">
          <div className="absolute inset-0 bg-center bg-[url('/contact_bg.jpg')]"></div>
          <div className="absolute inset-0 bg-black opacity-90"></div>
          <div className="relative z-10">
            <motion.h2

              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl font-semibold underline underline-offset-8 decoration-sky-300 mt-10">
              Contact
            </motion.h2>
            <div className="flex flex-col xl:flex-row mt-20 gap-5 max-w-5xl mx-auto items-center xl:items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-md w-full"
              >
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input required type="text" name="name" value={form.name} onChange={handleChange} className="bg-gray-800 p-4" placeholder="Name" />
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="bg-gray-800 p-4" placeholder="Email" />
                  <input required type="subject" name="subject" value={form.subject} onChange={handleChange} className="bg-gray-800 p-4" placeholder="Subject" />
                  <textarea required type="text" name="message" value={form.message} onChange={handleChange} className="bg-gray-800 p-4 h-40" placeholder="Message" />
                  <button type="submit" className="bg-cyan-500 p-4 cursor-pointer hover:bg-cyan-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>{isLoading ? "Sending" : "Send Message"}</button>
                </form>
              </motion.div>


              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, }}
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col gap-3 max-w-md w-full"
              >
                <div className="flex">
                  <div className="flex justify-center items-center min-w-16 h-16 sm:w-24 sm:h-24 bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#00689d" fill="none">
                      <path d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" stroke="#00689d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M2.01576 13.4756C2.08114 16.5411 2.11382 18.0739 3.24495 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.755 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.755 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08113 7.45882 2.01576 10.5243C1.99474 11.51 1.99474 12.4899 2.01576 13.4756Z" stroke="#00689d" strokeWidth="2" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="flex items-center max-w-full w-full h-16 sm:h-24 bg-gray-900">
                    <a href="mailto:mehits7@gmail.com" className="p-2 hover:underline text-[14px] sm:text-[16px]">mehits7@gmail.com</a>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex justify-center items-center min-w-16 h-16 sm:w-24 sm:h-24 bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#00689d" fill="none">
                      <path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z" stroke="#00689d" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex items-center max-w-full w-full h-16 sm:h-24 bg-gray-900">
                    <a href="tel:+917018808347" className="p-2 hover:underline text-[14px] sm:text-[16px]">+91 7018808347</a>
                  </div>
                </div>
                <iframe className="w-full h-[200px] md:h-[232px] " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.7318702113827!2d77.54146699448337!3d30.49064616850507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f17e4f6856a83%3A0xd6d21e344f1bdae1!2sMatak%20Majri%20pind!5e0!3m2!1sen!2sin!4v1757516062653!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </>

  );
}