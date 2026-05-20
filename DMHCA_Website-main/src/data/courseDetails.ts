// Course Details Data
// This file contains comprehensive information for all courses
// Fill in the data from your internal DMHCA content management system

export interface CourseDetail {
  id: number
  title: string
  category: string
  duration: string
  lessons: number
  level: string
  rating: number
  reviews: number
  price: string
  description: string
  overview: string
  keyHighlights: Array<{ icon: string; text: string }>
  curriculum: Array<{
    module: string
    title: string
    duration: string
    topics: string[]
  }>
  feeBreakdown: {
    tuition: string
    materials: string
    examination: string
    registration: string
    total: string
  }
  trainingFacilities: Array<{
    name: string
    duration: string
    focus: string
  }>
  handsOnExperience: {
    minimumCases: string
    procedures: string
    description: string
  }
  eligibility: string[]
  outcomes: string[]
  careerOpportunities: string[]
  assessment: {
    theory: string
    practical: string
    viva: string
    description: string
  }
}

// Course Details Database
// TODO: Fill in data for all 87 courses from your DMHCA content management system
export const courseDetailsData: Record<string, CourseDetail> = {
  // Fellowship courses (IDs 1-55)
  '1': {
    id: 1,
    title: 'Fellowship In Abdominal Imaging',
    category: 'Radiology',
    duration: '25 Week',
    lessons: 28,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹1,10,000.00',
    description: 'Advanced fellowship providing in-depth training in abdominal radiology, including liver, GI, pancreas, and GU imaging.',
    overview: 'The Fellowship in Abdominal Imaging is a focused postgraduate subspecialty training program designed to develop expertise in imaging of the abdominal organs, including the liver, pancreas, gastrointestinal tract, kidneys, adrenal glands, and retroperitoneum. The fellowship emphasizes multimodality imaging using ultrasound, Doppler, CT, and MRI, with strong focus on protocol optimization, accurate diagnosis, oncologic imaging, and clinical correlation. The program prepares radiologists for independent subspecialty practice in abdominal imaging.',
    keyHighlights: [
      { icon: 'FaCheckCircle', text: 'Perform and interpret abdominal ultrasound, CT, and MRI studies' },
      { icon: 'FaCheckCircle', text: 'Diagnose hepatobiliary, pancreatic, gastrointestinal, renal, and adrenal diseases' },
      { icon: 'FaCheckCircle', text: 'Apply multiphasic CT and MRI protocols effectively' },
      { icon: 'FaCheckCircle', text: 'Interpret abdominal oncologic imaging for staging and follow-up' },
      { icon: 'FaCheckCircle', text: 'Recognize acute abdominal emergencies on imaging' },
      { icon: 'FaCheckCircle', text: 'Produce structured, clinically relevant imaging reports' },
      { icon: 'FaCheckCircle', text: 'Correlate imaging findings with laboratory and clinical data' },
      { icon: 'FaCheckCircle', text: 'Communicate effectively with referring clinicians' },
      { icon: 'FaCheckCircle', text: 'Maintain radiation safety and contrast safety standards' },
      { icon: 'FaCheckCircle', text: 'Practice ethical and evidence-based abdominal imaging' },
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
      total: '₹1,10,000.00'
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
    category: 'Radiology',
    duration: '25 Week',
    lessons: 23,
    level: 'Expert',
    rating: 5.0,
    reviews: 1,
    price: '₹90,000.00',
    description: '', // ADD YOUR DMHCA CONTENT HERE
    overview: '', // ADD YOUR DMHCA CONTENT HERE
    keyHighlights: [],
    curriculum: [],
    feeBreakdown: {
      tuition: '',
      materials: '',
      examination: '',
      registration: '',
      total: '₹90,000.00'
    },
    trainingFacilities: [],
    handsOnExperience: {
      minimumCases: '',
      procedures: '',
      description: ''
    },
    eligibility: [],
    outcomes: [],
    careerOpportunities: [],
    assessment: {
      theory: '',
      practical: '',
      viva: '',
      description: ''
    }
  }

  // TODO: Add remaining 85 courses (IDs 3-55 for fellowships, 101-111 for PG Diplomas, 201-221 for Certificates)
  // Copy the structure above and fill in data from your DMHCA content system
}
