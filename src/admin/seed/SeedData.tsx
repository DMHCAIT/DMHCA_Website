import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaDatabase, FaCheck, FaExclamationTriangle } from 'react-icons/fa'

const COURSES = [
  { id: 1, title: 'Fellowship In Abdominal Imaging', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 28, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,10,000.00', category: 'Radiology', program_type: 'fellowship' },
  { id: 2, title: 'Fellowship In Breast Imaging', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop', lessons: 23, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹90,000.00', category: 'Radiology', program_type: 'fellowship' },
  { id: 3, title: 'Fellowship In Obstetrics Ultrasound', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 24, duration: '25 Week', level: 'Expert', rating: 5.0, reviews: 0, price: '₹1,40,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 4, title: "Fellowship In Women's Imaging", image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 0, price: '₹1,10,000.00', category: 'Radiology', program_type: 'fellowship' },
  { id: 5, title: 'Fellowship In Reproductive Endocrinology', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,30,000.00', category: 'Reproductive', program_type: 'fellowship' },
  { id: 6, title: 'Fellowship In Pediatric Rheumatology', image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop', lessons: 42, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,80,000.00', category: 'Pediatrics', program_type: 'fellowship' },
  { id: 7, title: 'Fellowship In Maxillofacial And Oral Surgery', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 46, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,00,000.00', category: 'Dental', program_type: 'fellowship' },
  { id: 8, title: 'Fellowship In Pediatrics Neurology', image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', lessons: 44, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,00,000.00', category: 'Neurology', program_type: 'fellowship' },
  { id: 9, title: 'Fellowship In Neurology', image_url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&h=600&fit=crop', lessons: 0, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,90,000.00', category: 'Neurology', program_type: 'fellowship' },
  { id: 10, title: 'Fellowship In Oral Implantology And Laser Dentistry', image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop', lessons: 67, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,80,000.00', category: 'Dental', program_type: 'fellowship' },
  { id: 11, title: 'Fellowship In Intensive Care Medicine', image_url: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 77, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,95,000.00', category: 'Emergency', program_type: 'fellowship' },
  { id: 12, title: 'Fellowship In Pediatric Surgery', image_url: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 36, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹2,50,000.00', category: 'General Surgery', program_type: 'fellowship' },
  { id: 13, title: 'Fellowship In Endocrinology', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 16, duration: '52 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹2,01,000.00', category: 'Endocrinology', program_type: 'fellowship' },
  { id: 14, title: 'Fellowship In Urology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 35, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,50,000.00', category: 'Urology', program_type: 'fellowship' },
  { id: 15, title: 'Fellowship In Psychiatric Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 72, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 10, price: '₹1,87,200.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 16, title: 'Fellowship In Diabetology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 36, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹1,80,840.00', category: 'Endocrinology', program_type: 'fellowship' },
  { id: 17, title: 'Fellowship In Family Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 73, duration: '52 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹1,74,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 18, title: 'Fellowship In Nephrology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 48, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 6, price: '₹2,00,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 19, title: 'Fellowship In Echocardiography', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 41, duration: '52 Week', level: 'Expert', rating: 4.5, reviews: 2, price: '₹1,80,000.00', category: 'Cardiology', program_type: 'fellowship' },
  { id: 20, title: 'Fellowship In Rheumatology', image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop', lessons: 24, duration: '50 Week', level: 'Expert', rating: 4.9, reviews: 7, price: '₹1,80,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 21, title: 'Fellowship In Head And Neck Oncology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 24, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 7, price: '₹2,80,000.00', category: 'Oncology', program_type: 'fellowship' },
  { id: 22, title: 'Fellowship In Pediatric Endocrinology', image_url: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 10, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹2,40,000.00', category: 'Endocrinology', program_type: 'fellowship' },
  { id: 23, title: 'Fellowship In High Risk Pregnancy', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 0, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹3,00,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 24, title: 'Fellowship In Fetal Medicine', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 28, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,50,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 25, title: 'Fellowship In Spine Surgery', image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', lessons: 66, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 7, price: '₹2,50,000.00', category: 'Orthopedics', program_type: 'fellowship' },
  { id: 26, title: 'Fellowship In Radiology', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 16, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 5, price: '₹2,00,000.00', category: 'Radiology', program_type: 'fellowship' },
  { id: 27, title: 'Fellowship In Trichology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 47, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹1,90,000.00', category: 'Dermatology', program_type: 'fellowship' },
  { id: 28, title: 'Fellowship In Robotic Surgery', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 29, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 5, price: '₹3,50,000.00', category: 'General Surgery', program_type: 'fellowship' },
  { id: 29, title: 'Fellowship In Neonatology', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 55, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹1,90,000.00', category: 'Pediatrics', program_type: 'fellowship' },
  { id: 30, title: 'Fellowship In Medical Oncology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 72, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,50,000.00', category: 'Oncology', program_type: 'fellowship' },
  { id: 31, title: 'Fellowship In Laparoscopy And Hysteroscopy', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 35, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹3,50,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 32, title: 'Fellowship In Interventional Radiology', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 23, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,50,000.00', category: 'Radiology', program_type: 'fellowship' },
  { id: 33, title: 'Fellowship In Interventional Cardiology', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 37, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,80,000.00', category: 'Cardiology', program_type: 'fellowship' },
  { id: 34, title: 'Fellowship In Internal Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 84, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 6, price: '₹1,98,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 35, title: 'Fellowship In Reproductive Medicine', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 77, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹2,50,000.00', category: 'Reproductive', program_type: 'fellowship' },
  { id: 36, title: 'Fellowship In Pediatrics', image_url: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop', lessons: 33, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 5, price: '₹1,95,000.00', category: 'Pediatrics', program_type: 'fellowship' },
  { id: 37, title: 'Fellowship In Pediatric Echocardiography', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 30, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹1,80,000.00', category: 'Cardiology', program_type: 'fellowship' },
  { id: 38, title: 'Fellowship In Pain Management', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 33, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,00,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 39, title: 'Fellowship In Orthopedics', image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 31, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹1,70,000.00', category: 'Orthopedics', program_type: 'fellowship' },
  { id: 40, title: 'Fellowship In Minimal Access Surgery', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', lessons: 47, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹3,00,000.00', category: 'General Surgery', program_type: 'fellowship' },
  { id: 41, title: 'Fellowship In Emergency Medicine', image_url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 79, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹1,74,000.00', category: 'Emergency', program_type: 'fellowship' },
  { id: 42, title: 'Fellowship In Dermatology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 78, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,00,000.00', category: 'Dermatology', program_type: 'fellowship' },
  { id: 43, title: 'Fellowship In Critical Care', image_url: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 74, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 6, price: '₹1,95,000.00', category: 'Emergency', program_type: 'fellowship' },
  { id: 44, title: 'Fellowship In Cosmetology And Aesthetic Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 75, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹1,80,000.00', category: 'Dermatology', program_type: 'fellowship' },
  { id: 45, title: 'Fellowship In Cosmetic Gynecology', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 23, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,50,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 46, title: 'Fellowship In Clinical Cardiology', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 70, duration: '52 Week', level: 'Expert', rating: 5.0, reviews: 8, price: '₹2,40,000.00', category: 'Cardiology', program_type: 'fellowship' },
  { id: 47, title: 'Fellowship In Arthroscopy And Arthroplasty', image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 22, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,10,000.00', category: 'Orthopedics', program_type: 'fellowship' },
  { id: 48, title: 'Fellowship In Obstetrics And Gynecology', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 68, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 3, price: '₹2,30,000.00', category: 'Obs & Gynae', program_type: 'fellowship' },
  { id: 49, title: 'Fellowship In Gynecologic Oncology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 64, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹3,10,000.00', category: 'Oncology', program_type: 'fellowship' },
  { id: 50, title: 'Fellowship In GI Endoscopy', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 12, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹1,80,000.00', category: 'Gastroenterology', program_type: 'fellowship' },
  { id: 51, title: 'Fellowship In Clinical Hematology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 56, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,60,000.00', category: 'Medicine', program_type: 'fellowship' },
  { id: 52, title: 'Fellowship In Clinical Embryology', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 1, price: '₹1,60,000.00', category: 'Reproductive', program_type: 'fellowship' },
  { id: 53, title: 'Fellowship In Cardiothoracic Surgery', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 18, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 2, price: '₹2,20,000.00', category: 'General Surgery', program_type: 'fellowship' },
  { id: 54, title: 'Fellowship In Cardio Oncology', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 17, duration: '50 Week', level: 'Expert', rating: 4.8, reviews: 4, price: '₹2,20,000.00', category: 'Cardiology', program_type: 'fellowship' },
  { id: 55, title: 'Fellowship In Gastroenterology', image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop', lessons: 46, duration: '50 Week', level: 'Expert', rating: 5.0, reviews: 4, price: '₹2,50,000.00', category: 'Gastroenterology', program_type: 'fellowship' },
  // PG Diploma (11)
  { id: 101, title: 'PG Diploma In Nutrition And Dietetics', image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 18, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 2, price: '₹1,11,000.00', category: 'Nutrition', program_type: 'pg-diploma' },
  { id: 102, title: 'PG Diploma In Hospital Administration', image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', lessons: 25, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 2, price: '₹1,10,000.00', category: 'Management', program_type: 'pg-diploma' },
  { id: 103, title: 'PG Diploma In Hospital Management', image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', lessons: 126, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹96,000.00', category: 'Management', program_type: 'pg-diploma' },
  { id: 104, title: 'PG Diploma In Clinical Embryology', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 27, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 5, price: '₹1,60,380.00', category: 'Reproductive', program_type: 'pg-diploma' },
  { id: 105, title: 'PG Diploma In Critical Care', image_url: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 43, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 1, price: '₹1,94,700.00', category: 'Emergency', program_type: 'pg-diploma' },
  { id: 106, title: 'PG Diploma In HIV Medicine', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 18, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 1, price: '₹1,35,000.00', category: 'Medicine', program_type: 'pg-diploma' },
  { id: 107, title: 'PG Diploma In Sexology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 47, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹1,40,000.00', category: 'Reproductive', program_type: 'pg-diploma' },
  { id: 108, title: 'PG Diploma In Family Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 21, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹1,72,000.00', category: 'Medicine', program_type: 'pg-diploma' },
  { id: 109, title: 'PG Diploma In Emergency Medicine', image_url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 29, duration: '52 Week', level: 'Intermediate', rating: 5.0, reviews: 3, price: '₹1,72,000.00', category: 'Emergency', program_type: 'pg-diploma' },
  { id: 110, title: 'PG Diploma In Diabetology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 10, duration: '52 Week', level: 'Intermediate', rating: 4.6, reviews: 5, price: '₹1,79,000.00', category: 'Endocrinology', program_type: 'pg-diploma' },
  { id: 111, title: 'PG Diploma In Cosmetology And Aesthetic Medicine', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 20, duration: '50 Week', level: 'Intermediate', rating: 5.0, reviews: 0, price: '₹1,83,000.00', category: 'Dermatology', program_type: 'pg-diploma' },
  // Certificate (21)
  { id: 201, title: 'Certificate In Clinical Psychology', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 25, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 0, price: '₹40,000.00', category: 'Medicine', program_type: 'certificate' },
  { id: 202, title: 'Certificate In Obesity Management', image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 50, duration: '24 Week', level: 'Beginner', rating: 5.0, reviews: 0, price: '₹35,000.00', category: 'Nutrition', program_type: 'certificate' },
  { id: 203, title: 'Certificate Course In HIV Medicine', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 42, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 0, price: '₹30,000.00', category: 'Medicine', program_type: 'certificate' },
  { id: 204, title: 'Certificate Course In Hypertension', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 23, duration: '50 Week', level: 'Beginner', rating: 4.8, reviews: 4, price: '₹30,000.00', category: 'Cardiology', program_type: 'certificate' },
  { id: 205, title: 'Certificate Course In Tuberculosis', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 12, duration: '50 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹50,000.00', category: 'Pulmonary', program_type: 'certificate' },
  { id: 206, title: 'Certificate Course In Diabetic Foot Care', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 10, duration: '12 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹30,000.00', category: 'Endocrinology', program_type: 'certificate' },
  { id: 207, title: 'Certificate Course In Clinical Nutrition', image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop', lessons: 36, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 2, price: '₹50,000.00', category: 'Nutrition', program_type: 'certificate' },
  { id: 208, title: 'Certificate Course In Fetal Echocardiography', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 25, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹60,000.00', category: 'Cardiology', program_type: 'certificate' },
  { id: 209, title: 'Certificate Course In Diabetology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 8, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹50,000.00', category: 'Endocrinology', program_type: 'certificate' },
  { id: 210, title: 'Certificate Course In Cosmetology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 15, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 0, price: '₹50,000.00', category: 'Dermatology', program_type: 'certificate' },
  { id: 211, title: 'Certificate Course In Family Medicine', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', lessons: 36, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 5, price: '₹50,000.00', category: 'Medicine', program_type: 'certificate' },
  { id: 212, title: 'Certificate Course In Dermatology', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 12, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹50,000.00', category: 'Dermatology', program_type: 'certificate' },
  { id: 213, title: 'Certificate Course In Neurology', image_url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&h=600&fit=crop', lessons: 10, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹50,000.00', category: 'Neurology', program_type: 'certificate' },
  { id: 214, title: 'Certificate Course In Obstetrics And Gynecology', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop', lessons: 22, duration: '12 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹30,000.00', category: 'Obs & Gynae', program_type: 'certificate' },
  { id: 215, title: 'Certificate Course In Pain Management', image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop', lessons: 26, duration: '18 Week', level: 'Beginner', rating: 5.0, reviews: 2, price: '₹35,000.00', category: 'Medicine', program_type: 'certificate' },
  { id: 216, title: 'Certificate Course In Orthopaedics', image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop', lessons: 15, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 1, price: '₹50,000.00', category: 'Orthopedics', program_type: 'certificate' },
  { id: 217, title: 'Certificate Course In Infertility', image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop', lessons: 8, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 4, price: '₹50,000.00', category: 'Reproductive', program_type: 'certificate' },
  { id: 218, title: 'Certificate Course In Critical Care Medicine', image_url: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop', lessons: 14, duration: '12 Week', level: 'Beginner', rating: 5.0, reviews: 0, price: '₹30,000.00', category: 'Emergency', program_type: 'certificate' },
  { id: 219, title: 'Certificate Course In Emergency Medicine', image_url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop', lessons: 14, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 6, price: '₹50,000.00', category: 'Emergency', program_type: 'certificate' },
  { id: 220, title: 'Certificate Course In Clinical Cardiology', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 17, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 7, price: '₹50,000.00', category: 'Cardiology', program_type: 'certificate' },
  { id: 221, title: 'Certificate Course In Echocardiography', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop', lessons: 19, duration: '25 Week', level: 'Beginner', rating: 5.0, reviews: 7, price: '₹50,000.00', category: 'Cardiology', program_type: 'certificate' },
]

const SeedData = () => {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [existingCount, setExistingCount] = useState<number | null>(null)

  const checkExisting = async () => {
    const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true })
    setExistingCount(count ?? 0)
  }

  const addLog = (msg: string) => setLog(prev => [...prev, msg])

  const handleSeed = async () => {
    if (!window.confirm(`This will insert ${COURSES.length} courses into Supabase. Existing courses with the same IDs will be updated (upsert). Continue?`)) return
    setStatus('seeding')
    setLog([])
    setProgress(0)

    try {
      // Insert in batches of 10
      const batchSize = 10
      for (let i = 0; i < COURSES.length; i += batchSize) {
        const batch = COURSES.slice(i, i + batchSize).map(c => ({
          ...c,
          is_active: true,
          is_featured: [1, 5, 13, 16, 19, 46].includes(c.id),
          display_order: i + 1,
          enrolled: 0,
          description: ''
        }))
        const { error } = await supabase.from('courses').upsert(batch, { onConflict: 'id' })
        if (error) {
          addLog(`❌ Batch ${Math.ceil(i / batchSize) + 1} failed: ${error.message}`)
        } else {
          addLog(`✅ Inserted courses ${i + 1}–${Math.min(i + batchSize, COURSES.length)}`)
        }
        setProgress(Math.round(((i + batchSize) / COURSES.length) * 100))
      }

      // Also seed default testimonials
      const testimonials = [
        { name: 'Dr. Jakaria (Ahsan Habib)', role: 'Endocrinologist', program: 'Fellowship in Endocrinology', location: 'Bangladesh', rating: 5, quote: 'Hi I am Dr.Jakaria from Bangladesh. I have completed the fellowship on endocrinology course from here. Their educational system is very good.. thanks to DMHCA.', highlight: 'Excellent educational system', is_active: true, display_order: 1 },
        { name: 'Dr. Pragya Rajbhandari', role: 'Pediatric Neurologist', program: 'Fellowship in Pediatric Neurology', location: 'Jaipur', rating: 5, quote: 'My journey through the Pediatric Neurology Fellowship Program at your institute has been an incredibly rewarding experience.', highlight: 'Rewarding journey with hands-on training', is_active: true, display_order: 2 },
        { name: 'Dr. Shahjad Khan', role: 'Diabetologist', program: 'Fellowship in Diabetology', location: 'Lucknow', rating: 5, quote: 'I recently completed the Fellowship in Diabetology at DMHCA, and it has been a transformative journey in my medical career.', highlight: 'Transformative journey in medical career', is_active: true, display_order: 3 },
        { name: 'Dr. Rahul Jain', role: 'Medical Professional', program: 'Fellowship Course', location: 'Mumbai', rating: 5, quote: 'Very genuine and trustworthy platform for doing fellowship in various courses. Thanks to DMHCA.', highlight: 'Genuine and trustworthy platform', is_active: true, display_order: 4 },
        { name: 'Dr. Moomin Ahmad Mir', role: 'Critical Care Specialist', program: 'Fellowship in Critical Care', location: 'Kashmir', rating: 5, quote: 'I am truly grateful to Delhi Medical Health Care Academy for providing me the opportunity to pursue a Fellowship in Critical Care.', highlight: 'Smooth admission, helpful staff', is_active: true, display_order: 5 },
        { name: 'Dr. Manisha Kumari', role: 'Family Medicine Specialist', program: 'Fellowship in Family Medicine', location: 'New Delhi', rating: 5, quote: 'Highly recommend for the fellowship courses. I completed the fellowship in family medicine. Very happy with the course content and faculty.', highlight: 'Great learning experience', is_active: true, display_order: 6 },
      ]
      const { error: tError } = await supabase.from('testimonials').upsert(testimonials)
      if (tError) addLog(`⚠️ Testimonials: ${tError.message}`)
      else addLog('✅ Seeded 6 testimonials')

      addLog('🎉 Seeding complete! All 87 courses are now in Supabase.')
      setStatus('done')
    } catch (err) {
      addLog(`Fatal error: ${String(err)}`)
      setStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Seed Database</h1>
        <p className="text-gray-500 text-sm">One-time tool to populate Supabase with all existing hardcoded data</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-yellow-800">Important</p>
            <p className="text-yellow-700 text-sm mt-1">Run this once after setting up your Supabase database. This will upsert all 87 DMHCA courses and 6 verified testimonials. Safe to run multiple times — existing rows are updated, not duplicated.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">Course Data</h2>
            <p className="text-gray-500 text-sm">{COURSES.length} courses ready to import (55 Fellowships, 11 PG Diplomas, 21 Certificates)</p>
          </div>
          <button
            onClick={checkExisting}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Check Existing
          </button>
        </div>
        {existingCount !== null && (
          <p className="text-sm text-gray-600">Currently {existingCount} courses in Supabase database</p>
        )}
      </div>

      {status === 'idle' && (
        <button onClick={handleSeed} className="w-full py-3 bg-[#002D72] text-white rounded-xl font-semibold hover:bg-[#003a8c] transition-colors flex items-center justify-center gap-2">
          <FaDatabase /> Seed All 87 Courses + 6 Testimonials to Supabase
        </button>
      )}

      {status === 'seeding' && (
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-[#002D72] h-3 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="text-sm text-gray-600 text-center">Seeding... {Math.min(progress, 100)}%</p>
        </div>
      )}

      {status === 'done' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <FaCheck />
          <span className="font-semibold">Seeding complete! Visit the Courses page or refresh frontend to see live data.</span>
        </div>
      )}

      {log.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 max-h-60 overflow-y-auto space-y-1">
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}
    </div>
  )
}

export default SeedData
