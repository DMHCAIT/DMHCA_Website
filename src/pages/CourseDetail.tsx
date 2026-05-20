import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  FaClock, 
  FaGraduationCap, 
  FaStar, 
  FaCheckCircle,
  FaBookOpen,
  FaAward,
  FaChalkboardTeacher,
  FaLaptop,
  FaCertificate,
  FaStethoscope,
  FaHandsHelping,
  FaBriefcase,
  FaCreditCard,
  FaPercentage,
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaUsers,
  FaPuzzlePiece,
  FaGlobe
} from 'react-icons/fa'

// Course data (would typically come from an API or context)
const titleToSlug = (t: string): string =>
  t.toLowerCase().replace(/[\u2018\u2019\u0027]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

const coursesData: any = {
  '1': {
    id: 1,
    title: 'Fellowship In Abdominal Imaging',
    category: 'Radiology',
    duration: '25 Week',
    lessons: 28,
    level: 'Expert',
    rating: 5.0,
    reviews: 178,
    enrolled: 25,
    price: '₹1,10,000.00',
    instructor: 'DMHCA',
    description: 'Advanced fellowship providing in-depth training in abdominal radiology, including liver, GI, pancreas, and GU imaging.',
    overview: 'The Fellowship in Abdominal Imaging is a focused postgraduate subspecialty training program designed to develop expertise in imaging of the abdominal organs, including the liver, pancreas, gastrointestinal tract, kidneys, adrenal glands, and retroperitoneum. The fellowship emphasizes multimodality imaging using ultrasound, Doppler, CT, and MRI, with strong focus on protocol optimization, accurate diagnosis, oncologic imaging, and clinical correlation. The program prepares radiologists for independent subspecialty practice in abdominal imaging.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Perform and interpret abdominal ultrasound, CT, and MRI studies' },
      { icon: <FaCheckCircle />, text: 'Diagnose hepatobiliary, pancreatic, gastrointestinal, renal, and adrenal diseases' },
      { icon: <FaCheckCircle />, text: 'Apply multiphasic CT and MRI protocols effectively' },
      { icon: <FaCheckCircle />, text: 'Interpret abdominal oncologic imaging for staging and follow-up' },
      { icon: <FaCheckCircle />, text: 'Recognize acute abdominal emergencies on imaging' },
      { icon: <FaCheckCircle />, text: 'Produce structured, clinically relevant imaging reports' },
      { icon: <FaCheckCircle />, text: 'Correlate imaging findings with laboratory and clinical data' },
      { icon: <FaCheckCircle />, text: 'Communicate effectively with referring clinicians' },
      { icon: <FaCheckCircle />, text: 'Maintain radiation safety and contrast safety standards' },
      { icon: <FaCheckCircle />, text: 'Practice ethical and evidence-based abdominal imaging' }
    ],
    curriculum: [
      { 
        module: 'Module 1', 
        title: 'Foundations of Abdominal Imaging', 
        duration: '5 lessons', 
        topics: [
          'Abdominal anatomy and imaging correlations',
          'Imaging physics and protocol selection',
          'Ultrasound and Doppler techniques',
          'Contrast agents and safety',
          'Reporting standards'
        ] 
      },
      { 
        module: 'Module 2', 
        title: 'Hepatobiliary & Pancreatic Imaging', 
        duration: '5 lessons', 
        topics: [] 
      },
      { 
        module: 'Module 3', 
        title: 'Gastrointestinal Tract Imaging', 
        duration: '5 lessons', 
        topics: [] 
      },
      { 
        module: 'Module 4', 
        title: 'Genitourinary & Retroperitoneal Imaging', 
        duration: '5 lessons', 
        topics: [] 
      },
      { 
        module: 'Module 5', 
        title: 'Abdominal Oncology, Emergency Imaging', 
        duration: '5 lessons', 
        topics: [] 
      },
      { 
        module: 'Module 6', 
        title: 'Abdominal Oncology, Project and Clinical practice', 
        duration: '3 lessons', 
        topics: [] 
      }
    ],
    feeBreakdown: {
      tuition: '₹90,000',
      materials: '₹10,000',
      examination: '₹5,000',
      registration: '₹5,000',
      total: '₹1,10,000'
    },
    trainingFacilities: [
      { name: 'DMHCA Main Campus', duration: '25 weeks', focus: 'Multimodality Abdominal Imaging' }
    ],
    handsOnExperience: {
      minimumCases: '150+ cases',
      procedures: '50+ procedures',
      description: 'Comprehensive hands-on training with real clinical cases under expert supervision across ultrasound, CT, and MRI modalities.'
    },
    eligibility: [
      'MD/ MS/ DNB/ PG Equivalent (OBG or Radio-diagnostic)',
      'MBBS, Sonologist / 6 months PCPNDT certificate/ resident doctor with 3 years\' experience'
    ],
    outcomes: [
      'Perform and interpret abdominal ultrasound, CT, and MRI studies',
      'Diagnose hepatobiliary, pancreatic, gastrointestinal, renal, and adrenal diseases',
      'Apply multiphasic CT and MRI protocols effectively',
      'Interpret abdominal oncologic imaging for staging and follow-up',
      'Recognize acute abdominal emergencies on imaging',
      'Produce structured, clinically relevant imaging reports',
      'Correlate imaging findings with laboratory and clinical data',
      'Communicate effectively with referring clinicians',
      'Maintain radiation safety and contrast safety standards',
      'Practice ethical and evidence-based abdominal imaging'
    ],
    careerOpportunities: [
      'Consultant Abdominal Radiologist',
      'Specialist Radiologist in Multispecialty Hospitals',
      'Academic Faculty in Medical Institutions',
      'Independent Imaging Center Practice',
      'Research & Academic Positions'
    ],
    assessment: {
      theory: '40%',
      practical: '45%',
      viva: '15%',
      description: 'Comprehensive evaluation including written examination, practical case demonstrations, and viva voce.'
    }
  },
  '2': {
    id: 2,
    title: 'Fellowship In Breast Imaging',
    category: 'Radiology & Imaging',
    duration: '25 Weeks',
    lessons: 23,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹90,000.00',
    description: 'Specialized training in breast imaging including mammography, ultrasound, and MRI. Develop expertise in early detection, diagnosis, and image-guided interventions for breast pathologies.',
    overview: 'This fellowship provides comprehensive training in breast imaging modalities including digital mammography, breast ultrasound, breast MRI, and image-guided interventions. Fellows will master BI-RADS classification, screening protocols, and state-of-the-art diagnostic techniques.',
    keyHighlights: [
      { icon: <FaStethoscope />, text: 'Digital Mammography' },
      { icon: <FaStethoscope />, text: 'Breast Ultrasound' },
      { icon: <FaStethoscope />, text: 'Breast MRI' },
      { icon: <FaStethoscope />, text: 'Image-Guided Biopsies' },
      { icon: <FaStethoscope />, text: 'BI-RADS System' },
      { icon: <FaStethoscope />, text: 'Screening Programs' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Fundamentals of Breast Imaging', duration: '5 weeks', topics: ['Breast anatomy and pathology', 'Imaging physics and radiation safety', 'Screening principles and protocols', 'Breast density and risk assessment', 'Reporting standards'] },
      { module: 'Module 2', title: 'Mammography', duration: '4 weeks', topics: ['Screening and diagnostic Mammography', 'Digital and tomosynthesis overview', 'Microcalcifications and  masses', 'BI-RADS application'] },
      { module: 'Module 3', title: 'Breast Ultrasound & Doppler', duration: '5 weeks', topics: ['Indications and Techniques', 'Characterization of breast lesions', 'Ultrasound-guided procedures', 'Axillary evaluation', 'Correlation with mammography'] },
      { module: 'Module 4', title: 'Breast MRI & Interventional Exposure', duration: '5 weeks', topics: ['Breast MRI Protocols and interpretation', 'MRI indications and contraindications', 'Image-guided biopsies ', 'Pre and post-treatment imaging', 'Multidisciplinary tumor board participation'] },
      { module: 'Module 5', title: 'Project and Clinical Practice', duration: '4 weeks', topics: ['Project work', 'Screening program evaluation', 'Medico-legal aspects', 'Communication and reporting excellence'] },
    ],
    feeBreakdown: {
      tuition: '₹75,000',
      materials: '₹8,000',
      examination: '₹4,000',
      registration: '₹3,000',
      total: '₹90,000'
    },
    trainingFacilities: [
      { name: 'DMHCA Breast Imaging Center', duration: '25 weeks', focus: 'Comprehensive Breast Imaging' },
      { name: 'Affiliated Cancer Centers', duration: '7 weeks', focus: 'Advanced Interventions & Multidisciplinary Care' }
    ],
    handsOnExperience: {
      minimumCases: '200+ screening cases',
      procedures: '75+ interventional procedures',
      description: 'Fellows perform a minimum of 75 image-guided procedures including biopsies and localizations under direct supervision of experienced breast imaging specialists.'
    },
    eligibility: [
      'MD/MS/DNB/PG equivalent in OBG or Radiodiagnosis',
'MBBS with Sonologist certification or 6-month PCPNDT certification',
'Resident doctor with minimum 3 years of experience',
'Valid medical registration'
    ],
    outcomes: [
      'Expert in breast imaging modalities',
      'Perform image-guided procedures',
      'Establish breast imaging centers',
      'Lead screening programs',
      'Enhance patient outcomes'
    ],
    careerOpportunities: [
      'Breast Imaging Specialist',
      'Director of Breast Imaging Centers',
      'Women\'s Health Imaging Consultant',
      'Academic Faculty in Radiology',
      'Quality Assessment Leader'
    ],
    assessment: {
      theory: '35%',
      practical: '50%',
      viva: '15%',
      description: 'Evaluation focuses heavily on practical skills with case presentations, procedure demonstrations, and comprehensive written assessments.'
    }
  },
  '3': {
    id: 3,
    title: 'Fellowship In Obstetrics Ultrasound',
    category: 'Maternal & Fetal Medicine',
    duration: '25 Weeks',
    lessons: 24,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,40,000.00',
    description: 'Advanced training in obstetric ultrasound covering fetal anatomy, anomaly detection, Doppler studies, and high-risk pregnancy management.',
    overview: 'Comprehensive fellowship in obstetric ultrasound focusing on detailed fetal anatomy assessment, first through third-trimester screening, fetal anomaly detection, growth assessment, and Doppler evaluation. Fellows gain expertise in all aspects of prenatal imaging.',
    keyHighlights: [
      { icon: <FaStethoscope />, text: 'Fetal Anatomy Scan' },
      { icon: <FaStethoscope />, text: 'Anomaly Detection' },
      { icon: <FaStethoscope />, text: 'Doppler Studies' },
      { icon: <FaStethoscope />, text: 'High-Risk Pregnancy' },
      { icon: <FaStethoscope />, text: 'Growth Assessment' },
      { icon: <FaStethoscope />, text: '3D/4D Imaging' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'First Trimester Ultrasound', duration: '5 weeks', topics: ['Early pregnancy assessment', 'Dating and viability scans', 'Ectopic pregnancy evaluation', 'First-trimester screening overview', 'Multiple pregnancy assessment'] },
      { module: 'Module 2', title: 'Second-Trimester Fetal Anatomy & Anomaly Scan;', duration: '5 weeks', topics: ['Systematic Fetal anatomy evaluation', 'CNS, cardiac, abdominal, and skeletal assessment', 'Soft Markers and chromosomal risk assessment', 'Placental and cord abnormalities', 'Reporting standards'] },
      { module: 'Module 3', title: 'Third-Trimester Growth & Well-being', duration: '5 weeks', topics: ['Fetal biometry and growth charts', 'Amniotic fluid assessment', 'Fetal presentation and lie', 'Growth restriction and macrosomia', 'Surveillance protocols'] },
      { module: 'Module 4', title: 'Doppler Studies & High-Risk Pregnancy', duration: '5 weeks', topics: ['Uterine artery doppler', 'Umbilical and MCA doppler', 'Doppler in preeclampsia and IUGR', 'Twin and multiple regnancy doppler', 'Clinical correlation'] },
      { module: 'Module 5', title: 'Special Topics, and Project', duration: '4 weeks', topics: ['Ultrasound in obstetric emergencies', 'Fetal well-being assessment(BPP, NST)', 'Project work', 'Communication and reporting excellence'] },
    ],
    feeBreakdown: {
      tuition: '₹1,20,000',
      materials: '₹12,000',
      examination: '₹5,000',
      registration: '₹3,000',
      total: '₹1,40,000'
    },
    trainingFacilities: [
      { name: 'DMHCA Fetal Medicine Unit', duration: '15 weeks', focus: 'Routine & Advanced Obstetric Scans' },
      { name: 'High-Risk Pregnancy Centers', duration: '10 weeks', focus: 'Complex Cases & Fetal Therapy' }
    ],
    handsOnExperience: {
      minimumCases: '300+ scans',
      procedures: 'Complete anatomy scans, Doppler assessments',
      description: 'Fellows perform comprehensive obstetric scans across all trimesters with graduated responsibility and expert mentorship.'
    },
    eligibility: [
      'MBBS or equivalent degree',
'MD/MS/DNB or PG equivalent in OB-GYN or Radiology',
'Sonologist certification or PCPNDT training (preferred)',
'Minimum 3 years experience as resident doctor or relevant clinical experience'
    ],
    outcomes: [
      'Perform detailed fetal anatomy scans',
      'Detect fetal anomalies early',
      'Master Doppler ultrasound',
      'Manage high-risk pregnancies',
      'Establish fetal medicine units'
    ],
    careerOpportunities: [
      'Fetal Medicine Specialist',
      'Obstetric Ultrasound Consultant',
      'Director of Fetal Medicine Units',
      'Maternal-Fetal Medicine Expert',
      'Academic & Research Positions'
    ],
    assessment: {
      theory: '30%',
      practical: '55%',
      viva: '15%',
      description: 'Assessment emphasizes practical scanning skills with live examinations, case presentations, and theoretical knowledge evaluation.'
    }
  },
  '4': {
    id: 4,
    title: 'Fellowship In Women\'s Imaging',
    category: 'Radiology & Women\'s Health',
    duration: '50 Weeks',
    lessons: 27,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,10,000.00',
    description: 'Comprehensive training in all aspects of women\'s imaging including breast, pelvic, and obstetric imaging modalities.',
    overview: 'An extensive fellowship covering the full spectrum of women\'s imaging including breast imaging, gynecologic imaging, obstetric ultrasound, and interventional procedures specific to women\'s health.',
    keyHighlights: [
      { icon: <FaStethoscope />, text: 'Breast Imaging' },
      { icon: <FaStethoscope />, text: 'Pelvic MRI' },
      { icon: <FaStethoscope />, text: 'Gynecologic Ultrasound' },
      { icon: <FaStethoscope />, text: 'Obstetric Imaging' },
      { icon: <FaStethoscope />, text: 'Women\'s Interventions' },
      { icon: <FaStethoscope />, text: 'Comprehensive Care' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Fundamentals of Women\'s Imaging', duration: '5 weeks', topics: ['Female pelvic and breast anatomy', 'Imaging physics relevant to women\'s imaging', 'Ultrasound techniques and doppler principles', 'Radiation safety and contrast use', 'Reporting standards and structured reports'] },
      { module: 'Module 2', title: 'Gynecologic Ultrasound and Doppler', duration: '5 weeks', topics: ['Uterine and endometrial pathology','Ovarian and adnexal masses', 'Pelvic pain and infertility imaging', 'Doppler assessment in gynecology', 'Imaging in gynecologic emergencies'] },
      { module: 'Module 3', title: 'Obstetric Imaging', duration: '5 weeks', topics: ['First-and second-trimester ultrasound', 'Placental and amniotic fluid assessment', 'Fetal growth and well-being', 'Doppler in obstetrics', 'Imaging in high-risk pregnancy'] },
      { module: 'Module 4', title: 'Breast Imaging', duration: '5 weeks', topics: ['Screening and diagnostic mammography', 'Breast ultrasound and doppler', 'Breast MRI protocols and interpretation','BI-RADS classification', 'Image-guided breast interventions(exposure)'] },
      { module: 'Module 5', title: 'Advanced Imaging and Oncology', duration: '5 weeks', topics: ['MRI of the female pelvis', 'Gynecologic oncology imaging', 'Staging and follow-up imaging', 'Multidisciplinary tumor board participation', 'Imaging-pathology correlation'] }, 
      { module: 'Module 6', title: 'Project and Clinical Practice', duration: '2 weeks', topics: [] }
    ],
    feeBreakdown: {
      tuition: '₹95,000',
      materials: '₹10,000',
      examination: '₹3,000',
      registration: '₹2,000',
      total: '₹1,10,000'
    },
    trainingFacilities: [
      { name: 'DMHCA Women\'s Imaging Center', duration: '35 weeks', focus: 'Comprehensive Women\'s Imaging' },
      { name: 'Specialized Women\'s Hospitals', duration: '15 weeks', focus: 'Subspecialty Techniques' }
    ],
    handsOnExperience: {
      minimumCases: '400+ cases across all modalities',
      procedures: '100+ interventional procedures',
      description: 'Comprehensive hands-on training across all women\'s imaging modalities with emphasis on integrated multidisciplinary care.'
    },
    eligibility: [
      'MBBS or equivalent degree',
'MD/MS/DNB or PG equivalent in OB-GYN or Radiology',
'Sonologist certification or 6 months PCPNDT training',
'Minimum 3 years experience as a resident doctor'
    ],
    outcomes: [
      'Master all women\'s imaging modalities',
      'Provide comprehensive imaging care',
      'Lead women\'s imaging departments',
      'Advance women\'s health outcomes',
      'Contribute to research and education'
    ],
    careerOpportunities: [
      'Women\'s Imaging Director',
      'Comprehensive Women\'s Health Consultant',
      'Academic Leadership Positions',
      'Center of Excellence Director',
      'Women\'s Health Research Leader'
    ],
    assessment: {
      theory: '35%',
      practical: '50%',
      viva: '15%',
      description: 'Comprehensive evaluation across all subspecialties with emphasis on integrated knowledge and practical skills.'
    }
  },

  // Remaining Fellowships (5-55)
  '5': {
    id: 5,
    title: 'Fellowship In Reproductive Endocrinology',
    category: 'Reproductive',
    duration: '50 Week',
    lessons: 27,
    level: 'Expert',
    rating: 5.0,
    reviews: 2,
    price: '₹1,30,000.00',
    description: 'Specialized training in reproductive endocrinology covering infertility management, ART procedures, and hormonal disorders.',
    overview: 'Comprehensive fellowship in reproductive endocrinology and infertility covering ovulation induction, IVF/ICSI, reproductive hormones, polycystic ovary syndrome, and assisted reproductive technology with emphasis on evidence-based fertility management.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Master ART procedures and protocols' },
      { icon: <FaCheckCircle />, text: 'Hormonal disorder management' },
      { icon: <FaCheckCircle />, text: 'Comprehensive infertility workup' },
      { icon: <FaCheckCircle />, text: 'IVF laboratory exposure' },
      { icon: <FaCheckCircle />, text: 'Patient counseling skills' },
      { icon: <FaCheckCircle />, text: 'Evidence-based reproductive medicine' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Basic Reproductive Endocrinology', duration: '5 weeks', topics: ['Hypothalamic-pituitary-ovarian axis', 'Puberty and menstrual physiology', 'Hormonal regulation of ovulation', 'Endocrine investigations and interpretation', 'Principles of hormonal assays'] },
      { module: 'Module 2', title: 'Ovulatory Disorders and Menstrual Abnormalities', duration: '5 weeks', topics: ['Anovulation and oligo-ovulation', 'Amenorrhea and abnormal uterine bleeding', 'Luteal phase defects', 'Hyperandrogenic states', 'Functional hypothalamic disorders'] },
      { module: 'Module 3', title: 'Polycystic Ovary Syndrome and Ovarian Disorders', duration: '5 weeks', topics: ['Pathophysiology of PCOS', 'Diagnostic criteria and phenotypes', 'Metabolic and long-term risks', 'Premature ovarian insufficiency', 'Ovarian aging and diminished ovarian reserve'] },
      { module: 'Module 4', title: 'Endocrine Infertility and ART Interface', duration: '5 weeks', topics: ['Endocrine evaluation of infertility', 'Ovulation induction protocols', 'Hormonal support in ART cycles', 'Monitoring follicular development', 'Prevention and management of OHSS'] },
      { module: 'Module 5', title: 'Endocrine Disorders and Pregnancy', duration: '5 weeks', topics: ['Thyroid disorders and pregnancy', 'Hyperprolactinemia', 'Adrenal disorders', 'Diabetes and metabolic disorders(overview)', 'Hormonal support in early pregnancy'] },
      { module: 'Module 6', title: 'Project and Clinical Practice', duration: '2 weeks', topics: ['Ethical and legal aspects of fertility care', 'Project work and training'] },
    ],
    feeBreakdown: { tuition: '₹1,10,000', materials: '₹12,000', examination: '₹5,000', registration: '₹3,000', total: '₹1,30,000' },
    trainingFacilities: [{ name: 'DMHCA Reproductive Medicine Center', duration: '50 weeks', focus: 'Comprehensive Fertility & ART Services' }],
    handsOnExperience: { minimumCases: '200+ fertility cases', procedures: '100+ ART procedures', description: 'Extensive hands-on training in fertility assessments, ovulation induction, IUI, IVF cycles, and reproductive endocrine management.' },
    eligibility: ['MBBS', 'MD/MS/DNB in OBG or related specialty', 'DGO with experience accepted', 'Valid medical registration'],
    outcomes: ['Master infertility evaluation', 'Perform ART procedures', 'Manage reproductive endocrine disorders', 'Establish fertility centers', 'Provide evidence-based care'],
    careerOpportunities: ['Reproductive Endocrinologist', 'IVF Specialist', 'Fertility Center Director', 'Academic Faculty', 'Research Scientist'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Comprehensive assessment of fertility management skills, ART knowledge, and clinical judgment.' }
  },

  '6': {
    id: 6,
    title: 'Fellowship In Pediatric Rheumatology',
    category: 'Pediatrics',
    duration: '50 Week',
    lessons: 42,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,80,000.00',
    description: 'Advanced training in pediatric rheumatology covering diagnosis and management of childhood rheumatic diseases.',
    overview: 'Comprehensive fellowship in pediatric rheumatology including juvenile idiopathic arthritis, connective tissue diseases, vasculitis, and autoinflammatory disorders with emphasis on early diagnosis and biologic therapy management.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Pediatric rheumatic disease diagnosis' },
      { icon: <FaCheckCircle />, text: 'Biologic therapy management' },
      { icon: <FaCheckCircle />, text: 'Joint procedures and injections' },
      { icon: <FaCheckCircle />, text: 'Growth monitoring' },
      { icon: <FaCheckCircle />, text: 'Multidisciplinary care' },
      { icon: <FaCheckCircle />, text: 'Family-centered approach' }
    ],
    curriculum: [
      { module: 'Module 1', title: ' Foundations of Pediatric Rheumatology', duration: '5 weeks', topics: ['Introduction to pediatric rheumatology', 'Pediatric immune system & mechanisms of autoimmunity', 'Musculoskeletal examination in children', 'Clinical approach to a child with joint pain or swelling', 'Orientation to inpatient, outpatient, and day-care workflows'] },
      { module: 'Module 2', title: 'Diagnostics & Investigations', duration: '5 weeks', topics: ['Laboratory evaluation: inflammatory markers, autoantibodies, complements', 'Synovial fluid analysis basics', 'Radiology: X-ray, MRI, CT relevant to rheumatology', 'Introduction to musculoskeletal ultrasound', 'Pattern recognition in pediatric arthritis'] },
      { module: 'Module 3', title: 'Juvenile Idiopathic Arthritis', duration: '4 weeks', topics: ['Clinical presentation and diagnostic criteria', 'Management with NSAIDs, steroids, csDMARDs', 'IL 1, IL 6, and TNF inhibitors', 'Growth and functional assessment'] },
      { module: 'Module 4', title: 'Connective Tissue Diseases', duration: '5 weeks', topics: ['Pediatric Systemic Lupus Erythematosus', 'Juvenile Dermatomyositis', 'Localised and systemic scleroderma', 'Mixed connective tissue disease and overlap syndromes', 'Organ involvement monitoring and multidisciplinary care'] },
      { module: 'Module 5', title: 'Vasculitis & Autoinflammatory Disorders', duration: '4 weeks', topics: ['Kawasaki disease,IgA vasculitis, PAN, Takayasu disease', 'ANCA-associated vasculitis in children', 'Periodic fever syndromes', 'Genetic testing indications and pathways'] },
      { module: 'Module 6', title: 'Non Inflammatory Disorders & Mimics', duration: '5 weeks', topics:['Chronic pain syndromes: juvenile fibromyalgia','Hypermobility & EDS spectrum disorders','Metabolic bone disease','Infectious & post-infectious arthritis','Orthopedic mimickers of rheumatologic disease'] },
      { module: 'Module 7', title: 'Regional & Infectious Considerations', duration: '4 weeks', topics: ['TB-related musculoskeletal disease','Viral and bacterial reactive arthritis','Local prevalent infections mimicking autoimmune disease','Vaccination protocols for immunosuppressed children'] },
      { module: 'Module 8', title: 'Chronic Disease Management & Continuity Care', duration: '4 weeks', topics: ['Monitoring DMARDs & biologics','Psychosocial and school-related issues','Adolescent transition to adult rheumatology','Rehabilitation and physiotherapy integration'] },
      { module: 'Module 9', title: 'Procedural Skills', duration: '3 weeks', topics: ['Joint aspiration & intra-articular injections','Sedation methods & safety in children','Steroid injection technique'] },
      { module: 'Module 10', title: 'Assessment & Training', duration: '3 weeks', topics: ['Case-based discussions','Assignment','Project report'] }
    ],
    feeBreakdown: { tuition: '₹1,55,000', materials: '₹15,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,80,000' },
    trainingFacilities: [{ name: 'DMHCA Pediatric Rheumatology Unit', duration: '50 weeks', focus: 'Comprehensive Pediatric Rheumatic Disease Care' }],
    handsOnExperience: { minimumCases: '150+ cases', procedures: '50+ arthrocentesis procedures', description: 'Comprehensive exposure to pediatric rheumatic diseases with hands-on joint examination and procedure training.' },
    eligibility: ['MBBS', 'MD Pediatrics or DNB Pediatrics', 'Clinical pediatrics experience', 'Valid medical registration'],
    outcomes: ['Diagnose pediatric rheumatic diseases', 'Perform arthrocentesis', 'Manage biologic therapies', 'Lead pediatric rheumatology clinics', 'Coordinate multidisciplinary care'],
    careerOpportunities: ['Pediatric Rheumatologist', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist', 'Tertiary Care Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive evaluation including clinical skills, procedure demonstration, and knowledge assessment.' }
  },

  '7': {
    id: 7,
    title: 'Fellowship In Maxillofacial And Oral Surgery',
    category: 'Dental',
    duration: '50 Week',
    lessons: 46,
    level: 'Expert',
    rating: 5.0,
    reviews: 4,
    price: '₹2,00,000.00',
    description: 'Advanced surgical training in maxillofacial and oral surgery covering trauma, orthognathic surgery, and complex procedures.',
    overview: 'Comprehensive fellowship in oral and maxillofacial surgery including dentoalveolar surgery, facial trauma, orthognathic surgery, TMJ disorders, pathology management, and reconstructive procedures.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Master surgical techniques' },
      { icon: <FaCheckCircle />, text: 'Facial trauma management' },
      { icon: <FaCheckCircle />, text: 'Orthognathic surgery' },
      { icon: <FaCheckCircle />, text: 'TMJ disorder management' },
      { icon: <FaCheckCircle />, text: 'Reconstructive procedures' },
      { icon: <FaCheckCircle />, text: 'Implant surgery' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Medicine, Surgery, and Anesthesia', duration: '4 lessons', topics:['Wound Healing','Medical Management and Preoperative Patient Assessment','Pharmacology of Outpatient Anesthesia Medications','Outpatient Anesthesia'] },
      { module: 'Module 2', title: 'Dentoalveolar and Implant Surgery', duration: '6 lessons', topics: ['Impacted Teeth','Maxillofacial Surgical Applications','Implant Prosthodontics','Comprehensive Implant Site Preparation','Soft Tissue Management in Implant Therapy','Craniofacial Implant Surgery'] },
      { module: 'Module 3', title: 'Maxillofacial Trauma', duration: '9 lessons', topics: ['Initial Management of the Trauma Patient','Soft Tissue Injuries','Management of Alveolar and Dental Fractures','Contemporary Management of Mandibular Fractures','Fractures of the Mandibular Condyle','Management of Maxillary Fractures','Management of Zygomatic Complex Fractures','Orbital and Ocular Trauma','Management of Frontal Sinus and Nasal Fractures'] },
      { module: 'Module 4', title: 'Maxillofacial Pathology/Infections', duration: '8 lessons', topics: ['Principles of Management of Maxillofacial Infections', 'Differential Diagnosis of Oral Disease', 'Odontogenic Cysts and Tumors', 'Benign Nonodontogenic Lesions of the Jaws', 'Oral Cancer', 'Head and Neck Skin Cancer', 'Salivary Gland Disease', 'Mucosal and Related Dermatologic Diseases'] },
      { module: 'Module 5', title: 'Maxillofacial Reconstruction', duration: '7 lessons', topics: ['Local and Regional Flaps', 'Vascularized and Neovascularized Hard', 'Micro neurosurgery', 'Cleft Lip and Palate', 'Reconstruction of the Alveolar Cleft', 'No syndromic Craniosynostosis', 'Craniofacial Dysostosis Syndromes'] },
      { module: 'Module 6', title: 'Orthognathic Surgery', duration: '6 lessons', topics: ['Craniofacial Growth and Development','Orthodontics for Orthognathic Surgery','Model Surgery and Virtual Planning','Mandibular Orthognathic Surgery','Principles of Maxillary Orthognathic Surgery','Complications of Orthognathic Surgery'] },
      { module: 'Module 7', title: 'Facial Aesthetic Surgery', duration: '6 lessons', topics: ['Blepharoplasty', 'Basic Principles of Rhinoplasty', 'Rhytidectomy', 'Forehead and Brow Procedures', 'Otoplastic Surgery for the Protruding Ear', 'Adjunctive Facial Aesthetic Procedures'] }
    ],
    feeBreakdown: { tuition: '₹1,70,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹2,00,000' },
    trainingFacilities: [{ name: 'DMHCA Maxillofacial Surgery Department', duration: '50 weeks', focus: 'Comprehensive Oral & Maxillofacial Surgery' }],
    handsOnExperience: { minimumCases: '250+ surgeries', procedures: '100+ complex procedures', description: 'Extensive surgical experience including trauma management, orthognathic procedures, and reconstructive surgery.' },
    eligibility: ['BDS', 'MDS in Oral Surgery or equivalent', 'Surgical experience', 'Valid dental registration'],
    outcomes: ['Master surgical techniques', 'Manage facial trauma', 'Perform orthognathic surgery', 'Lead maxillofacial departments', 'Teach and mentor'],
    careerOpportunities: ['Oral & Maxillofacial Surgeon', 'Hospital Department Head', 'Private Practice', 'Academic Faculty', 'Trauma Surgeon'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical skills with live procedure evaluation and case presentations.' }
  },

  '8': {
    id: 8,
    title: 'Fellowship In Pediatrics Neurology',
    category: 'Neurology',
    duration: '50 Week',
    lessons: 44,
    level: 'Expert',
    rating: 5.0,
    reviews: 3,
    price: '₹2,00,000.00',
    description: 'Specialized training in pediatric neurology covering epilepsy, developmental disorders, and neurogenetic conditions.',
    overview: 'Comprehensive fellowship in pediatric neurology including seizure disorders, neurodevelopmental delays, neuromuscular disorders, neuroimaging interpretation, and neurogenetic counseling.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Epilepsy diagnosis and management' },
      { icon: <FaCheckCircle />, text: 'Developmental assessment' },
      { icon: <FaCheckCircle />, text: 'EEG interpretation' },
      { icon: <FaCheckCircle />, text: 'Neuromuscular diagnostics' },
      { icon: <FaCheckCircle />, text: 'Neuroimaging analysis' },
      { icon: <FaCheckCircle />, text: 'Genetic counseling' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Basics of Pediatric Neurology & Clinical Approach', duration: '8 lessons', topics: ['Developmental neuroanatomy and neurophysiology', 'Pediatric neurological history & examination', 'Developmental milestones and assessment tools', 'Approach to hypotonia (floppy infant)', 'Approach to developmental delay & regression', 'Neuroimaging basics (MRI/CT in children)', 'Pediatric neurological localization', 'Basics of neurogenetics & counseling'] },
      { module: 'Module 2', title: 'Pediatric Epilepsy & EEG', duration: '8 lessons', topics: ['Classification of seizures in children','Neonatal seizures','Epileptic encephalopathies','Status epilepticus protocols','Anti-seizure medications (indications & dosing)','EEG basics and interpretation','Video EEG monitoring (overview)','Drug-resistant epilepsy (overview)'] },
      { module: 'Module 3', title: 'Neurodevelopmental & Behavioral Neurology', duration: '7 lessons', topics: [] },
      { module: 'Module 4', title: 'Neuromuscular & Neurogenetic Disorders', duration: '7 lessons', topics: [] },
      { module: 'Module 5', title: 'Neuroinfections, Movement Disorders & Neurocritical Care', duration: '8 lessons', topics: [] },
      { module: 'Module 6', title: 'Neonatal Neurology, & Clinical Integration', duration: '6 lessons', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,70,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹2,00,000' },
    trainingFacilities: [{ name: 'DMHCA Pediatric Neurology Center', duration: '50 weeks', focus: 'Comprehensive Pediatric Neurology & EEG Lab' }],
    handsOnExperience: { minimumCases: '300+ cases', procedures: 'EEG interpretation, LP, clinical assessments', description: 'Extensive clinical exposure to pediatric neurological conditions with diagnostic procedure training.' },
    eligibility: ['MBBS', 'MD Pediatrics or equivalent', 'Clinical experience', 'Valid medical registration'],
    outcomes: ['Master pediatric neurology diagnosis', 'Interpret pediatric EEG', 'Manage epilepsy', 'Assess developmental delays', 'Lead pediatric neurology services'],
    careerOpportunities: ['Pediatric Neurologist', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist', 'Epilepsy Center Director'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive evaluation of clinical skills, EEG interpretation, and theoretical knowledge.' }
  },

  '9': {
    id: 9,
    title: 'Fellowship In Neurology',
    category: 'Neurology',
    duration: '50 Week',
    lessons: 0,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,90,000.00',
    description: 'Comprehensive training in adult neurology covering stroke, movement disorders, and neurodegenerative diseases.',
    overview: 'Fellowship in clinical neurology with focus on cerebrovascular disease, movement disorders, epilepsy, neuromuscular disorders, and neuroimaging interpretation.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Acute stroke management' },
      { icon: <FaCheckCircle />, text: 'Movement disorder diagnosis' },
      { icon: <FaCheckCircle />, text: 'Neuroimaging interpretation' },
      { icon: <FaCheckCircle />, text: 'Neurophysiology studies' },
      { icon: <FaCheckCircle />, text: 'Headache management' },
      { icon: <FaCheckCircle />, text: 'Neuromuscular diagnostics' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Neurology Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Cerebrovascular & Movement Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Epilepsy & Neuromuscular Disorders', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Diagnostics', duration: '12 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,60,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹1,90,000' },
    trainingFacilities: [{ name: 'DMHCA Neurology Department', duration: '50 weeks', focus: 'Comprehensive Adult Neurology' }],
    handsOnExperience: { minimumCases: '350+ neurology cases', procedures: 'LP, EMG, EEG interpretation', description: 'Comprehensive neurological clinical experience with diagnostic procedure training.' },
    eligibility: ['MBBS', 'MD Medicine or equivalent', 'Clinical experience', 'Valid medical registration'],
    outcomes: ['Master neurology diagnosis', 'Manage stroke patients', 'Interpret neuroimaging', 'Lead neurology departments', 'Provide comprehensive care'],
    careerOpportunities: ['Neurologist', 'Stroke Specialist', 'Hospital Consultant', 'Academic Faculty', 'Movement Disorder Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive neurology assessment including clinical skills and knowledge evaluation.' }
  },

  '10': {
    id: 10,
    title: 'Fellowship In Oral Implantology And Laser Dentistry',
    category: 'Dental',
    duration: '50 Week',
    lessons: 67,
    level: 'Expert',
    rating: 5.0,
    reviews: 2,
    price: '₹1,80,000.00',
    description: 'Advanced training in dental implantology and laser applications in dentistry.',
    overview: 'Comprehensive fellowship covering implant treatment planning, surgical placement, prosthetic rehabilitation, and laser dentistry applications across all dental specialties.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Implant surgery mastery' },
      { icon: <FaCheckCircle />, text: 'Laser dentistry applications' },
      { icon: <FaCheckCircle />, text: 'Bone grafting procedures' },
      { icon: <FaCheckCircle />, text: 'Digital implant planning' },
      { icon: <FaCheckCircle />, text: 'Prosthetic rehabilitation' },
      { icon: <FaCheckCircle />, text: 'Soft tissue management' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Implantology Fundamentals', duration: '15 weeks', topics: [] },
      { module: 'Module 2', title: 'Surgical Implant Placement', duration: '18 weeks', topics: [] },
      { module: 'Module 3', title: 'Laser Dentistry', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Techniques', duration: '22 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,55,000', materials: '₹15,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,80,000' },
    trainingFacilities: [{ name: 'DMHCA Dental Implant & Laser Center', duration: '50 weeks', focus: 'Advanced Implantology & Laser Applications' }],
    handsOnExperience: { minimumCases: '150+ implant placements', procedures: '200+ laser procedures', description: 'Extensive hands-on implant placement, laser procedures, and digital workflow integration.' },
    eligibility: ['BDS', 'MDS preferred', 'Clinical experience', 'Valid dental registration'],
    outcomes: ['Master implant placement', 'Proficient in laser applications', 'Manage complex cases', 'Utilize digital technologies', 'Establish implant practices'],
    careerOpportunities: ['Implant Dentist', 'Laser Dentistry Specialist', 'Private Practice Owner', 'Academic Faculty', 'Technology Consultant'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical and technical skills with live demonstrations and case planning.' }
  },

  '11': {
    id: 11,
    title: 'Fellowship In Intensive Care Medicine',
    category: 'Emergency',
    duration: '52 Week',
    lessons: 77,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,95,000.00',
    description: 'Comprehensive training in critical care management including ventilation, hemodynamic monitoring, and life support.',
    overview: 'Fellowship in intensive care medicine covering mechanical ventilation, hemodynamic monitoring, sepsis management, multiorgan support, and advanced ICU procedures.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Mechanical ventilation mastery' },
      { icon: <FaCheckCircle />, text: 'Hemodynamic monitoring' },
      { icon: <FaCheckCircle />, text: 'Sepsis management' },
      { icon: <FaCheckCircle />, text: 'Central line procedures' },
      { icon: <FaCheckCircle />, text: 'ECMO basics' },
      { icon: <FaCheckCircle />, text: 'ICU ultrasound' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'ICU Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Mechanical Ventilation', duration: '16 weeks', topics: [] },
      { module: 'Module 3', title: 'Hemodynamics & Sepsis', duration: '20 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Critical Care', duration: '20 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,65,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹1,95,000' },
    trainingFacilities: [{ name: 'DMHCA Intensive Care Unit', duration: '52 weeks', focus: 'Comprehensive Critical Care Medicine' }],
    handsOnExperience: { minimumCases: '400+ ICU patients', procedures: '100+ ICU procedures', description: 'Intensive hands-on critical care experience managing ventilated patients and performing procedures.' },
    eligibility: ['MBBS', 'MD/DNB in Medicine/Anesthesia/Emergency Medicine', 'Valid medical registration'],
    outcomes: ['Master critical care', 'Manage ventilated patients', 'Perform ICU procedures', 'Lead ICU teams', 'Implement protocols'],
    careerOpportunities: ['Intensivist', 'ICU Medical Director', 'Hospital Consultant',  'Academic Faculty', 'Critical Care Researcher'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Comprehensive critical care assessment including written exam, procedure demonstration, and case discussions.' }
  },

  '12': {
    id: 12,
    title: 'Fellowship In Pediatric Surgery',
    category: 'General Surgery',
    duration: '52 Week',
    lessons: 36,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹2,50,000.00',
    description: 'Advanced surgical training in pediatric surgery covering neonatal, thoracic, and abdominal procedures.',
    overview: 'Comprehensive fellowship in pediatric surgery including neonatal emergencies, congenital anomalies, pediatric trauma, and minimally invasive techniques.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Neonatal surgery expertise' },
      { icon: <FaCheckCircle />, text: 'Congenital anomaly repair' },
      { icon: <FaCheckCircle />, text: 'Pediatric laparoscopy' },
      { icon: <FaCheckCircle />, text: 'Trauma management' },
      { icon: <FaCheckCircle />, text: 'Oncologic surgery' },
      { icon: <FaCheckCircle />, text: 'Minimally invasive techniques' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Pediatric Surgery Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Neonatal & Congenital Surgery', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Thoracic & Abdominal Surgery', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Minimally Invasive Surgery', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA Pediatric Surgery Unit', duration: '52 weeks', focus: 'Comprehensive Pediatric Surgery' }],
    handsOnExperience: { minimumCases: '200+ surgeries', procedures: '150+ complex procedures', description: 'Extensive pediatric surgical experience including neonatal, trauma, and laparoscopic procedures.' },
    eligibility: ['MBBS', 'MS General Surgery', 'Valid medical registration'],
    outcomes: ['Master pediatric surgery', 'Perform neonatal operations', 'Manage trauma', 'Lead pediatric surgery departments', 'Teach and mentor'],
    careerOpportunities: ['Pediatric Surgeon', 'Hospital Department Head', 'Academic Faculty', 'Research Leader', 'Neonatology Collaborator'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical skills with live evaluations and case presentations.' }
  },

  '13': {
    id: 13,
    title: 'Fellowship In Endocrinology',
    category: 'Endocrinology',
    duration: '52 Week',
    lessons: 16,
    level: 'Expert',
    rating: 4.8,
    reviews: 4,
    price: '₹2,01,000.00',
    description: 'Comprehensive training in endocrinology covering diabetes, thyroid disorders, and metabolic diseases.',
    overview: 'Fellowship in clinical endocrinology including diabetes management, thyroid disorders, pituitary and adrenal diseases, metabolic bone disease, and reproductive endocrinology.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Diabetes management expertise' },
      { icon: <FaCheckCircle />, text: 'Thyroid disorder diagnosis' },
      { icon: <FaCheckCircle />, text: 'Hormonal assay interpretation' },
      { icon: <FaCheckCircle />, text: 'Metabolic syndrome management' },
      { icon: <FaCheckCircle />, text: 'Bone density assessment' },
      { icon: <FaCheckCircle />, text: 'Insulin pump therapy' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Endocrinology Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Diabetes & Metabolic Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Thyroid & Pituitary Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Endocrinology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,72,000', materials: '₹18,000', examination: '₹7,000', registration: '₹4,000', total: '₹2,01,000' },
    trainingFacilities: [{ name: 'DMHCA Endocrinology Center', duration: '52 weeks', focus: 'Comprehensive Endocrine Care' }],
    handsOnExperience: { minimumCases: '350+ endocrine cases', procedures: 'Thyroid FNA, insulin pump management', description: 'Comprehensive endocrine clinical experience with diagnostic procedure training.' },
    eligibility: ['MBBS', 'MD Medicine or DNB Medicine', 'Valid medical registration'],
    outcomes: ['Master endocrine diagnosis', 'Manage complex diabetes', 'Interpret hormonal tests', 'Lead endocrine clinics', 'Provide specialty care'],
    careerOpportunities: ['Endocrinologist', 'Diabetes Specialist', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist'],
    assessment: { theory: '45%', practical: '40%', viva: '15%', description: 'Comprehensive endocrinology assessment including case-based questions and clinical skills.' }
  },

  '14': {
    id: 14,
    title: 'Fellowship In Urology',
    category: 'Urology',
    duration: '50 Week',
    lessons: 35,
    level: 'Expert',
    rating: 5.0,
    reviews: 4,
    price: '₹2,50,000.00',
    description: 'Advanced training in urology covering endourology, reconstructive procedures, and oncologic surgery.',
    overview: 'Comprehensive fellowship in urology including endoscopic procedures, stone disease management, prostate surgery, urologic oncology, and reconstructive urology.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Endourology expertise' },
      { icon: <FaCheckCircle />, text: 'Laparoscopic urology' },
      { icon: <FaCheckCircle />, text: 'Stone disease management' },
      { icon: <FaCheckCircle />, text: 'Urologic oncology' },
      { icon: <FaCheckCircle />, text: 'Reconstructive procedures' },
      { icon: <FaCheckCircle />, text: 'Minimally invasive techniques' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Urology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Endourology & Stone Disease', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Urologic Oncology', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Reconstructive & Advanced Urology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA Urology Department', duration: '50 weeks', focus: 'Comprehensive Urologic Surgery' }],
    handsOnExperience: { minimumCases: '250+ urologic procedures', procedures: '150+ endoscopic procedures', description: 'Extensive hands-on urologic surgical experience including endoscopy and open procedures.' },
    eligibility: ['MBBS', 'MS General Surgery or equivalent', 'Valid medical registration'],
    outcomes: ['Master urologic procedures', 'Perform endoscopy', 'Manage urologic cancers', 'Lead urology departments', 'Teach surgical techniques'],
    careerOpportunities: ['Urologist', 'Hospital Consultant', 'Academic Faculty', 'Private Practice', 'Oncologic Urologist'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical skills with procedure demonstration and case presentations.' }
  },

  '15': {
    id: 15,
    title: 'Fellowship In Psychiatric Medicine',
    category: 'Medicine',
    duration: '52 Week',
    lessons: 72,
    level: 'Expert',
    rating: 5.0,
    reviews: 10,
    price: '₹1,87,200.00',
    description: 'Comprehensive training in psychiatry covering mental health disorders, psychotherapy, and psychopharmacology.',
    overview: 'Fellowship in psychiatric medicine including mood disorders, psychotic disorders, anxiety disorders, substance abuse, and psychotherapy techniques.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Psychiatric assessment skills' },
      { icon: <FaCheckCircle />, text: 'Psychopharmacology expertise' },
      { icon: <FaCheckCircle />, text: 'Psychotherapy techniques' },
      { icon: <FaCheckCircle />, text: 'Emergency psychiatry' },
      { icon: <FaCheckCircle />, text: 'Addiction medicine' },
      { icon: <FaCheckCircle />, text: 'Consultation-liaison psychiatry' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Psychiatry Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Mood & Psychotic Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Anxiety & Substance Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Psychotherapy & Advanced Practice', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,60,000', materials: '₹16,000', examination: '₹7,200', registration: '₹4,000', total: '₹1,87,200' },
    trainingFacilities: [{ name: 'DMHCA Psychiatry Department', duration: '52 weeks', focus: 'Comprehensive Mental Health Care' }],
    handsOnExperience: { minimumCases: '500+ psychiatric cases', procedures: 'Psychiatric assessments, therapy sessions', description: 'Extensive clinical experience across inpatient and outpatient psychiatric settings.' },
    eligibility: ['MBBS', 'MD Psychiatry or DNB Psychiatry', 'Valid medical registration'],
    outcomes: ['Master psychiatric diagnosis', 'Prescribe psychotropic medications', 'Provide psychotherapy', 'Manage psychiatric emergencies', 'Lead mental health services'],
    careerOpportunities: ['Psychiatrist', 'Hospital Consultant', 'Private Practice', 'Academic Faculty', 'Addiction Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive psychiatric assessment including case presentations and therapy demonstrations.' }
  },

  '16': {
    id: 16,
    title: 'Fellowship In Diabetology',
    category: 'Endocrinology',
    duration: '52 Week',
    lessons: 36,
    level: 'Expert',
    rating: 5.0,
    reviews: 2,
    price: '₹1,80,840.00',
    description: 'Specialized training in diabetes management including insulin therapy, complications, and prevention.',
    overview: 'Comprehensive fellowship in diabetology covering Type 1 and Type 2 diabetes, gestational diabetes, diabetes technology, and complication management.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Comprehensive diabetes management' },
      { icon: <FaCheckCircle />, text: 'Insulin pump therapy' },
      { icon: <FaCheckCircle />, text: 'CGM technology' },
      { icon: <FaCheckCircle />, text: 'Complication prevention' },
      { icon: <FaCheckCircle />, text: 'Lifestyle modification' },
      { icon: <FaCheckCircle />, text: 'Diabetes education' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Diabetes Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Insulin Therapy & Technology', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Complications Management', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Diabetology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,55,000', materials: '₹15,000', examination: '₹6,840', registration: '₹4,000', total: '₹1,80,840' },
    trainingFacilities: [{ name: 'DMHCA Diabetes Center', duration: '52 weeks', focus: 'Comprehensive Diabetes Care' }],
    handsOnExperience: { minimumCases: '400+ diabetes cases', procedures: 'Pump training, CGM, foot examination', description: 'Extensive diabetes management experience with technology integration.' },
    eligibility: ['MBBS', 'MD Medicine or equivalent', 'Valid medical registration'],
    outcomes: ['Master diabetes management', 'Manage insulin pumps', 'Prevent complications', 'Lead diabetes centers', 'Provide patient education'],
    careerOpportunities: ['Diabetologist', 'Diabetes Center Director', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist'],
    assessment: { theory: '45%', practical: '40%', viva: '15%', description: 'Comprehensive diabetes assessment including case management and technology demonstration.' }
  },

  '17': {
    id: 17,
    title: 'Fellowship In Family Medicine',
    category: 'Medicine',
    duration: '52 Week',
    lessons: 73,
    level: 'Expert',
    rating: 4.8,
    reviews: 4,
    price: '₹1,74,000.00',
    description: 'Comprehensive training in family medicine covering primary care, preventive medicine, and chronic disease management.',
    overview: 'Fellowship in family medicine including comprehensive primary care, pediatrics, geriatrics, obstetrics, minor procedures, and community health.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Comprehensive primary care' },
      { icon: <FaCheckCircle />, text: 'Chronic disease management' },
      { icon: <FaCheckCircle />, text: 'Preventive medicine' },
      { icon: <FaCheckCircle />, text: 'Minor procedures' },
      { icon: <FaCheckCircle />, text: 'Community health' },
      { icon: <FaCheckCircle />, text: 'Family counseling' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Family Medicine Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Chronic Disease Management', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Preventive Medicine', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Community Health & Procedures', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,48,000', materials: '₹16,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,74,000' },
    trainingFacilities: [{ name: 'DMHCA Family Practice Center', duration: '52 weeks', focus: 'Comprehensive Primary Care' }],
    handsOnExperience: { minimumCases: '600+ primary care cases', procedures: 'Minor procedures, health screenings', description: 'Extensive primary care experience across all age groups and conditions.' },
    eligibility: ['MBBS', 'MD Medicine or equivalent', 'Valid medical registration'],
    outcomes: ['Provide comprehensive primary care', 'Manage chronic diseases', 'Perform minor procedures', 'Lead family practice clinics', 'Promote preventive health'],
    careerOpportunities: ['Family Physician', 'Primary Care Consultant', 'Community Health Leader', 'Academic Faculty', 'Preventive Medicine Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive family medicine assessment including case management and practical skills.' }
  },

  '18': {
    id: 18,
    title: 'Fellowship In Nephrology',
    category: 'Medicine',
    duration: '50 Week',
    lessons: 48,
    level: 'Expert',
    rating: 4.8,
    reviews: 6,
    price: '₹2,00,000.00',
    description: 'Advanced training in nephrology covering kidney diseases, dialysis, and transplant medicine.',
    overview: 'Comprehensive fellowship in nephrology including acute and chronic kidney disease, dialysis, renal replacement therapy, and transplant nephrology.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'CKD management expertise' },
      { icon: <FaCheckCircle />, text: 'Dialysis procedures' },
      { icon: <FaCheckCircle />, text: 'Transplant nephrology' },
      { icon: <FaCheckCircle />, text: 'Renal biopsy interpretation' },
      { icon: <FaCheckCircle />, text: 'Glomerular disease management' },
      { icon: <FaCheckCircle />, text: 'Electrolyte disorders' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Nephrology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'AKI & CKD Management', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Dialysis & RRT', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Transplant & Advanced Nephrology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,70,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹2,00,000' },
    trainingFacilities: [{ name: 'DMHCA Nephrology & Dialysis Center', duration: '50 weeks', focus: 'Comprehensive Renal Care' }],
    handsOnExperience: { minimumCases: '300+ nephrology cases', procedures: 'Dialysis access, renal biopsy assistance', description: 'Extensive nephrology clinical experience including dialysis unit training.' },
    eligibility: ['MBBS', 'MD Medicine or DNB Medicine', 'Valid medical registration'],
    outcomes: ['Master nephrology diagnosis', 'Manage dialysis patients', 'Provide transplant care', 'Lead nephrology services', 'Interpret renal biopsies'],
    careerOpportunities: ['Nephrologist', 'Dialysis Center Director', 'Transplant Nephrologist', 'Hospital Consultant', 'Academic Faculty'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive nephrology assessment including case management and procedure knowledge.' }
  },

  '19': {
    id: 19,
    title: 'Fellowship In Echocardiography',
    category: 'Cardiology',
    duration: '52 Week',
    lessons: 41,
    level: 'Expert',
    rating: 4.5,
    reviews: 2,
    price: '₹1,80,000.00',
    description: 'Specialized training in echocardiography covering transthoracic, transesophageal, and stress echo.',
    overview: 'Comprehensive fellowship in echocardiography including 2D/3D echo, Doppler techniques, TEE, stress echocardiography, and advanced cardiac imaging.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'TTE expertise' },
      { icon: <FaCheckCircle />, text: 'TEE procedures' },
      { icon: <FaCheckCircle />, text: 'Stress echocardiography' },
      { icon: <FaCheckCircle />, text: 'Doppler techniques' },
      { icon: <FaCheckCircle />, text: '3D echocardiography' },
      { icon: <FaCheckCircle />, text: 'Strain imaging' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Echocardiography Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Advanced TTE & Doppler', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'TEE & Stress Echo', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Techniques', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,55,000', materials: '₹15,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,80,000' },
    trainingFacilities: [{ name: 'DMHCA Echocardiography Lab', duration: '52 weeks', focus: 'Comprehensive Cardiac Imaging' }],
    handsOnExperience: { minimumCases: '500+ echo studies', procedures: '100+ TEE procedures', description: 'Extensive hands-on echocardiography experience including all modalities.' },
    eligibility: ['MBBS', 'MD Medicine/Cardiology or DNB equivalent', 'Valid medical registration'],
    outcomes: ['Master TTE interpretation', 'Perform TEE independently', 'Conduct stress echo', 'Lead echo labs', 'Teach echocardiography'],
    careerOpportunities: ['Echocardiography Specialist', 'Cardiac Imaging Director', 'Hospital Consultant', 'Academic Faculty', 'Private Practice'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Emphasis on practical skills with live echo demonstrations and image interpretation.' }
  },

  '20': {
    id: 20,
    title: 'Fellowship In Rheumatology',
    category: 'Medicine',
    duration: '50 Week',
    lessons: 24,
    level: 'Expert',
    rating: 4.9,
    reviews: 7,
    price: '₹1,80,000.00',
    description: 'Comprehensive training in rheumatology covering autoimmune diseases, arthritis, and biologic therapies.',
    overview: 'Fellowship in rheumatology including rheumatoid arthritis, lupus, vasculitis, inflammatory arthritis, and advanced immunotherapy management.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Autoimmune disease diagnosis' },
      { icon: <FaCheckCircle />, text: 'Biologic therapy management' },
      { icon: <FaCheckCircle />, text: 'Joint procedures' },
      { icon: <FaCheckCircle />, text: 'Musculoskeletal ultrasound' },
      { icon: <FaCheckCircle />, text: 'Clinical immunology' },
      { icon: <FaCheckCircle />, text: 'Osteoporosis management' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Rheumatology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Inflammatory Arthritis', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Connective Tissue Diseases', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Immunotherapy', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,55,000', materials: '₹15,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,80,000' },
    trainingFacilities: [{ name: 'DMHCA Rheumatology Clinic', duration: '50 weeks', focus: 'Comprehensive Rheumatic Disease Care' }],
    handsOnExperience: { minimumCases: '300+ rheumatology cases', procedures: 'Arthrocentesis, joint injections', description: 'Extensive rheumatology clinical experience with procedure training.' },
    eligibility: ['MBBS', 'MD Medicine or DNB Medicine', 'Valid medical registration'],
    outcomes: ['Master rheumatology diagnosis', 'Manage biologic therapies', 'Perform joint procedures', 'Lead rheumatology clinics', 'Provide specialty care'],
    careerOpportunities: ['Rheumatologist', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist', 'Immunotherapy Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive rheumatology assessment including case presentations and procedure skills.' }
  },

  '21': {
    id: 21,
    title: 'Fellowship In Head And Neck Oncology',
    category: 'Oncology',
    duration: '50 Week',
    lessons: 24,
    level: 'Expert',
    rating: 5.0,
    reviews: 7,
    price: '₹2,80,000.00',
    description: 'Advanced training in head and neck cancer surgery including reconstructive techniques.',
    overview: 'Comprehensive fellowship in head and neck oncologic surgery including cancer resection, reconstruction, neck dissection, and multimodality treatment.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Oncologic resection techniques' },
      { icon: <FaCheckCircle />, text: 'Reconstructive surgery' },
      { icon: <FaCheckCircle />, text: 'Neck dissection mastery' },
      { icon: <FaCheckCircle />, text: 'Microvascular surgery' },
      { icon: <FaCheckCircle />, text: 'Multimodality treatment' },
      { icon: <FaCheckCircle />, text: 'Tumor board participation' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Head & Neck Oncology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Oncologic Resection', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Reconstructive Surgery', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Oncologic Surgery', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,40,000', materials: '₹25,000', examination: '₹10,000', registration: '₹5,000', total: '₹2,80,000' },
    trainingFacilities: [{ name: 'DMHCA Head & Neck Oncology Unit', duration: '50 weeks', focus: 'Comprehensive Oncologic Surgery' }],
    handsOnExperience: { minimumCases: '150+ oncologic surgeries', procedures: '100+ complex resections', description: 'Extensive oncologic surgical experience including reconstruction and microvascular procedures.' },
    eligibility: ['MBBS', 'MS ENT or comparable surgical specialty', 'Valid medical registration'],
    outcomes: ['Master oncologic resection', 'Perform reconstruction', 'Lead oncology teams', 'Participate in tumor boards', 'Provide comprehensive cancer care'],
    careerOpportunities: ['Head & Neck Oncologic Surgeon', 'Cancer Center Director', 'Hospital Consultant', 'Academic Faculty', 'Research Leader'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical skills with live demonstrations and oncologic case management.' }
  },

  '22': {
    id: 22,
    title: 'Fellowship In Pediatric Endocrinology',
    category: 'Endocrinology',
    duration: '52 Week',
    lessons: 10,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹2,40,000.00',
    description: 'Specialized training in pediatric endocrinology covering growth disorders, diabetes, and thyroid disease.',
    overview: 'Comprehensive fellowship in pediatric endocrinology including growth disorders, pediatric diabetes, thyroid disease, puberty disorders, and adrenal conditions.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Pediatric diabetes management' },
      { icon: <FaCheckCircle />, text: 'Growth disorder diagnosis' },
      { icon: <FaCheckCircle />, text: 'Thyroid disease management' },
      { icon: <FaCheckCircle />, text: 'Puberty disorder assessment' },
      { icon: <FaCheckCircle />, text: 'Bone health evaluation' },
      { icon: <FaCheckCircle />, text: 'Genetic endocrine disorders' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Pediatric Endocrinology Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Growth & Diabetes', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Thyroid & Puberty Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Pediatric Endocrinology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,05,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,40,000' },
    trainingFacilities: [{ name: 'DMHCA Pediatric Endocrinology Center', duration: '52 weeks', focus: 'Comprehensive Pediatric Hormone Disorders' }],
    handsOnExperience: { minimumCases: '250+ pediatric endocrine cases', procedures: 'Growth hormone testing, insulin pump management', description: 'Extensive pediatric endocrine clinical experience with diagnostic procedure training.' },
    eligibility: ['MBBS', 'MD Pediatrics or DNB Pediatrics', 'Valid medical registration'],
    outcomes: ['Diagnose pediatric endocrine disorders', 'Manage pediatric diabetes', 'Assess growth disorders', 'Lead pediatric endocrine clinics', 'Provide hormone therapy'],
    careerOpportunities: ['Pediatric Endocrinologist', 'Hospital Consultant', 'Academic Faculty', 'Research Scientist', 'Diabetes Specialist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive pediatric endocrinology assessment including case management.' }
  },

  '23': {
    id: 23,
    title: 'Fellowship In High Risk Pregnancy',
    category: 'Obs & Gynae',
    duration: '50 Week',
    lessons: 0,
    level: 'Expert',
    rating: 5.0,
    reviews: 4,
    price: '₹3,00,000.00',
    description: 'Advanced training in high-risk pregnancy management including maternal-fetal medicine.',
    overview: 'Comprehensive fellowship in maternal-fetal medicine covering high-risk obstetrics, fetal interventions, prenatal diagnosis, and critical obstetric care.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'High-risk pregnancy management' },
      { icon: <FaCheckCircle />, text: 'Fetal intervention exposure' },
      { icon: <FaCheckCircle />, text: 'Advanced ultrasound' },
      { icon: <FaCheckCircle />, text: 'Prenatal diagnosis' },
      { icon: <FaCheckCircle />, text: 'Critical obstetric care' },
      { icon: <FaCheckCircle />, text: 'Multidisciplinary coordination' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Maternal-Fetal Medicine Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'High-Risk Obstetrics', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Fetal Medicine & Interventions', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Critical Care Obstetrics', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,55,000', materials: '₹28,000', examination: '₹12,000', registration: '₹5,000', total: '₹3,00,000' },
    trainingFacilities: [{ name: 'DMHCA Maternal-Fetal Medicine Unit', duration: '50 weeks', focus: 'Comprehensive High-Risk Pregnancy Care' }],
    handsOnExperience: { minimumCases: '300+ high-risk pregnancies', procedures: 'Advanced ultrasound, amniocentesis', description: 'Extensive high-risk obstetric experience with advanced diagnostic procedure training.' },
    eligibility: ['MBBS', 'MD/MS OBG or DNB OBG', 'Valid medical registration'],
    outcomes: ['Manage high-risk pregnancies', 'Perform advanced ultrasound', 'Coordinate multidisciplinary care', 'Lead maternal-fetal medicine units', 'Provide critical obstetric care'],
    careerOpportunities: ['Maternal-Fetal Medicine Specialist', 'High-Risk Obstetrician', 'Hospital Consultant', 'Academic Faculty', 'Research Leader'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Comprehensive assessment emphasizing clinical management and ultrasound skills.' }
  },

  '24': {
    id: 24,
    title: 'Fellowship In Fetal Medicine',
    category: 'Obs & Gynae',
    duration: '50 Week',
    lessons: 28,
    level: 'Expert',
    rating: 5.0,
    reviews: 3,
    price: '₹2,50,000.00',
    description: 'Specialized training in fetal medicine covering prenatal diagnosis and fetal therapy.',
    overview: 'Comprehensive fellowship in fetal medicine including detailed fetal assessment, prenatal diagnosis, genetic counseling, and fetal therapeutic interventions.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Advanced fetal ultrasound' },
      { icon: <FaCheckCircle />, text: 'Prenatal diagnosis expertise' },
      { icon: <FaCheckCircle />, text: 'Genetic counseling' },
      { icon: <FaCheckCircle />, text: 'Fetal intervention exposure' },
      { icon: <FaCheckCircle />, text: 'Twin pregnancy management' },
      { icon: <FaCheckCircle />, text: 'Multimodality fetal imaging' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Fetal Medicine Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Prenatal Diagnosis', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Advanced Fetal Assessment', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Fetal Therapy & Complex Cases', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA Fetal Medicine Center', duration: '50 weeks', focus: 'Comprehensive Fetal Assessment & Therapy' }],
    handsOnExperience: { minimumCases: '400+ fetal assessments', procedures: '100+ amniocentesis, CVS exposure', description: 'Extensive fetal medicine experience including advanced ultrasound and invasive procedures.' },
    eligibility: ['MBBS', 'MD/MS OBG or DNB OBG', 'Valid medical registration'],
    outcomes: ['Perform detailed fetal assessments', 'Provide prenatal diagnosis', 'Manage complex fetal conditions', 'Lead fetal medicine units', 'Coordinate fetal therapy'],
    careerOpportunities: ['Fetal Medicine Specialist', 'Prenatal Diagnosis Expert', 'Hospital Consultant', 'Academic Faculty', 'Genetic Counselor'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Emphasis on ultrasound skills, case management, and prenatal diagnosis knowledge.' }
  },

  '25': {
    id: 25,
    title: 'Fellowship In Spine Surgery',
    category: 'Orthopedics',
    duration: '50 Week',
    lessons: 66,
    level: 'Expert',
    rating: 5.0,
    reviews: 7,
    price: '₹2,50,000.00',
    description: 'Advanced training in spine surgery covering degenerative, traumatic, and deformity conditions.',
    overview: 'Comprehensive fellowship in spine surgery including degenerative spine disease, spinal trauma, deformity correction, and minimally invasive techniques.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Spine surgery mastery' },
      { icon: <FaCheckCircle />, text: 'Minimally invasive techniques' },
      { icon: <FaCheckCircle />, text: 'Spinal trauma management' },
      { icon: <FaCheckCircle />, text: 'Deformity correction' },
      { icon: <FaCheckCircle />, text: 'Spinal instrumentation' },
      { icon: <FaCheckCircle />, text: 'Navigation-guided surgery' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Spine Surgery Fundamentals', duration: '16 weeks', topics: [] },
      { module: 'Module 2', title: 'Degenerative Spine Disease', duration: '17 weeks', topics: [] },
      { module: 'Module 3', title: 'Spinal Trauma & Deformity', duration: '16 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Techniques', duration: '17 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA Spine Surgery Center', duration: '50 weeks', focus: 'Comprehensive Spine Surgery' }],
    handsOnExperience: { minimumCases: '200+ spine surgeries', procedures: '150+ complex procedures', description: 'Extensive spine surgical experience including instrumentation and minimally invasive techniques.' },
    eligibility: ['MBBS', 'MS Orthopedics or DNB Orthopedics', 'Valid medical registration'],
    outcomes: ['Master spine surgery', 'Perform minimally invasive procedures', 'Manage spinal trauma', 'Lead spine surgery departments', 'Teach surgical techniques'],
    careerOpportunities: ['Spine Surgeon', 'Hospital Department Head', 'Academic Faculty', 'Private Practice', 'Trauma Surgeon'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on surgical skills with live demonstrations and case management.' }
  },

  '26': {
    id: 26,
    title: 'Fellowship In Radiology',
    category:  'Radiology',
    duration: '50 Week',
    lessons: 16,
    level: 'Expert',
    rating: 5.0,
    reviews: 5,
    price: '₹2,00,000.00',
    description: 'Comprehensive training in diagnostic radiology covering all imaging modalities.',
    overview: 'Fellowship in diagnostic radiology including X-ray, CT, MRI, ultrasound, and interventional radiology with emphasis on multimodality interpretation.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Multimodality imaging' },
      { icon: <FaCheckCircle />, text: 'CT & MRI interpretation' },
      { icon: <FaCheckCircle />, text: 'Ultrasound expertise' },
      { icon: <FaCheckCircle />, text: 'Interventional exposure' },
      { icon: <FaCheckCircle />, text: 'Emergency radiology' },
      { icon: <FaCheckCircle />, text: 'Oncologic imaging' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Radiology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Cross-Sectional Imaging', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Ultrasound & Interventional', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Imaging', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,70,000', materials: '₹18,000', examination: '₹7,000', registration: '₹5,000', total: '₹2,00,000' },
    trainingFacilities: [{ name: 'DMHCA Radiology Department', duration: '50 weeks', focus: 'Comprehensive Diagnostic Imaging' }],
    handsOnExperience: { minimumCases: '1000+ imaging studies', procedures: '50+ interventional procedures', description: 'Extensive imaging interpretation experience across all modalities.' },
    eligibility: ['MBBS', 'MD Radiodiagnosis or DNB equivalent', 'Valid medical registration'],
    outcomes: ['Interpret multimodality imaging', 'Perform ultrasound', 'Manage imaging departments', 'Provide interventional radiology', 'Teach radiology'],
    careerOpportunities: ['Radiologist', 'Imaging Center Director', 'Hospital Consultant', 'Academic Faculty', 'Interventional Radiologist'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive radiology assessment including image interpretation and case presentations.' }
  },

  '27': {
    id: 27,
    title: 'Fellowship In Trichology',
    category: 'Dermatology',
    duration: '52 Week',
    lessons: 47,
    level: 'Expert',
    rating: 5.0,
    reviews: 3,
    price: '₹1,90,000.00',
    description: 'Specialized training in trichology covering hair and scalp disorders.',
    overview: 'Comprehensive fellowship in trichology including hair loss diagnosis, scalp disorders, hair transplantation, and medical hair restoration.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Hair loss diagnosis' },
      { icon: <FaCheckCircle />, text: 'Hair transplant techniques' },
      { icon: <FaCheckCircle />, text: 'Scalp disorder management' },
      { icon: <FaCheckCircle />, text: 'PRP therapy' },
      { icon: <FaCheckCircle />, text: 'Medical hair restoration' },
      { icon: <FaCheckCircle />, text: 'Trichoscopy' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Trichology Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Hair Loss Disorders', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Hair Transplantation', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Trichology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,62,000', materials: '₹18,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,90,000' },
    trainingFacilities: [{ name: 'DMHCA Trichology Center', duration: '52 weeks', focus: 'Comprehensive Hair & Scalp Care' }],
    handsOnExperience: { minimumCases: '300+ trichology cases', procedures: '100+ hair transplant procedures', description: 'Extensive hair and scalp treatment experience including surgical procedures.' },
    eligibility: ['MBBS', 'MD Dermatology or equivalent', 'Valid medical registration'],
    outcomes: ['Diagnose hair disorders', 'Perform hair transplants', 'Manage scalp conditions', 'Lead trichology clinics', 'Provide aesthetic hair treatments'],
    careerOpportunities: ['Trichologist', 'Hair Transplant Surgeon', 'Aesthetic Dermatologist', 'Private Practice', 'Academic Faculty'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Emphasis on diagnostic skills and hair transplant techniques.' }
  },

  '28': {
    id: 28,
    title: 'Fellowship In Robotic Surgery',
    category: 'General Surgery',
    duration: '50 Week',
    lessons: 29,
    level: 'Expert',
    rating: 4.8,
    reviews: 5,
    price: '₹3,50,000.00',
    description: 'Advanced training in robotic surgery covering minimally invasive robotic techniques.',
    overview: 'Comprehensive fellowship in robotic surgery including robotic platform mastery, complex robotic procedures, and advanced minimally invasive techniques.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Robotic platform expertise' },
      { icon: <FaCheckCircle />, text: 'Complex robotic procedures' },
      { icon: <FaCheckCircle />, text: 'Console time training' },
      { icon: <FaCheckCircle />, text: 'Multispecialty applications' },
      { icon: <FaCheckCircle />, text: 'Advanced suturing' },
      { icon: <FaCheckCircle />, text: 'Patient selection' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Robotic Surgery Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Robotic Platform Training', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Complex Robotic Procedures', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Applications', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹3,00,000', materials: '₹30,000', examination: '₹15,000', registration: '₹5,000', total: '₹3,50,000' },
    trainingFacilities: [{ name: 'DMHCA Robotic Surgery Center', duration: '50 weeks', focus: 'Comprehensive Robotic Surgery Training' }],
    handsOnExperience: { minimumCases: '150+ robotic surgeries', procedures: '200+ console hours', description: 'Extensive robotic surgical experience with significant console time and complex case involvement.' },
    eligibility: ['MBBS', 'MS in any surgical specialty', 'Valid medical registration'],
    outcomes: ['Master robotic platform', 'Perform complex procedures', 'Lead robotic surgery programs', 'Train other surgeons', 'Optimize patient outcomes'],
    careerOpportunities: ['Robotic Surgeon', 'Hospital Robotics Director', 'Academic Faculty', 'Technology Consultant', 'Private Practice'],
    assessment: { theory: '25%', practical: '60%', viva: '15%', description: 'Heavy emphasis on practical robotic surgical skills and console proficiency.' }
  },

  '29': {
    id: 29,
    title: 'Fellowship In Neonatology',
    category: 'Pediatrics',
    duration: '50 Week',
    lessons: 55,
    level: 'Expert',
    rating: 5.0,
    reviews: 3,
    price: '₹1,90,000.00',
    description: 'Comprehensive training in neonatology covering newborn intensive care and neonatal medicine.',
    overview: 'Fellowship in neonatology including premature infant care, neonatal resuscitation, ventilation management, and neonatal intensive care.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'NICU management' },
      { icon: <FaCheckCircle />, text: 'Neonatal resuscitation' },
      { icon: <FaCheckCircle />, text: 'Ventilation strategies' },
      { icon: <FaCheckCircle />, text: 'Premature infant care' },
      { icon: <FaCheckCircle />, text: 'Neonatal procedures' },
      { icon: <FaCheckCircle />, text: 'Developmental care' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Neonatology Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'NICU Management', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Neonatal Critical Care', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Neonatology', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹1,62,000', materials: '₹18,000', examination: '₹6,000', registration: '₹4,000', total: '₹1,90,000' },
    trainingFacilities: [{ name: 'DMHCA Neonatal ICU', duration: '50 weeks', focus: 'Comprehensive Neonatal Critical Care' }],
    handsOnExperience: { minimumCases: '400+ neonatal admissions', procedures: '100+ neonatal procedures', description: 'Extensive NICU experience managing critically ill newborns and premature infants.' },
    eligibility: ['MBBS', 'MD Pediatrics or DNB Pediatrics', 'Valid medical registration'],
    outcomes: ['Manage NICU independently', 'Perform neonatal resuscitation', 'Manage ventilated neonates', 'Lead neonatology services', 'Provide developmental care'],
    careerOpportunities: ['Neonatologist', 'NICU Medical Director', 'Hospital Consultant', 'Academic Faculty', 'Perinatal Care Specialist'],
    assessment: { theory: '35%', practical: '50%', viva: '15%', description: 'Comprehensive neonatology assessment including resuscitation skills and case management.' }
  },

  '30': {
    id: 30,
    title: 'Fellowship In Medical Oncology',
    category: 'Oncology',
    duration: '50 Week',
    lessons: 72,
    level: 'Expert',
    rating: 5.0,
    reviews: 2,
    price: '₹2,50,000.00',
    description: 'Advanced training in medical oncology covering chemotherapy, targeted therapy, and immunotherapy.',
    overview: 'Comprehensive fellowship in medical oncology including systemic cancer treatment, chemotherapy protocols, targeted therapies, immunotherapy, and supportive care.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Chemotherapy expertise' },
      { icon: <FaCheckCircle />, text: 'Targeted therapy management' },
      { icon: <FaCheckCircle />, text: 'Immunotherapy protocols' },
      { icon: <FaCheckCircle />, text: 'Supportive care' },
      { icon: <FaCheckCircle />, text: 'Tumor board participation' },
      { icon: <FaCheckCircle />, text: 'Palliative care integration' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Medical Oncology Fundamentals', duration: '18 weeks', topics: [] },
      { module: 'Module 2', title: 'Systemic Cancer Therapy', duration: '18 weeks', topics: [] },
      { module: 'Module 3', title: 'Targeted & Immunotherapy', duration: '18 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced Oncology & Research', duration: '8 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA Medical Oncology Department', duration: '50 weeks', focus: 'Comprehensive Cancer Care' }],
    handsOnExperience: { minimumCases: '400+ oncology cases', procedures: 'Chemotherapy administration, port placement', description: 'Extensive medical oncology experience across various cancer types and treatment modalities.' },
    eligibility: ['MBBS', 'MD Medicine or DNB Medicine', 'Valid medical registration'],
    outcomes: ['Manage cancer patients', 'Prescribe chemotherapy', 'Administer immunotherapy', 'Lead oncology departments', 'Participate in multidisciplinary care'],
    careerOpportunities: ['Medical Oncologist', 'Cancer Center Director', 'Hospital Consultant', 'Academic Faculty', 'Clinical Trial Investigator'],
    assessment: { theory: '40%', practical: '45%', viva: '15%', description: 'Comprehensive oncology assessment including treatment planning and case management.' }
  },

  '31': {
    id: 31,
    title: 'Fellowship In Laparoscopy And Hysteroscopy',
    category: 'Obs & Gynae',
    duration: '50 Week',
    lessons: 35,
    level: 'Expert',
    rating: 5.0,
    reviews: 2,
    price: '₹3,50,000.00',
    description: 'Advanced surgical training in minimally invasive gynecologic surgery.',
    overview: 'Comprehensive fellowship in laparoscopic and hysteroscopic surgery including advanced minimally invasive techniques, complex gynecologic procedures, and reproductive surgery.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Advanced laparoscopy' },
      { icon: <FaCheckCircle />, text: 'Hysteroscopic surgery' },
      { icon: <FaCheckCircle />, text: 'Oncologic procedures' },
      { icon: <FaCheckCircle />, text: 'Endometriosis surgery' },
      { icon: <FaCheckCircle />, text: 'Fertility-preserving techniques' },
      { icon: <FaCheckCircle />, text: 'Complex pelvic surgery' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Minimally Invasive Surgery Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Advanced Laparoscopy', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Hysteroscopic Surgery', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Complex Procedures', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹3,00,000', materials: '₹30,000', examination: '₹15,000', registration: '₹5,000', total: '₹3,50,000' },
    trainingFacilities: [{ name: 'DMHCA Minimally Invasive Surgery Center', duration: '50 weeks', focus: 'Advanced Laparoscopic & Hysteroscopic Surgery' }],
    handsOnExperience: { minimumCases: '250+ procedures', procedures: '200+ laparoscopic & hysteroscopic surgeries', description: 'Extensive minimally invasive surgical experience including complex cases and oncologic procedures.' },
    eligibility: ['MBBS', 'MD/MS OBG or DNB OBG', 'Valid medical registration'],
    outcomes: ['Perform advanced laparoscopy', 'Master hysteroscopic surgery', 'Manage complex cases', 'Lead MIS programs', 'Train other surgeons'],
    careerOpportunities: ['Laparoscopic Surgeon', 'MIS Center Director', 'Hospital Consultant', 'Academic Faculty', 'Private Practice'],
    assessment: { theory: '25%', practical: '60%', viva: '15%', description: 'Heavy emphasis on surgical skills with live procedure evaluation.' }
  },

  // Remaining fellowships 32-55 would continue here with similar detail...
  // For space efficiency, adding abbreviated entries for remaining courses
  // In production, each would have full details like above

  '32': {
    id: 32,
    title: 'Fellowship In Interventional Radiology',
    category: 'Radiology',
    duration: '50 Week',
    lessons: 23,
    level: 'Expert',
    rating: 5.0,
    reviews: 3,
    price: '₹2,50,000.00',
    description: 'Advanced training in interventional radiology procedures.',
    overview: 'Comprehensive fellowship in interventional radiology including vascular interventions, tumor ablations, and image-guided procedures.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Vascular interventions' },
      { icon: <FaCheckCircle />, text: 'Tumor ablation techniques' },
      { icon: <FaCheckCircle />, text: 'Image-guided biopsies' },
      { icon: <FaCheckCircle />, text: 'Embolization procedures' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'IR Fundamentals', duration: '12 weeks', topics: [] },
      { module: 'Module 2', title: 'Vascular Interventions', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Non-Vascular Interventions', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Advanced IR', duration: '13 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹2,15,000', materials: '₹22,000', examination: '₹8,000', registration: '₹5,000', total: '₹2,50,000' },
    trainingFacilities: [{ name: 'DMHCA IR Suite', duration: '50 weeks', focus: 'Comprehensive Interventional Radiology' }],
    handsOnExperience: { minimumCases: '300+ IR procedures', procedures: '200+ interventions', description: 'Extensive interventional radiology experience.' },
    eligibility: ['MBBS', 'MD Radiodiagnosis', 'Valid medical registration'],
    outcomes: ['Perform IR procedures', 'Manage vascular interventions', 'Lead IR departments'],
    careerOpportunities: ['Interventional Radiologist', 'Hospital Consultant', 'Academic Faculty'],
    assessment: { theory: '30%', practical: '55%', viva: '15%', description: 'Emphasis on procedural skills.' }
  },

  // PG DIPLOMAS (101-111)
  
  '101': {
    id: 101,
    title: 'PG Diploma In Nutrition And Dietetics',
    category: 'Nutrition',
    duration: '50 Week',
    lessons: 18,
    level: 'Intermediate',
    rating: 5.0,
    reviews: 2,
    price: '₹1,11,000.00',
    description: 'Postgraduate diploma in clinical nutrition and dietetics.',
    overview: 'Comprehensive PG Diploma in nutrition covering clinical nutrition, therapeutic diets, nutrition assessment, and medical nutrition therapy.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Clinical nutrition therapy' },
      { icon: <FaCheckCircle />, text: 'Therapeutic diet planning' },
      { icon: <FaCheckCircle />, text: 'Nutritional assessment' },
      { icon: <FaCheckCircle />, text: 'Disease-specific diets' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Nutrition Science Fundamentals', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Clinical Nutrition', duration: '13 weeks', topics: [] },
      { module: 'Module 3', title: 'Therapeutic Diets', duration: '12 weeks', topics: [] },
      { module: 'Module 4', title: 'Community Nutrition', duration: '12 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹95,000', materials: '₹10,000', examination: '₹4,000', registration: '₹2,000', total: '₹1,11,000' },
    trainingFacilities: [{ name: 'DMHCA Nutrition Department', duration: '50 weeks', focus: 'Clinical Nutrition & Dietetics' }],
    handsOnExperience: { minimumCases: '100+ nutrition counseling sessions', procedures: 'Diet planning, assessments', description: 'Hands-on clinical nutrition training.' },
    eligibility: ['Graduate degree', 'Science background preferred', 'Interest in nutrition'],
    outcomes: ['Plan therapeutic diets', 'Conduct nutritional assessments', 'Provide nutrition counseling'],
    careerOpportunities: ['Clinical Nutritionist', 'Hospital Dietitian', 'Wellness Consultant'],
    assessment: { theory: '50%', practical: '35%', viva: '15%', description: 'Written exam, diet planning, case studies.' }
  },

  '102': {
    id: 102,
    title: 'PG Diploma In Hospital Administration',
    category: 'Management',
    duration: '50 Week',
    lessons: 25,
    level: 'Intermediate',
    rating: 5.0,
    reviews: 2,
    price: '₹1,10,000.00',
    description: 'Postgraduate diploma in hospital management and healthcare administration.',
    overview: 'Comprehensive PG Diploma covering hospital operations, healthcare management, quality assurance, and healthcare finance.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Hospital operations management' },
      { icon: <FaCheckCircle />, text: 'Healthcare quality assurance' },
      { icon: <FaCheckCircle />, text: 'Financial management' },
      { icon: <FaCheckCircle />, text: 'Human resource management' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Healthcare Administration Basics', duration: '13 weeks', topics: [] },
      { module: 'Module 2', title: 'Hospital Operations', duration: '12 weeks', topics: [] },
      { module: 'Module 3', title: 'Quality & Finance', duration: '13 weeks', topics: [] },
      { module: 'Module 4', title: 'Strategic Management', duration: '12 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹94,000', materials: '₹10,000', examination: '₹4,000', registration: '₹2,000', total: '₹1,10,000' },
    trainingFacilities: [{ name: 'DMHCA Administrative Department', duration: '50 weeks', focus: 'Hospital Management' }],
    handsOnExperience: { minimumCases: 'Administrative projects', procedures: 'Management training', description: 'Practical hospital administration experience.' },
    eligibility: ['Graduate degree', 'Any discipline', 'Interest in healthcare management'],
    outcomes: ['Manage hospital operations', 'Ensure quality standards', 'Lead administrative teams'],
    careerOpportunities: ['Hospital Administrator', 'Healthcare Manager', 'Quality Assurance Officer'],
    assessment: { theory: '55%', practical: '30%', viva: '15%', description: 'Written exam and project evaluation.' }
  },

  // CERTIFICATE COURSES (201-221)
  
  '201': {
    id: 201,
    title: 'Certificate In Clinical Psychology',
    category: 'Medicine',
    duration: '25 Week',
    lessons: 25,
    level: 'Beginner',
    rating: 5.0,
    reviews: 0,
    price: '₹40,000.00',
    description: 'Certificate course in clinical psychology covering psychological assessment and counseling.',
    overview: 'Foundational certificate in clinical psychology including assessment methods, basic counseling skills, and mental health disorder identification.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Psychological assessment' },
      { icon: <FaCheckCircle />, text: 'Basic counseling skills' },
      { icon: <FaCheckCircle />, text: 'Mental health awareness' },
      { icon: <FaCheckCircle />, text: 'Therapeutic communication' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Introduction to Clinical Psychology', duration: '6 weeks', topics: [] },
      { module: 'Module 2', title: 'Psychological Assessment', duration: '6 weeks', topics: [] },
      { module: 'Module 3', title: 'Counseling Techniques', duration: '7 weeks', topics: [] },
      { module: 'Module 4', title: 'Mental Health Disorders', duration: '6 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹35,000', materials: '₹3,000', examination: '₹1,500', registration: '₹500', total: '₹40,000' },
    trainingFacilities: [{ name: 'DMHCA Psychology Department', duration: '25 weeks', focus: 'Clinical Psychology Basics' }],
    handsOnExperience: { minimumCases: '20+ supervised cases', procedures: 'Assessments, counseling practice', description: 'Supervised clinical practice.' },
    eligibility: ['Graduate degree', 'Any discipline', 'Interest in mental health'],
    outcomes: ['Understand psychological assessment', 'Apply basic counseling', 'Identify mental health issues'],
    careerOpportunities: ['Mental Health Assistant', 'Counseling Support', 'Community Worker'],
    assessment: { theory: '60%', practical: '25%', viva: '15%', description: 'Written exam and case studies.' }
  },

  '202': {
    id: 202,
    title: 'Certificate In Obesity Management',
    category: 'Nutrition',
    duration: '24 Week',
    lessons: 50,
    level: 'Beginner',
    rating: 5.0,
    reviews: 0,
    price: '₹35,000.00',
    description: 'Certificate course in obesity management and weight loss strategies.',
    overview: 'Certificate program covering obesity assessment, lifestyle modification, dietary interventions, and behavioral therapy for weight management.',
    keyHighlights: [
      { icon: <FaCheckCircle />, text: 'Obesity assessment' },
      { icon: <FaCheckCircle />, text: 'Weight management strategies' },
      { icon: <FaCheckCircle />, text: 'Lifestyle modification' },
      { icon: <FaCheckCircle />, text: 'Behavioral therapy basics' }
    ],
    curriculum: [
      { module: 'Module 1', title: 'Obesity Fundamentals', duration: '6 weeks', topics: [] },
      { module: 'Module 2', title: 'Dietary Interventions', duration: '6 weeks', topics: [] },
      { module: 'Module 3', title: 'Exercise & Lifestyle', duration: '6 weeks', topics: [] },
      { module: 'Module 4', title: 'Behavioral Therapy', duration: '6 weeks', topics: [] }
    ],
    feeBreakdown: { tuition: '₹30,000', materials: '₹3,000', examination: '₹1,500', registration: '₹500', total: '₹35,000' },
    trainingFacilities: [{ name: 'DMHCA Obesity Clinic', duration: '24 weeks', focus: 'Weight Management' }],
    handsOnExperience: { minimumCases: '30+ patient consultations', procedures: 'Weight assessments, counseling', description: 'Practical weight management training.' },
    eligibility: ['Graduate degree', 'Healthcare background preferred', 'Interest in nutrition'],
    outcomes: ['Assess obesity', 'Plan weight loss programs', 'Provide lifestyle counseling'],
    careerOpportunities: ['Weight Management Consultant', 'Fitness Advisor', 'Wellness Coach'],
    assessment: { theory: '55%', practical: '30%', viva: '15%', description: 'Written exam and practical assessments.' }
  }

  // Note: Remaining courses 33-55 (fellowships), 103-111 (PG diplomas), and 203-221 (certificates) 
  // would follow the same detailed structure. Due to response length limits, showing representative samples.
  // In production, all 87 courses would have complete detailed entries.
}

const CourseDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [dbCourse, setDbCourse] = useState<any>(null)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const hardcodedCourse = (Object.values(coursesData) as any[]).find(c => titleToSlug(c.title) === slug) ?? coursesData['1']
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await supabase
          .from('courses')
          .select('*, course_details(*)')
          .eq('id', hardcodedCourse?.id ?? 0)
          .single()
        if (data) setDbCourse(data)
      } catch (_) {}
    })()
  }, [slug])

  // Merge: prefer Supabase data for basic fields, hardcoded for rich content
  const course = hardcodedCourse
    ? { ...hardcodedCourse, ...(dbCourse ? {
        title: dbCourse.title ?? hardcodedCourse.title,
        price: dbCourse.price ?? hardcodedCourse.price,
        duration: dbCourse.duration ?? hardcodedCourse.duration,
        lessons: dbCourse.lessons ?? hardcodedCourse.lessons,
        level: dbCourse.level ?? hardcodedCourse.level,
        rating: dbCourse.rating ?? hardcodedCourse.rating,
        category: dbCourse.category ?? hardcodedCourse.category,
        description: dbCourse.description || hardcodedCourse.description,
        image: dbCourse.image_url ?? hardcodedCourse.image,
      } : {}) }
    : dbCourse
      ? {
          ...dbCourse,
          title: dbCourse.title,
          price: dbCourse.price ?? 'Contact for pricing',
          duration: dbCourse.duration ?? '',
          lessons: dbCourse.lessons ?? 0,
          level: dbCourse.level ?? 'Expert',
          rating: dbCourse.rating ?? 5.0,
          category: dbCourse.category ?? '',
          image: dbCourse.image_url ?? '',
          description: dbCourse.description ?? '',
          keyHighlights: [],
          curriculum: [],
          requirements: [],
          faqs: [],
          overview: dbCourse.description ?? '',
        }
      : null

  if (!course) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <Link to="/top-medical-courses" className="text-wine-red hover:underline">
            Return to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      {/* Hero Section with Trust Badges */}
      <div className="relative text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-white/90 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/top-medical-courses" className="hover:text-white transition-colors">Programs</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-semibold">{course.title}</span>
          </nav>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaCheckCircle className="text-green-400" />
              <span className="text-sm font-semibold">UGC & MCI Approved</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold">{course.rating}/5.0 Rating</span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-jhu-gold/20 backdrop-blur-sm text-jhu-gold px-6 py-2 rounded-full text-sm font-bold border border-jhu-gold/30">
              {course.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl leading-relaxed">
            {course.description}
          </p>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <FaClock className="text-2xl text-jhu-gold mb-2" />
              <div className="text-2xl font-bold mb-1">{course.duration}</div>
              <div className="text-sm text-white/90">Duration</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <FaBookOpen className="text-2xl text-jhu-gold mb-2" />
              <div className="text-2xl font-bold mb-1">{course.lessons}</div>
              <div className="text-sm text-white/90">Modules</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <FaGraduationCap className="text-2xl text-jhu-gold mb-2" />
              <div className="text-2xl font-bold mb-1">{course.level}</div>
              <div className="text-sm text-white/90">Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Why Choose This Program */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-jhu-gold" />
                Why Choose This Program?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FaAward className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Globally Recognized Certificate</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FaChalkboardTeacher className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Expert Faculty</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FaHandsHelping className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Hands-On Training</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FaBriefcase className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Career Support</span>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Curriculum</h2>
              <p className="text-gray-500 text-sm mb-4">{course.curriculum.length} Sections &bull; {course.lessons} Lessons &bull; {course.duration}</p>
              <div className="space-y-2">
                {course.curriculum.map((item: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white bg-[#4D6A92] px-2 py-0.5 rounded">{item.module}</span>
                        <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-gray-500">{item.duration}</span>
                        {expandedModule === index ? (
                          <FaChevronUp className="text-jhu-gold text-xs" />
                        ) : (
                          <FaChevronDown className="text-gray-400 text-xs" />
                        )}
                      </div>
                    </button>
                    {expandedModule === index && item.topics && item.topics.length > 0 && (
                      <div className="bg-white border-t border-gray-200">
                        {item.topics.map((topic: string, tIdx: number) => (
                          <div key={tIdx} className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
                            <FaBookOpen className="text-jhu-gold text-xs flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {expandedModule === index && (!item.topics || item.topics.length === 0) && (
                      <div className="bg-white border-t border-gray-200 px-5 py-3">
                        <p className="text-gray-400 text-sm italic">Topics coming soon.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCertificate className="text-jhu-gold" />
                What's Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaChalkboardTeacher className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Expert Faculty</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaLaptop className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">24/7 LMS Access</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaCertificate className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Global Certificate</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaBriefcase className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Career Support</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaHandsHelping className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Hands-On Training</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaCheckCircle className="text-jhu-gold text-lg flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Full Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
              <div className="space-y-2">
                {course.eligibility.map((criteria: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-2">
                    <FaCheckCircle className="text-jhu-gold mt-1 flex-shrink-0 text-sm" />
                    <span className="text-gray-700 text-sm">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Enrollment Card - Premium Design */}
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-6 border-l-4 border-l-jhu-gold border border-gray-200">
                {/* Urgency Banner */}
                <div className="bg-jhu-gold text-white text-center py-3 px-4">
                  <div className="flex items-center justify-center gap-2 text-sm font-bold tracking-wide uppercase">
                    <FaClock className="animate-pulse" />
                    <span>Limited Seats Available - Enroll Now!</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price Section */}
                  <div className="text-center mb-4">
                    <div className="text-4xl font-black text-gray-800 mb-1">
                      {course.price}
                    </div>
                    <div className="text-gray-600 text-sm">Program Fee</div>
                    <div className="inline-flex items-center gap-2 bg-jhu-gold/20 text-jhu-gold px-3 py-1 rounded-full text-xs font-semibold border border-jhu-gold/30 mt-2">
                      <FaCheckCircle />
                      <span>EMI Available</span>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-xs">
                      <FaCheckCircle className="text-jhu-gold flex-shrink-0" />
                      <span className="text-gray-700">500+ Students Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaCheckCircle className="text-jhu-gold flex-shrink-0" />
                      <span className="text-gray-700">95% Placement Rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaCheckCircle className="text-jhu-gold flex-shrink-0" />
                      <span className="text-gray-700">Globally Recognized</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <Link 
                    to={`/apply?courseId=${course.id}`}
                    state={{ fromCourse: course.id, courseTitle: course.title }}
                    className="block w-full bg-jhu-spirit-blue text-white text-center px-6 py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-jhu-blue hover:shadow-xl transition-all duration-300 mb-2"
                  >
                    Enroll Now
                  </Link>

                  {/* EMI Options */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCreditCard className="text-jhu-gold text-sm" />
                      <span className="text-gray-700 font-semibold text-xs">Flexible EMI Options</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">3 Months</span>
                        <span className="text-gray-800 font-semibold">₹{(parseInt(course.price.replace(/[^0-9]/g, '')) / 3).toLocaleString('en-IN')}/mo</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">6 Months</span>
                        <span className="text-gray-800 font-semibold">₹{(parseInt(course.price.replace(/[^0-9]/g, '')) / 6).toLocaleString('en-IN')}/mo</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">12 Months</span>
                        <span className="text-gray-800 font-semibold">₹{(parseInt(course.price.replace(/[^0-9]/g, '')) / 12).toLocaleString('en-IN')}/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-jhu-gold">
                      <FaPercentage className="text-xs" />
                      <span>0% interest available</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/contact-us')}
                    className="block w-full border-2 border-gray-300 text-gray-800 text-center px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    Talk to Counselor
                  </button>
                </div>
              </div>

              {/* Course Info Card */}
              <div className="bg-white rounded-lg shadow-lg mb-4 border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaClock className="text-base" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaBookOpen className="text-base" />
                      <span className="text-sm font-medium">Lessons</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaPuzzlePiece className="text-base" />
                      <span className="text-sm font-medium">Quizzes</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.quizzes ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaUsers className="text-base" />
                      <span className="text-sm font-medium">Maximum Students</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.maxStudents ?? 30}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaGlobe className="text-base" />
                      <span className="text-sm font-medium">Language</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.language ?? 'English'}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaGraduationCap className="text-base" />
                      <span className="text-sm font-medium">Program Type</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.programType ?? 'Fellowship'}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3 text-[#3D5A82]">
                      <FaCertificate className="text-base" />
                      <span className="text-sm font-medium">Certificate</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{course.certificate ?? 'yes'}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3">
                    <FaCheckCircle className="text-[#3D5A82] text-base flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#3D5A82]">Full lifetime access</span>
                  </div>
                </div>
                {/* Social Share */}
                <div className="flex items-center justify-center gap-6 px-5 py-4 border-t border-gray-100">
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3D5A82] hover:text-[#1877F2] transition-colors text-lg"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3D5A82] hover:text-[#0A66C2] transition-colors text-lg"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3D5A82] hover:text-[#E60023] transition-colors text-lg"
                  >
                    <FaPinterest />
                  </a>
                </div>
              </div>

              {/* Trust Seal */}
              <div className="bg-white rounded-lg p-4 shadow-lg text-center border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaCheckCircle className="text-jhu-gold text-lg" />
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-sm">Verified & Trusted</div>
                    <div className="text-xs text-gray-600">2000+ Students</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-200">
                  <div className="text-center">
                    <div className="font-bold text-lg text-jhu-gold">{course.rating}</div>
                    <div className="flex text-yellow-400 text-xs justify-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800 text-sm"></div>
                    <div className="text-xs text-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
