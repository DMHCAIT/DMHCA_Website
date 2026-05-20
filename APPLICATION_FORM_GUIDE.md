# Application Form - Program Selection Feature

## ✅ What's New in the Application Form

The application form now includes an **interactive, categorized program selection system** instead of a simple dropdown menu.

---

## 🎯 Key Features

### 1. **Two-Step Program Selection**

#### Step 1: Select Program Category
Users first choose from three main categories:

- **🎓 PG Courses** (4 programs)
  - Wine-red theme
  - Graduate-level diploma programs
  
- **👨‍⚕️ Fellowship** (8 programs)
  - Royal-violet theme
  - Advanced fellowship programs
  
- **📜 Others** (4 certificates)
  - Blue theme
  - Certificate courses

#### Step 2: Select Specific Program
After selecting a category, a list of programs appears dynamically:
- Each program displays with an icon
- Click to select
- Visual confirmation with checkmark
- Selected program highlighted with gradient

---

## 🎨 Visual Design

### Category Cards
```
┌─────────────────────┐
│       🎓            │
│   PG Courses        │
│   4 Programs        │
└─────────────────────┘
```

**States:**
- **Unselected:** White background, gray border
- **Hover:** Border changes to wine-red
- **Selected:** Gradient background (wine-red/violet/blue), white text, shadow, slight scale

### Program Cards
```
┌──────────────────────────────┐
│ ❤️  PG Diploma in Cardiology │
│                          ✓   │
└──────────────────────────────┘
```

**States:**
- **Unselected:** White background, gray border
- **Hover:** Border changes to wine-red, shadow appears
- **Selected:** Gradient background, white text, checkmark icon

---

## 📋 Available Programs

### PG Courses (Graduate Programs)
1. 🫀 **PG Diploma in Clinical Cardiology**
2. 🩺 **PG Diploma in Emergency Medicine**
3. 🧠 **PG Diploma in Neurology**
4. 🦴 **PG Diploma in Orthopedics**

### Fellowship Programs
1. 🩺 **Fellowship In Abdominal Imaging**
2. 🩺 **Fellowship In Breast Imaging**
3. 👶 **Fellowship In Obstetrics Ultrasound**
4. 🩺 **Fellowship In Women's Imaging**
5. 🫀 **Fellowship In Interventional Cardiology**
6. 🩺 **Fellowship In Emergency Radiology**
7. 👶 **Fellowship In Pediatric Imaging**
8. 🧠 **Fellowship In Neuro Imaging**

### Others (Certificates)
1. 📜 **Certificate in Medical Coding**
2. 📜 **Certificate in Healthcare Management**
3. 📜 **Certificate in Clinical Research**
4. 📜 **Certificate in Medical Ethics**

---

## 🔄 Interactive Flow

```
Application Form
    ↓
Personal Information (Name, Email, Phone, Qualification)
    ↓
Academic Information (Year of Passing, Experience, Institution)
    ↓
Program Selection
    ├─ Step 1: Choose Category (PG/Fellowship/Others)
    │   └─ Click on category card
    │       └─ Category highlights with gradient
    │
    └─ Step 2: Choose Program
        └─ Program list appears (animated slide-down)
            └─ Click on program
                └─ Program highlights with gradient
                    └─ Confirmation card appears showing selection
    ↓
Statement of Purpose (Why you want this program)
    ↓
Submit Application
    ↓
Success Message + Form Reset
```

---

## 💡 User Experience Features

### 1. **Visual Feedback**
- ✅ Selected items show checkmark icon
- ✅ Confirmation card displays selected program
- ✅ Color-coded by category type
- ✅ Smooth animations on state changes

### 2. **Form Validation**
- ✅ All required fields marked with red asterisk (*)
- ✅ Cannot submit without selecting category AND program
- ✅ Alert messages guide user if validation fails

### 3. **Responsive Design**
- **Desktop:** 3-column category grid, 2-column program grid
- **Mobile:** Stacked single column layout
- **Tablet:** Adapts based on screen size

### 4. **Animations**
- **slideDown:** Programs list appears smoothly
- **Scale up:** Selected cards grow slightly
- **Color transitions:** Smooth gradient fades

---

## 🎓 Application Process Timeline

The form now includes a visual timeline showing the 4-step process:

```
┌────────────────────────────────────────────────────────────┐
│  [1] Submit     [2] Review     [3] Interview  [4] Admission│
│  Application    Documents      Scheduled      Letter Sent  │
│  1-2 days       3-5 days       Within 7 days  Within 3 days│
└────────────────────────────────────────────────────────────┘
```

Each step shows:
- Number badge with gradient
- Icon representation
- Step title and description
- Expected duration

---

## 🔧 Technical Implementation

### State Management
```tsx
// Form data includes program category and selected program
const [formData, setFormData] = useState({
  ...
  programCategory: '',  // Selected category
  program: '',          // Selected program name
  ...
})

// Track which category is selected
const [selectedCategory, setSelectedCategory] = useState('')
```

### Data Structure
```tsx
programsData = {
  pgCourses: {
    title: 'PG Courses',
    icon: icon component,
    color: gradient colors,
    courses: [array of program objects]
  },
  fellowship: { ... },
  others: { ... }
}
```

### Form Submission
```tsx
handleSubmit() {
  1. Validate category and program selected
  2. Show success message with program name
  3. Reset form and selections
}
```

---

## 📱 Mobile Responsive Behavior

### Desktop (≥768px)
- Category cards: 3 columns
- Program cards: 2 columns
- Side-by-side layout for better scanning

### Mobile (<768px)
- All cards: 1 column (stacked)
- Full-width cards for easy tapping
- Larger touch targets
- Scrollable program list

---

## 🎯 Validation Rules

1. **Personal Information:**
   - Full Name, Email, Phone: Required
   - Qualification: Required (dropdown)

2. **Academic Information:**
   - Year of Passing: Required (1980-2026)
   - Experience: Required (0+)
   - Current Institution: Optional

3. **Program Selection:**
   - Category: Required (must select one)
   - Program: Required (must select one from category)
   - Statement of Purpose: Required (min text)

4. **Submit Validation:**
   - If category or program missing → Alert shown
   - If all valid → Success message → Form reset

---

## 🎨 Color Scheme

### PG Courses
- Primary: `#8B0000` (wine-red)
- Gradient: `from-wine-red to-wine-red/80`
- Icons: Wine-red colored

### Fellowship
- Primary: `#6A0DAD` (royal-violet)
- Gradient: `from-royal-violet to-royal-violet/80`
- Icons: Royal-violet colored

### Others
- Primary: `#3B82F6` (blue-500)
- Gradient: `from-blue-500 to-blue-400`
- Icons: Blue colored

### Confirmation Card
- Background: `from-green-50 to-blue-50`
- Border: `border-green-200`
- Icon: Green checkmark

---

## ✨ Animation Classes

Used from `index.css`:

```css
.animate-slideDown {
  animation: slideDown 0.2s ease-out forwards;
}
```

Applied to:
- Program list when category selected
- Confirmation card when program selected

---

## 🚀 How to Test

1. **Open Application Form:**
   - Navigate to `/apply` or click "Apply Now" button
   - View the 4-step process timeline at top

2. **Fill Personal Information:**
   - Enter name, email, phone
   - Select qualification from dropdown

3. **Fill Academic Information:**
   - Enter year of passing and experience
   - Optionally add current institution

4. **Select Program (Two Steps):**
   - **Step 1:** Click on a category card (PG/Fellowship/Others)
     - Card should highlight with gradient
   - **Step 2:** Scroll to see program list appear
     - Click on specific program
     - See checkmark and confirmation card

5. **Write Statement:**
   - Enter why you want to pursue the program

6. **Submit:**
   - Click "Submit Application"
   - See success alert with program name
   - Form resets automatically

---

## 📊 Form Data Captured

When user submits, the form captures:

```json
{
  "fullName": "Dr. John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "qualification": "MBBS",
  "yearOfPassing": "2020",
  "experience": "3",
  "currentInstitution": "City Hospital",
  "programCategory": "fellowship",
  "program": "Fellowship In Interventional Cardiology",
  "statement": "I want to pursue..."
}
```

---

## 🎉 Success!

The application form now provides a **modern, interactive, and user-friendly** program selection experience that:

- ✅ Guides users through category selection
- ✅ Shows all available programs in each category
- ✅ Provides clear visual feedback
- ✅ Works perfectly on all devices
- ✅ Validates selections before submission
- ✅ Displays application process timeline

**Test it now: http://localhost:5174/apply**

---

## 🔮 Future Enhancements

Possible additions:
- Search/filter programs in Step 2
- Program comparison feature
- Save draft applications
- Upload documents directly
- Real-time availability indicators
- Program details preview on hover
- Multi-program application option

---

## 📞 Support

For technical issues or questions:
- Email: admissions@dmhca.edu
- Phone: +91 98765 43210
- Response time: Within 48 hours
