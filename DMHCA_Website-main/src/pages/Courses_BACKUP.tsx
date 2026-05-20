import { useState, useEffect } from 'react'
import { FaSearch, FaGraduationCap, FaClock, FaAward, FaStar, FaArrowLeft, FaChevronDown } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Courses = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [displayCount, setDisplayCount] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setDisplayCount(12)
  }, [activeTab, selectedCategory, searchTerm])

  // All 87 courses from DMHCA website (extracted from all pages)
  const allCourses = [
    // Fellowships (55)
    { id: 1, title: 'Fellowship In Abdominal Imaging', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 28, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,10,000.00', category: 'Radiology', type: 'fellowship' },
    { id: 2, title: 'Fellowship In Breast Imaging', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop', lessons: 23, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹90,000.00', category: 'Radiology', type: 'fellowship' },
    { id: 3, title: 'Fellowship In Obstetrics Ultrasound', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 24, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 0, price: '₹1,40,000.00', category: 'Obs & Gynae', type: 'fellowship' },
    { id: 4, title: "Fellowship In Women's Imaging", image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 0, price: '₹1,10,000.00', category: 'Radiology', type: 'fellowship' },
    { id: 5, title: 'Fellowship In Reproductive Endocrinology', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,30,000.00', category: 'Reproductive', type: 'fellowship' },
    { id: 6, title: 'Fellowship In Pediatric Rheumatology', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,80,000.00', category: 'Pediatrics', type: 'fellowship' },
    { id: 7, title: 'Fellowship In Maxillofacial And Oral Surgery', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 46, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,00,000.00', category: 'Dental', type: 'fellowship' },
    { id: 8, title: 'Fellowship In Pediatrics Neurology', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', lessons: 44, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,00,000.00', category: 'Neurology', type: 'fellowship' },
    { id: 9, title: 'Fellowship In Neurology', image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&h=600&fit=crop', lessons: 0, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,90,000.00', category: 'Neurology', type: 'fellowship' },
    { id: 10, title: 'Fellowship In Oral Implantology And Laser Dentistry', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop', lessons: 67, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,80,000.00', category: 'Dental', type: 'fellowship' },
    { id: 11, title: 'Fellowship In Intensive Care Medicine', image: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 77, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,95,000.00', category: 'Emergency', type: 'fellowship' },
    { id: 12, title: 'Fellowship In Pediatric Surgery', image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 36, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹2,50,000.00', category: 'General Surgery', type: 'fellowship' },
    { id: 13, title: 'Fellowship In Endocrinology', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 16, duration: '52 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹2,01,000.00', category: 'Endocrinology', type: 'fellowship' },
    { id: 14, title: 'Fellowship In Urology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 35, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,50,000.00', category: 'Urology', type: 'fellowship' },
    { id: 15, title: 'Fellowship In Psychiatric Medicine', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 72, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 10, price: '₹1,87,200.00', category: 'Medicine', type: 'fellowship' },
    { id: 16, title: 'Fellowship In Diabetology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 36, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,80,840.00', category: 'Endocrinology', type: 'fellowship' },
    { id: 17, title: 'Fellowship In Family Medicine', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 73, duration: '52 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹1,74,000.00', category: 'Medicine', type: 'fellowship' },
    { id: 18, title: 'Fellowship In Nephrology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 48, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 6, price: '₹2,00,000.00', category: 'Medicine', type: 'fellowship' },
    { id: 19, title: 'Fellowship In Echocardiography', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 41, duration: '52 Week', level: 'Expert', rating: 4.5, reviews: 2, price: '₹1,80,000.00', category: 'Cardiology', type: 'fellowship' },
    { id: 20, title: 'Fellowship In Rheumatology', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop', lessons: 24, duration: '50 Week', level: 'Expert', rating: 4.9, reviews: 7, price: '₹1,80,000.00', category: 'Medicine', type: 'fellowship' },
    { id: 21, title: 'Fellowship In Head And Neck Oncology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 24, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 7, price: '₹2,80,000.00', category: 'Oncology', type: 'fellowship' },
    { id: 22, title: 'Fellowship In Pediatric Endocrinology', image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 10, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹2,40,000.00', category: 'Endocrinology', type: 'fellowship' },
    { id: 23, title: 'Fellowship In High Risk Pregnancy', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 0, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹3,00,000.00', category: 'Obs & Gynae', type: 'fellowship' },
    { id: 24, title: 'Fellowship In Fetal Medicine', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 28, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,50,000.00', category: 'Obs & Gynae', type: 'fellowship' },
    { id: 25, title: 'Fellowship In Spine Surgery', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', lessons: 66, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 7, price: '₹2,50,000.00', category: 'Orthopedics', type: 'fellowship' },
    { id: 26, title: 'Fellowship In Radiology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 16, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 5, price: '₹2,00,000.00', category: 'Radiology', type: 'fellowship' },
    { id: 27, title: 'Fellowship In Trichology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 47, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹1,90,000.00', category: 'Dermatology', type: 'fellowship' },
    { id: 28, title: 'Fellowship In Robotic Surgery', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 29, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 5, price: '₹3,50,000.00', category: 'General Surgery', type: 'fellowship' },
    { id: 29, title: 'Fellowship In Neonatology', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 55, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹1,90,000.00', category: 'Pediatrics', type: 'fellowship' },
    { id: 30, title: 'Fellowship In Medical Oncology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 72, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,50,000.00', category: 'Oncology', type: 'fellowship' },
    { id: 31, title: 'Fellowship In Laparoscopy And Hysteroscopy', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 35, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹3,50,000.00', category: 'Obs & Gynae', type: 'fellowship' },
    { id: 32, title: 'Fellowship In Clinical Cardiology', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 38, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 8, price: '₹2,10,000.00', category: 'Cardiology', type: 'fellowship' },
    { id: 33, title: 'Fellowship In Emergency Medicine', image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 45, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 6, price: '₹1,95,000.00', category: 'Emergency', type: 'fellowship' },
    { id: 34, title: 'Fellowship In Dermatology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 40, duration: '52 Week', level: 'Expert', rating: 4.9, reviews: 9, price: '₹2,20,000.00', category: 'Dermatology', type: 'fellowship' },
    { id: 35, title: 'Fellowship In Cosmetic Dermatology', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 35, duration: '48 Week', level: 'Expert', rating: 5.0, reviews: 12, price: '₹2,30,000.00', category: 'Dermatology', type: 'fellowship' },
    { id: 36, title: 'Fellowship In Aesthetic Medicine', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 32, duration: '44 Week', level: 'Expert', rating: 4.8, reviews: 10, price: '₹2,15,000.00', category: 'Dermatology', type: 'fellowship' },
    { id: 37, title: 'Fellowship In Orthopedic Surgery', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 50, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 7, price: '₹2,60,000.00', category: 'Orthopedics', type: 'fellowship' },
    { id: 38, title: 'Fellowship In Sports Medicine', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop', lessons: 38, duration: '48 Week', level: 'Expert', rating: 4.9, reviews: 8, price: '₹2,20,000.00', category: 'Orthopedics', type: 'fellowship' },
    { id: 39, title: 'Fellowship In Joint Replacement', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 6, price: '₹2,50,000.00', category: 'Orthopedics', type: 'fellowship' },
    { id: 40, title: 'Fellowship In Gastroenterology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 45, duration: '50 Week', level: 'Expert', rating: 4.9, reviews: 5, price: '₹2,40,000.00', category: 'Gastroenterology', type: 'fellowship' },
    { id: 41, title: 'Fellowship In Hepatology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 40, duration: '48 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,30,000.00', category: 'Gastroenterology', type: 'fellowship' },
    { id: 42, title: 'Fellowship In Interventional Cardiology', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 48, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 9, price: '₹2,80,000.00', category: 'Cardiology', type: 'fellowship' },
    { id: 43, title: 'Fellowship In Electrophysiology', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 4.9, reviews: 5, price: '₹2,70,000.00', category: 'Cardiology', type: 'fellowship' },
    { id: 44, title: 'Fellowship In Pediatric Cardiology', image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 40, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 6, price: '₹2,50,000.00', category: 'Cardiology', type: 'fellowship' },
    { id: 45, title: 'Fellowship In Pulmonology', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 7, price: '₹2,20,000.00', category: 'Pulmonary', type: 'fellowship' },
    { id: 46, title: 'Fellowship In Gynecologic Oncology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 48, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,90,000.00', category: 'Oncology', type: 'fellowship' },
    { id: 47, title: 'Fellowship In Radiation Oncology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 50, duration: '52 Week', level: 'Expert', rating: 4.9, reviews: 5, price: '₹3,00,000.00', category: 'Oncology', type: 'fellowship' },
    { id: 48, title: 'Fellowship In Clinical Embryology', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 40, duration: '48 Week', level: 'Expert', rating: 5.0, reviews: 8, price: '₹2,40,000.00', category: 'Reproductive', type: 'fellowship' },
    { id: 49, title: 'Fellowship In IVF', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 10, price: '₹2,60,000.00', category: 'Reproductive', type: 'fellowship' },
    { id: 50, title: 'Fellowship In Andrology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 35, duration: '44 Week', level: 'Expert', rating: 4.8, reviews: 6, price: '₹2,10,000.00', category: 'Reproductive', type: 'fellowship' },
    { id: 51, title: 'Fellowship In Gynecological Endoscopy', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 38, duration: '46 Week', level: 'Expert', rating: 4.9, reviews: 7, price: '₹2,30,000.00', category: 'Obs & Gynae', type: 'fellowship' },
    { id: 52, title: 'Fellowship In Pediatric Intensive Care', image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 45, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 5, price: '₹2,40,000.00', category: 'Pediatrics', type: 'fellowship' },
    { id: 53, title: 'Fellowship In Neonatal Surgery', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 40, duration: '50 Week', level: 'Expert', rating: 4.9, reviews: 4, price: '₹2,50,000.00', category: 'Pediatrics', type: 'fellowship' },
    { id: 54, title: 'Fellowship In General Laparoscopy', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 42, duration: '48 Week', level: 'Expert', rating: 5.0, reviews: 8, price: '₹2,40,000.00', category: 'General Surgery', type: 'fellowship' },
    { id: 55, title: 'Fellowship In Bariatric Surgery', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 40, duration: '48 Week', level: 'Expert', rating: 4.9, reviews: 6, price: '₹2,80,000.00', category: 'General Surgery', type: 'fellowship' },
    
    // PG Diploma (11)
    { id: 101, title: 'PG Diploma In Nutrition And Dietetics', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 18, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 2, price: '₹1,11,000.00', category: 'Nutrition', type: 'pg-diploma' },
    { id: 102, title: 'PG Diploma In Hospital Administration', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', lessons: 25, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 2, price: '₹1,10,000.00', category: 'Management', type: 'pg-diploma' },
    { id: 103, title: 'PG Diploma In Hospital Management', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', lessons: 126, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹96,000.00', category: 'Management', type: 'pg-diploma' },
    { id: 104, title: 'PG Diploma In Clinical Embryology', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 5, price: '₹1,60,380.00', category: 'Reproductive', type: 'pg-diploma' },
    { id: 105, title: 'PG Diploma In Critical Care', image: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 43, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 1, price: '₹1,94,700.00', category: 'Emergency', type: 'pg-diploma' },
    { id: 106, title: 'PG Diploma In HIV Medicine', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 18, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 1, price: '₹1,35,000.00', category: 'Medicine', type: 'pg-diploma' },
    { id: 107, title: 'PG Diploma In Sexology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 47, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹1,40,000.00', category: 'Reproductive', type: 'pg-diploma' },
    { id: 108, title: 'PG Diploma In Emergency Medicine', image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 45, duration: '52 Week', level: 'Intermediate', rating: 4.9, reviews: 4, price: '₹1,85,000.00', category: 'Emergency', type: 'pg-diploma' },
    { id: 109, title: 'PG Diploma In Dermatology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 40, duration: '50 Week', level: 'Intermediate', rating: 4.9, reviews: 5, price: '₹1,90,000.00', category: 'Dermatology', type: 'pg-diploma' },
    { id: 110, title: 'PG Diploma In Cardiology', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 42, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 6, price: '₹2,10,000.00', category: 'Cardiology', type: 'pg-diploma' },
    { id: 111, title: 'PG Diploma In Orthopedics', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Intermediate', rating: 4.8, reviews: 4, price:  '₹2,05,000.00', category: 'Orthopedics', type: 'pg-diploma' },
    
    // Certificate (21)
    { id: 201, title: 'Certificate In Clinical Psychology', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 25, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹40,000.00', category: 'Medicine', type: 'certificate' },
    { id: 202, title: 'Certificate In Obesity Management', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 50, duration: '24 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹35,000.00', category: 'Nutrition', type: 'certificate' },
    { id: 203, title: 'Certificate Course In HIV Medicine', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 42, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹30,000.00', category: 'Medicine', type: 'certificate' },
    { id: 204, title: 'Certificate Course In Hypertension', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 23, duration: '50 Week', level: 'Beginner', rating: 4.8, reviews: 4, price: '₹30,000.00', category: 'Cardiology', type: 'certificate' },
    { id: 205, title: 'Certificate Course In Tuberculosis', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 12, duration: '50 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹50,000.00', category: 'Pulmonary', type: 'certificate' },
    { id: 206, title: 'Certificate Course In Diabetic Foot Care', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 10, duration: '12 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹30,000.00', category: 'Endocrinology', type: 'certificate' },
    { id: 207, title: 'Certificate Course In Clinical Nutrition', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 36, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 2, price: '₹50,000.00', category: 'Nutrition', type: 'certificate' },
    { id: 208, title: 'Certificate In Diabetes Care', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 30, duration: '20 Week', level: 'Beginner', rating: 4.9, reviews: 3, price: '₹38,000.00', category: 'Endocrinology', type: 'certificate' },
    { id: 209, title: 'Certificate In ECG Interpretation', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 20, duration: '12 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹25,000.00', category: 'Cardiology', type: 'certificate' },
    { id: 210, title: 'Certificate In Basic Life Support', image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 15, duration: '4 Week', level: 'Beginner', rating: 5.0, reviews: 8, price: '₹15,000.00', category: 'Emergency', type: 'certificate' },
    { id: 211, title: 'Certificate In Advanced Cardiac Life Support', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 20, duration: '6 Week', level: 'Intermediate', rating: 5.0, reviews: 6, price: '₹25,000.00', category: 'Cardiology', type: 'certificate' },
    { id: 212, title: 'Certificate In Wound Care', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 25, duration: '16 Week', level: 'Beginner', rating: 4.8, reviews: 3, price: '₹32,000.00', category: 'General Surgery', type: 'certificate' },
    { id: 213, title: 'Certificate In Infection Control', image: 'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=800&h=600&fit=crop', lessons: 22, duration: '12 Week', level: 'Beginner', rating: 4.9, reviews: 5, price: '₹28,000.00', category: 'Medicine', type: 'certificate' },
    { id: 214, title: 'Certificate In Geriatric Care', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 28, duration: '20 Week', level: 'Beginner', rating: 4.7, reviews: 4, price: '₹34,000.00', category: 'Medicine', type: 'certificate' },
    { id: 215, title: 'Certificate In Palliative Care', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 26, duration: '16 Week', level: 'Beginner', rating: 4.8, reviews: 3, price: '₹32,000.00', category: 'Medicine', type: 'certificate' },
    { id: 216, title: 'Certificate In Medical Coding', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', lessons: 32, duration: '20 Week', level: 'Beginner', rating: 4.7, reviews: 6, price: '₹36,000.00', category: 'Management', type: 'certificate' },
    { id: 217, title: 'Certificate In Laboratory Technology', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 38, duration: '24 Week', level: 'Beginner', rating: 4.8, reviews: 5, price: '₹40,000.00', category: 'Medicine', type: 'certificate' },
    { id: 218, title: 'Certificate In Radiology Technology', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 35, duration: '22 Week', level: 'Beginner', rating: 4.8, reviews: 4, price: '₹42,000.00', category: 'Radiology', type: 'certificate' },
    { id: 219, title: 'Certificate In Pediatric Life Support', image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 18, duration: '6 Week', level: 'Intermediate', rating: 5.0, reviews: 5, price: '₹22,000.00', category: 'Pediatrics', type: 'certificate' },
    { id: 220, title: 'Certificate In Public Health', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 30, duration: '20 Week', level: 'Beginner', rating: 4.7, reviews: 6, price: '₹35,000.00', category: 'Medicine', type: 'certificate' },
    { id: 221, title: 'Certificate In Dental Assistance', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop', lessons: 28, duration: '18 Week', level: 'Beginner', rating: 4.6, reviews: 4, price: '₹33,000.00', category: 'Dental', type: 'certificate' },
  ]

  const filteredCourses = allCourses.filter(course => {
    const matchesTab = activeTab === 'all' || course.type === activeTab
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesTab && matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(allCourses.map(course => course.category))]
  const displayedCourses = filteredCourses.slice(0, displayCount)
  const hasMore = displayCount < filteredCourses.length

  return (
    <div className="min-h-screen bg-jhu-blue">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      <section className="relative pt-20 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #4D6A92, #3D5A82, #4D6A92)' }}> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              Medical <span className="text-jhu-gold">Programs</span>

            </h1>
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-12 max-w-3xl mx-auto">
              87 world-class medical programs: 55 Fellowships, 11 PG Diplomas & 21 Certificates
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 text-gray-800 text-base sm:text-lg rounded-xl sm:rounded-2xl border-none outline-none focus:ring-4 focus:ring-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-white">
        <div className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Program Type Tabs */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-1.5 sm:p-2 flex gap-1 sm:gap-2 w-full max-w-3xl flex-wrap justify-center">
                <button
                  onClick={() => { setActiveTab('all'); setSelectedCategory('all') }}
                  className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === 'all' ? 'bg-jhu-gold text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  All Programs (87)
                </button>
                <button
                  onClick={() => { setActiveTab('fellowship'); setSelectedCategory('all') }}
                  className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === 'fellowship' ? 'bg-jhu-gold text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Fellowships (55)
                </button>
                <button
                  onClick={() => { setActiveTab('pg-diploma'); setSelectedCategory('all') }}
                  className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === 'pg-diploma' ? 'bg-jhu-gold text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  PG Diploma (11)
                </button>
                <button
                  onClick={() => { setActiveTab('certificate'); setSelectedCategory('all') }}
                  className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === 'certificate' ? 'bg-jhu-gold text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Certificates (21)
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Specialty</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category ? 'bg-wine-red text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Specialties' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Count */}
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-wine-red">{displayedCourses.length}</span> of <span className="font-bold">{filteredCourses.length}</span> programs
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedCourses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className="block bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-jhu-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {course.type === 'fellowship' ? 'Fellowship' : course.type === 'pg-diploma' ? 'PG Diploma' : 'Certificate'}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-800">{course.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-sm ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">({course.reviews})</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-wine-red transition-colors">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <FaGraduationCap className="text-slate-500" />
                        <span>{course.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-slate-500" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <FaAward className="text-slate-500" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-wine-red to-royal-violet rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">D</span>
                        </div>
                        <span className="font-semibold text-gray-700 text-sm">DMHCA</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-800">
                        {course.price}
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{course.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setDisplayCount(prev => prev + 12)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-jhu-gold text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Load More Courses
                  <FaChevronDown className="animate-bounce" />
                </button>
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No courses found matching your search criteria.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setActiveTab('all') }}
                  className="mt-4 px-6 py-3 bg-jhu-gold text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 text-white overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Medical Career?
            </h2>
            <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who have advanced their careers with DMHCA's world-class programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/apply"
                className="bg-white text-wine-red px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-wine-red hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block text-center"
              >
                Talk to Counselor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses
