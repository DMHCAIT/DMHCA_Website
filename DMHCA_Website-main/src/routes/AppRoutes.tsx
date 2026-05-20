import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Courses from '../pages/Courses'
import Events from '../pages/Events'
import Blogs from '../pages/Blogs'
import Contact from '../pages/Contact'
import SuccessStories from '../pages/SuccessStories'
import Apply from '../pages/Apply'
import CourseDetail from '../pages/CourseDetail'

// Admin
import AdminLogin from '../admin/AdminLogin'
import AdminGuard from '../admin/AdminGuard'
import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../admin/Dashboard'
import CoursesList from '../admin/courses/CoursesList'
import CourseForm from '../admin/courses/CourseForm'
import CourseDetailForm from '../admin/courses/CourseDetailForm'
import TestimonialsList from '../admin/testimonials/TestimonialsList'
import EventsList from '../admin/events/EventsList'
import BlogsList from '../admin/blogs/BlogsList'
import PartnersList from '../admin/partners/PartnersList'
import ApplicationsList from '../admin/applications/ApplicationsList'
import MediaLibrary from '../admin/media/MediaLibrary'
import HeroEditor from '../admin/settings/HeroEditor'
import AboutEditor from '../admin/settings/AboutEditor'
import ContactEditor from '../admin/settings/ContactEditor'
import SeedData from '../admin/seed/SeedData'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about-dmhca" element={<About />} />
      <Route path="/top-medical-courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetail />} />
      <Route path="/events" element={<Events />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/apply" element={<Apply />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/new" element={<CourseForm />} />
        <Route path="courses/:id/edit" element={<CourseForm />} />
        <Route path="courses/:id/details" element={<CourseDetailForm />} />
        <Route path="testimonials" element={<TestimonialsList />} />
        <Route path="events" element={<EventsList />} />
        <Route path="blogs" element={<BlogsList />} />
        <Route path="partners" element={<PartnersList />} />
        <Route path="applications" element={<ApplicationsList />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="settings/hero" element={<HeroEditor />} />
        <Route path="settings/about" element={<AboutEditor />} />
        <Route path="settings/contact" element={<ContactEditor />} />
        <Route path="seed" element={<SeedData />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes