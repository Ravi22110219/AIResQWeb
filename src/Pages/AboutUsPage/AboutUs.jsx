import { useState, useEffect, useRef } from "react"
import styles from "./AboutUs.module.css"
import { Link } from "react-router-dom"
import Udit_Bhatia from "../../assets/photos/Udit_Bhatia.jpg"
import Auroop_Ganguly from "../../assets/photos/Auroop_Ganguly.jpg"
import Vivek_Kapadia from "../../assets/photos/Vivek_Kapadia.jpg"
import Divya_Upadhyay from "../../assets/photos/Divya_Upadhyay.jpg"
import Brijesh_Patel from "../../assets/photos/brijeshbhi_photo.jpg"
import Subimal_ghosh_Photo from "../../assets/photos/prof-subimal-ghosh.jpg"
import Raghu_Murtugudde from "../../assets/photos/Prof-Raghu.jpeg"
import Amit_Prashant from "../../assets/photos/Prof-amit-prashant.jpg"
import Pranab_Mohapatra from "../../assets/photos/prof-pranab-mohapatra.jpeg"
import Ashok_Jhunjhunwala from "../../assets/photos/ashok-jhunjhunwala.jpg"


const AboutUsPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [expandedAdvisorIndex, setExpandedAdvisorIndex] = useState(null)
  const teamRefs = useRef([])
  const advisorRefs = useRef([])

  const toggleExpanded = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index)
  }

  const toggleAdvisorExpanded = (index) => {
    setExpandedAdvisorIndex(index === expandedAdvisorIndex ? null : index)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    teamRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    advisorRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      teamRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      advisorRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const team = [
    {
      name: "Dr. Udit Bhatia",
      title: "Founder and Director",
      image: Udit_Bhatia,
      description: [
        "Dr. Udit Bhatia is the Co-founder and Director of AIRESQ ClimSol Pvt. Ltd. and an Assistant Professor at the Indian Institute of Technology Gandhinagar, with joint appointments in Civil Engineering and Computer Science & Engineering. His research bridges theoretical modeling and practical applications, focusing on critical infrastructure resilience, physics-guided machine learning for hydrology and urban flooding, and climate variability. Dr. Bhatia has published extensively in top-tier journals, including prestigious Nature Portfolio publications and Environmental Research Letters, shaping both academic discourse and practical policymaking. He is the author of the widely used textbook Critical Infrastructures Resilience: Policy and Engineering Perspectives and holds a U.S. patent for a geospatial networking and analysis system. His work has informed policymakers, influenced sustainable urban design, and garnered national and international media attention, reinforcing his role as a thought leader in resilience and climate risk mitigation.",
      ],
      more: ["LinkedIn"],
    },
    {
      name: "Dr. Auroop Ratan Ganguly",
      title: "Co-founder and Advisor",
      image: Auroop_Ganguly,
      description: [
        "Dr. Auroop Ratan Ganguly is a leading expert in climate resilience, hydrology, and critical infrastructure systems. As a Professor at Northeastern University, Boston, he directs research at the intersection of artificial intelligence, machine learning, and climate science. A recognized innovator and entrepreneur, Dr. Ganguly co-founded multiple startups focused on climate resilience and advanced analytics, bridging the gap between cutting-edge research and real-world applications.  His work has been featured in prestigious platforms like the Intergovernmental Panel on Climate Change (IPCC) reports, shaping global discourse on climate adaptation and disaster risk management. Known for his interdisciplinary approach, he is a trusted advisor to governments, industries, and academic institutions worldwide.",
      ],
      more: ["LinkedIn"],
    },
    {
      name: "Prof. Vivek P. Kapadia",
      title: "Co-founder and Director",
      image: Vivek_Kapadia,
      description: [
        "Vivek P. Kapadia is a Co-founder and Director of AIRESQ ClimSol Pvt. Ltd. and a distinguished civil engineer with over 26 years of expertise in Water Resource Engineering and Management. Renowned for his leadership in large-scale irrigation projects, dam engineering, and river ecology, he has also served as Secretary to the Government of Gujarat, India, where he spearheaded critical water infrastructure initiatives.At AIRESQ, Mr. Kapadia brings his deep understanding of hydraulic systems, participatory irrigation management, and transboundary water policy to drive innovative flood resilience and water resource solutions. A champion of sustainable engineering, he has introduced advanced methodologies such as geosynthetics applications in hydraulic structures and has played a pivotal role in the rejuvenation of ancient water conservation systems.",
      ],
      more: ["LinkedIn"],
    },
    {
      name: "Dr. Divya Upadhyay",
      title: "Co-founder and Director",
      image: Divya_Upadhyay,
      description: [
        "Dr. Divya Dhaval Upadhyay is the Co-founder and Director of AIRESQ ClimSol Pvt. Ltd. and Post-doctoral Fellow at the Indian Institute of Technology Gandhinagar in the Civil Engineering Department. Her research focuses on quantifying climate variability, hydrological modeling, and reservoir operations,  with a mission to translate complex scientific insights into actionable strategies for water resource management and climate adaptation. Dr. Divya is a passionate researcher having research experience at various premier institutes such as the Indian Institute of Technology Kanpur, the Indian Institute of Technology Gandhinagar and Indian Institute of Science Bangalore. Her research has been published in peer-reviewed journals and presented at international conferences, influencing policies on water resource management and climate adaptation. She brings over 5 years of teaching experience from esteemed institutions like Nirma University and L.D. College of Engineering. She has also been recognized with awards and fellowships for academic excellence, demonstrating their commitment to bridging scientific innovation with real-world applications.",
      ],
      more: ["LinkedIn"],
    },
    {
      name: "Mr. Brijeshbhai Patel",
      title: "Director",
      image: Brijesh_Patel,
      description: [
        "Mr. Brijeshbhai Patel is the Director of AIRESQ ClimSol Pvt. Ltd. and a seasoned professional with extensive experience in project management and execution in the civil engineering sector. He has been instrumental in driving various infrastructure projects, ensuring they are completed on time and within budget. His expertise lies in stakeholder management, resource allocation, and risk assessment, making him a key player in the successful delivery of projects. Mr. Patel is committed to fostering innovation and sustainability in engineering practices, and he actively promotes the use of advanced technologies to enhance project outcomes.",
      ],
      more: ["LinkedIn"],
    },
  ]

  const advisors = [
    {
      name: "Prof. Subimal Ghosh",
      title: "Professor, Civil Engineering",
      institution: "IIT Bombay",
      image:Subimal_ghosh_Photo,
      description: [
        "Prof. Subimal Ghosh is a distinguished Professor in the Department of Civil Engineering at IIT Bombay. His research expertise spans hydroclimatology, water resources engineering, and climate change impact assessment. He has made significant contributions to understanding monsoon variability, extreme weather events, and their implications for water resource management in India.",
      ],
    },
    {
      name: "Prof. Pranab Mohapatra",
      title: "Professor, Civil Engineering",
      institution: "IIT Gandhinagar",
      image: Pranab_Mohapatra,
      description: [
        "Prof. Pranab Mohapatra is a Professor in the Department of Civil Engineering at IIT Gandhinagar. His research focuses on structural engineering, earthquake engineering, and infrastructure resilience. He has extensive experience in seismic risk assessment and the development of innovative structural systems for enhanced disaster resilience.",
      ],
    },
    {
      name: "Prof. Raghu Murtugudde",
      title: "Emeritus Professor, UMD",
      institution: "Retired Professor, IIT Bombay",
      image: Raghu_Murtugudde,
      description: [
        "Prof. Raghu Murtugudde is an Emeritus Professor at the University of Maryland and a retired Professor from IIT Bombay. He is a renowned climate scientist with expertise in ocean-atmosphere interactions, monsoon dynamics, and climate modeling. His work has significantly advanced our understanding of tropical climate systems and their global implications.",
      ],
    },
    {
      name: "Prof. Amit Prashant",
      title: "Professor, Civil Engineering",
      institution: "IIT Gandhinagar",
      image: Amit_Prashant,
      description: [
        "Prof. Amit Prashant is a Professor in the Department of Civil Engineering at IIT Gandhinagar. His research interests include geotechnical engineering, soil dynamics, and foundation engineering. He has made significant contributions to understanding soil behavior under dynamic loading conditions and the design of resilient foundation systems.",
      ],
    },
    {
      name: "Prof. Ashok Jhunjhunwala",
      title: "Professor, Electrical Engineering",
      institution: "IIT Madras",
      image: Ashok_Jhunjhunwala,
      description: [
        "Prof. Ashok Jhunjhunwala is a Professor in the Department of Electrical Engineering at IIT Madras. He is a pioneer in telecommunications and rural technology development in India. His work spans wireless communications, rural connectivity solutions, and technology innovation for societal impact, making him a valuable advisor for technology-driven climate solutions.",
      ],
    },
  ]

  return (
    <section className={styles.aboutUsSection}>
      <div className={styles.aboutUsBanner}>
        <div className={styles.bannerLinks}>
          <Link to="/">Home</Link> <span>/</span> <Link to="#">About Us</Link>
        </div>

        <div className={styles.bannerContentColumn}>
          <div className={styles.bannerContentCol_1}>
            <h1>About AIResQ</h1>
            <p>
              <strong>AIResQ</strong> is a pioneering initiative committed to addressing resilience challenges through
              cutting-edge research and innovation. Our mission is to empower cities, regions, and nations to adapt,
              thrive, and lead in the face of climate and resilience challenges.
            </p>
            <p>
              Backed by a world-class team of experts in hydrology, climate science, engineering, and AI, we redefine
              what's achievable in disaster risk management.
            </p>
          </div>
          <div className={styles.bannerContentCol_2}>
            <img src="https://i.pinimg.com/originals/a5/2b/23/a52b232810587be914eab7c004e9fb08.gif" alt="About Us" />
          </div>
        </div>
      </div>

      <div className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>
          At <strong>AIRESQ</strong>, we strive to bridge science, policy, and engineering to create scalable solutions
          for resilience planning. Our work is grounded in research excellence, validated by real-world practices, and
          driven by advancements in AI and machine learning.
        </p>
      </div>

      <section className={styles.directorsSection}>
        <div className={styles.mainContHeading}>
          <div className={styles.mainContHeadText}>
            <h1 className={styles.directorsHeading}>Meet Our Founders & Directors</h1>
          </div>
        </div>
        <div id="about" className={styles.about}>
          {team.map((member, index) => (
            <div
              key={index}
              className={`${styles.row} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
              ref={(el) => (teamRefs.current[index] = el)}
            >
              <div className={styles.col1}>
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
                <h1 className={styles.title}>{member.name}</h1>
                <h3 className={styles.subtitle}>{member.title}</h3>
              </div>
              <div className={styles.col2}>
                {member.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
                {expandedIndex === index && (
                  <div className={styles.expandedContent}>
                    <p> </p>
                  </div>
                )}
                <div className={styles.buttonsContainer}>
                  <button className={styles.toggleButton} onClick={() => toggleExpanded(index)}>
                    {expandedIndex === index ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.advisorsSection}>
        <div className={styles.mainContHeading2}>
          <div className={styles.mainContHeadText}>
            <h1 className={styles.directorsHeading}>Our Advisors</h1>
          </div>
        </div>

        <div className={styles.advisorsGrid}>
          {advisors.map((advisor, index) => (
            <div key={index} className={styles.advisorCard} ref={(el) => (advisorRefs.current[index] = el)}>
              <div className={styles.advisorImageContainer}>
                <img src={advisor.image || "/placeholder.svg"} alt={advisor.name} className={styles.advisorImage} />
                <div className={styles.advisorOverlay}>
                  <div className={styles.advisorInfo}>
                    <h3 className={styles.advisorName}>{advisor.name}</h3>
                    <p className={styles.advisorTitle}>{advisor.title}</p>
                    <p className={styles.advisorInstitution}>{advisor.institution}</p>
                  </div>
                </div>
              </div>
              <div className={styles.advisorContent}>
                <h3 className={styles.advisorName}>{advisor.name}</h3>
                <p className={styles.advisorTitle}>{advisor.title}</p>
                <p className={styles.advisorInstitution}>{advisor.institution}</p>
             
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default AboutUsPage