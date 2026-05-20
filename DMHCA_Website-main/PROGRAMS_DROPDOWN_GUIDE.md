# Programs Dropdown Menu - Implementation Guide

## ✅ What Was Implemented

### 1. **Multi-Level Dropdown Menu**
Created a comprehensive "Select Programs" dropdown in the navigation bar with:
- **3 Main Categories:**
  - PG Courses (4 courses)
  - Fellowship (8 programs)
  - Others (4 certificates)

### 2. **Features Implemented**

#### Desktop Experience
- ✅ Hover to open dropdown
- ✅ Click to toggle dropdown
- ✅ Nested dropdowns (hover over category to see courses)
- ✅ Smooth slide-down and slide-right animations
- ✅ Click outside to close
- ✅ Icons for each category and course
- ✅ "View All Courses" link at bottom
- ✅ Color-coded categories (Wine-red for PG, Royal-violet for Fellowship, Blue for Others)

#### Mobile Experience
- ✅ Collapsible accordion-style menu
- ✅ Tap to expand category
- ✅ Tap again to collapse
- ✅ Smooth animations
- ✅ Scrollable if content exceeds screen height
- ✅ Touch-friendly spacing

### 3. **Course Navigation**
Each course in the dropdown:
- Links to `/course/:id` route
- Closes menu after selection
- Shows course name and icon
- Has hover effects

### 4. **Responsive Design**
- **Desktop (md and above):** Horizontal nested dropdowns
- **Mobile:** Vertical accordion with collapsible sections
- **Tablet:** Adapts based on screen size

### 5. **Animations Added**
```css
.animate-slideDown  /* Dropdown slide down effect */
.animate-slideRight /* Nested menu slide right effect */
```

## 📋 Available Programs

### PG Courses (Graduate Programs)
1. PG Diploma in Clinical Cardiology (ID: 9)
2. PG Diploma in Emergency Medicine (ID: 10)
3. PG Diploma in Neurology (ID: 11)
4. PG Diploma in Orthopedics (ID: 12)

### Fellowship Programs
1. Fellowship In Abdominal Imaging (ID: 1)
2. Fellowship In Breast Imaging (ID: 2)
3. Fellowship In Obstetrics Ultrasound (ID: 3)
4. Fellowship In Women's Imaging (ID: 4)
5. Fellowship In Interventional Cardiology (ID: 5)
6. Fellowship In Emergency Radiology (ID: 6)
7. Fellowship In Pediatric Imaging (ID: 7)
8. Fellowship In Neuro Imaging (ID: 8)

### Others (Certificates)
1. Certificate in Medical Coding (ID: cert1)
2. Certificate in Healthcare Management (ID: cert2)
3. Certificate in Clinical Research (ID: cert3)
4. Certificate in Medical Ethics (ID: cert4)

## 🎨 Design Details

### Color Scheme
- **PG Courses:** Wine-red (#8B0000) icons
- **Fellowship:** Royal-violet (#6A0DAD) icons
- **Others:** Blue (#3B82F6) icons
- **Hover:** Gradient background (wine-red to royal-violet)

### Icons Used
- 🎓 FaGraduationCap - PG Courses
- 👨‍⚕️ FaUserMd - Fellowship
- 📜 FaCertificate - Others
- ❤️ FaHeart - Cardiology courses
- 🔬 FaStethoscope - Medical courses
- 🧠 FaBrain - Neurology courses
- 👶 FaBaby - Pediatric/Obstetrics courses

## 🔧 How to Add More Courses

Edit `/src/components/Navbar.tsx` and update the `programsMenu` object:

```tsx
const programsMenu = {
  pgCourses: {
    title: 'PG Courses',
    icon: <FaGraduationCap className="text-wine-red text-xl" />,
    courses: [
      { id: 13, name: 'New PG Course', icon: <FaIcon /> },
      // Add more courses here
    ]
  },
  // ... other categories
}
```

## 🚀 Testing the Dropdown

1. **Desktop Testing:**
   - Hover over "Select Programs" → Dropdown appears
   - Hover over a category (e.g., "PG Courses") → Course list appears on right
   - Click any course → Navigates to course detail page
   - Click outside → Dropdown closes

2. **Mobile Testing:**
   - Tap hamburger menu → Mobile menu opens
   - Tap "Select Programs" → Categories expand
   - Tap a category (e.g., "Fellowship") → Course list expands
   - Tap a course → Navigates to course detail
   - Tap "View All Courses" → Goes to courses page

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (md breakpoint)
- **Desktop:** ≥ 768px

## ⚡ Performance

- Uses `useState` for menu states
- `useEffect` for click-outside detection
- `useRef` to track dropdown element
- Smooth CSS animations (0.2s duration)
- No unnecessary re-renders

## 🔗 Related Files

- `/src/components/Navbar.tsx` - Main navigation component
- `/src/index.css` - Animation styles
- `/src/pages/CourseDetail.tsx` - Course detail page
- `/src/routes/AppRoutes.tsx` - Routing configuration

## 🎯 User Experience Features

1. **Smooth Transitions:** All dropdowns have 300ms transitions
2. **Visual Feedback:** Hover states change colors
3. **Accessibility:** Keyboard navigation supported
4. **Mobile-Friendly:** Large touch targets
5. **Intuitive:** Clear category hierarchy
6. **Fast Navigation:** Direct links to courses
7. **Consistent:** Matches overall site design

## 🌟 Additional Features

- **Active State:** Highlights current page/section
- **Gradient Buttons:** "Apply Now" with gradient
- **Logo Click:** Returns to home page
- **Scroll to Section:** Smooth scrolling for Contact
- **Close on Navigate:** Menu closes after selection

## 📊 State Management

```tsx
// Desktop dropdown states
const [isProgramsOpen, setIsProgramsOpen] = useState(false)
const [activeCategory, setActiveCategory] = useState<string | null>(null)

// Mobile dropdown states
const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false)
const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null)
```

## 🎨 Styling Classes

```tsx
// Dropdown container
"absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl"

// Nested dropdown
"absolute left-full top-0 ml-2 w-80 bg-white rounded-2xl shadow-2xl"

// Hover effects
"hover:bg-gradient-to-r hover:from-wine-red/10 hover:to-royal-violet/10"
```

---

## 🎉 Success!

Your navigation bar now has a fully functional, responsive dropdown menu system with:
- ✅ Three categories (PG Courses, Fellowship, Others)
- ✅ 16 total courses/programs
- ✅ Nested navigation
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Easy to expand
- ✅ Professional design

**Test URL:** http://localhost:5174

**Hover over "Select Programs" in the navigation bar to see it in action!**
