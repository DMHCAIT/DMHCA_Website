import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaCalendarAlt, FaUser, FaClock, FaTag, FaHeart, FaShare, FaComment, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const Blogs = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [dbBlogs, setDbBlogs] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('blogs').select('*').eq('is_active', true).order('published_date', { ascending: false })
        if (data && data.length > 0) setDbBlogs(data)
      } catch (_) {}
    })()
  }, [])

  // Handle body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
      
      // Add ESC key listener
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedArticle(null)
        }
      }
      window.addEventListener('keydown', handleEsc)
      
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  const hardcodedFeaturedArticles = [
    {
      id: 1,
      title: 'Revolutionary Breakthrough in Cardiac Surgery: Minimally Invasive Techniques',
      excerpt: 'Recent advances in minimally invasive cardiac surgery are transforming patient outcomes and recovery times.',
      content: `
        <h2>Introduction</h2>
        <p>Recent advances in minimally invasive cardiac surgery are transforming patient outcomes and recovery times. These cutting-edge techniques represent a paradigm shift in how we approach cardiac procedures, offering patients faster recovery, reduced pain, and minimal scarring.</p>
        
        <h2>Key Innovations</h2>
        <p>The field has seen remarkable progress with robotic-assisted surgery, which allows surgeons to perform complex procedures through tiny incisions. This technology provides enhanced precision and dexterity, leading to better surgical outcomes.</p>
        
        <h2>Patient Benefits</h2>
        <ul>
          <li>Reduced hospital stay (typically 2-3 days vs. 7-10 days)</li>
          <li>Minimal scarring and cosmetic benefits</li>
          <li>Less post-operative pain</li>
          <li>Faster return to normal activities</li>
          <li>Lower risk of infection</li>
        </ul>
        
        <h2>Future Outlook</h2>
        <p>As technology continues to evolve, we expect even more sophisticated minimally invasive techniques that will further improve patient care and surgical precision. The integration of AI and machine learning promises to enhance surgical planning and execution.</p>
      `,
      author: 'Dr. Rajesh Kumar',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'cardiology',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop',
      featured: true,
      likes: 245,
      comments: 18,
      tags: ['Surgery', 'Innovation', 'Cardiology']
    },
    {
      id: 2,
      title: 'AI in Medical Diagnosis: The Future of Healthcare Technology',
      excerpt: 'Artificial Intelligence is revolutionizing medical diagnosis with unprecedented accuracy.',
      content: `
        <h2>The AI Revolution in Healthcare</h2>
        <p>Artificial Intelligence is revolutionizing medical diagnosis with unprecedented accuracy. Machine learning algorithms can now analyze medical images, patient data, and clinical notes with remarkable precision, often matching or exceeding human expert performance.</p>
        
        <h2>Current Applications</h2>
        <p>AI systems are being deployed across various medical specialties:</p>
        <ul>
          <li>Radiology: Detecting tumors and abnormalities in X-rays, CT scans, and MRIs</li>
          <li>Pathology: Analyzing tissue samples for cancer detection</li>
          <li>Cardiology: Predicting heart disease risk and analyzing ECG patterns</li>
          <li>Dermatology: Identifying skin conditions and melanoma</li>
        </ul>
        
        <h2>Benefits and Challenges</h2>
        <p>While AI offers tremendous benefits including faster diagnoses and reduced human error, it also presents challenges such as data privacy concerns, the need for diverse training datasets, and ensuring human oversight in critical decisions.</p>
        
        <h2>The Future</h2>
        <p>As AI technology matures, we can expect more sophisticated diagnostic tools that work seamlessly with healthcare professionals to provide better patient care and outcomes.</p>
      `,
      author: 'Dr. Priya Sharma',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
      featured: true,
      likes: 198,
      comments: 24,
      tags: ['AI', 'Technology', 'Diagnosis']
    }
  ]

  const hardcodedOtherArticles = [
    ...hardcodedFeaturedArticles,
    {
      id: 3,
      title: 'Managing Pediatric Emergencies: A Comprehensive Guide',
      excerpt: 'Essential protocols for handling pediatric emergencies.',
      content: `
        <h2>Introduction to Pediatric Emergency Care</h2>
        <p>Pediatric emergencies require specialized knowledge and quick decision-making. This comprehensive guide covers essential protocols that every healthcare provider should know when dealing with critical situations involving children.</p>
        
        <h2>Common Pediatric Emergencies</h2>
        <ul>
          <li>Respiratory distress and airway obstruction</li>
          <li>Seizures and status epilepticus</li>
          <li>Anaphylaxis and severe allergic reactions</li>
          <li>Trauma and injury management</li>
          <li>Dehydration and shock</li>
        </ul>
        
        <h2>Best Practices</h2>
        <p>Always maintain clear communication with parents, ensure proper equipment sizing for pediatric patients, and follow age-specific treatment protocols.</p>
      `,
      author: 'Dr. Meera Agarwal',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'pediatrics',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=350&fit=crop',
      featured: false,
      likes: 156,
      comments: 12,
      tags: ['Emergency', 'Pediatrics']
    },
    {
      id: 4,
      title: 'Neurological Disorders: Early Detection and Treatment Strategies',
      excerpt: 'Importance of early detection in neurological conditions.',
      content: `
        <h2>The Critical Role of Early Detection</h2>
        <p>Early detection of neurological disorders can significantly improve patient outcomes and quality of life. This article explores the latest strategies for identifying and treating neurological conditions at their earliest stages.</p>
        
        <h2>Key Neurological Conditions</h2>
        <p>We focus on conditions such as Parkinson's disease, Alzheimer's disease, multiple sclerosis, and stroke, examining the warning signs and diagnostic approaches for each.</p>
        
        <h2>Treatment Advancements</h2>
        <p>Recent developments in neurological treatments include targeted therapies, neuromodulation techniques, and personalized medicine approaches that offer new hope to patients.</p>
      `,
      author: 'Dr. Amit Patel',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'neurology',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=350&fit=crop',
      featured: false,
      likes: 189,
      comments: 15,
      tags: ['Neurology', 'Treatment']
    }
  ]

  const hardcodedArticles = [...hardcodedOtherArticles]

  // Use Supabase data if available, otherwise show hardcoded articles
  const allArticles = dbBlogs.length > 0 ? dbBlogs.map(b => ({
    ...b,
    date: b.published_date,
    readTime: b.read_time,
    likes: b.likes ?? 0,
    comments: 0,
    tags: Array.isArray(b.tags) ? b.tags : []
  })) : hardcodedArticles

  const featuredArticles = allArticles.filter((a: any) => a.is_featured || a.featured)

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const BlogCard = ({ article, size = 'normal' }: { article: any, size?: string }) => (

    <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col">

      <div className={`${size === 'featured' ? 'h-64' : 'h-48'} relative overflow-hidden`}>

        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>

      </div>

      <div className="p-6 flex flex-col flex-grow">

        <div className="flex items-center justify-between mb-4">

          <span className="px-3 py-1 bg-wine-red/10 text-wine-red rounded-full text-sm font-semibold">
            {article.category}
          </span>

          <div className="flex items-center text-gray-500 text-sm">
            <FaClock className="mr-1"/>
            {article.readTime}
          </div>

        </div>

        <h3 className={`${size === 'featured' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-3`}>
          {article.title}
        </h3>

        <p className="text-gray-600 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center text-gray-500 text-sm">
            <FaUser className="mr-2"/>
            {article.author}
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <FaCalendarAlt className="mr-2"/>
            {new Date(article.date).toLocaleDateString()}
          </div>

        </div>

        <div className="flex flex-wrap gap-2 mb-4">

          {article.tags.map((tag:string,index:number)=>(
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              <FaTag className="inline mr-1"/>{tag}
            </span>
          ))}

        </div>

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center"><FaHeart className="mr-1"/>{article.likes}</span>
            <span className="flex items-center"><FaComment className="mr-1"/>{article.comments}</span>
          </div>

          <button className="flex items-center text-wine-red">
            <FaShare className="mr-1"/>Share
          </button>

        </div>

        <button 
          onClick={() => setSelectedArticle(article)}
          className="w-full mt-auto gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
        >
          Read More
        </button>

      </div>

    </article>

  )

  return (

    <div>
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>

      {/* HERO */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Medical <span className="text-jhu-gold">Insights</span>
          </h1>

          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Stay informed with the latest medical research and expert insights.
          </p>

        </div>

      </section>

      {/* Main Content Section - All content in one section */}
      <section className="relative z-20 bg-white">

        {/* SEARCH */}
        <div className="pt-8 sm:pt-12 pb-8 sm:pb-12">

          <div className="max-w-2xl mx-auto px-4 sm:px-6">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"/>

            <input
              type="text"
              placeholder="Search articles, topics, tags..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-red focus:border-transparent text-sm sm:text-base"
            />

          </div>

        </div>
        </div>


        {/* FEATURED ARTICLES - 2 EQUAL CARDS SIDE BY SIDE */}
        {featuredArticles.length > 0 && (

        <div className="py-12 sm:py-16">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

         <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-black">
  Featured Articles
</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map(article => (
              <BlogCard key={article.id} article={article} size="featured"/>
            ))}
          </div>

        </div>

        </div>

        )}


        {/* ALL ARTICLES */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">

            <div className="flex justify-between items-center mb-12">

            <h2 className="text-3xl font-bold text-gray-800">
              All Articles
            </h2>

            <p className="text-gray-600">
              {filteredArticles.length} articles found
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredArticles.map(article => (
              <BlogCard key={article.id} article={article}/>
            ))}

          </div>

          </div>
        </div>

      </section>

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedArticle(null)
            }
          }}
        >
          <div className="bg-white w-full max-w-3xl h-[95vh] rounded-xl shadow-2xl relative animate-slideUp flex flex-col overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors z-50"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Article Hero Image */}
            <div className="h-40 sm:h-48 md:h-56 w-full relative overflow-hidden flex-shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="px-2.5 py-1 bg-wine-red/90 rounded-md text-xs font-medium mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto">
              {/* Article Meta */}
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <FaUser className="text-gray-400" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{new Date(selectedArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-gray-400" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedArticle.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-200 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Stats */}
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-red-400" />{selectedArticle.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className="text-slate-500" />{selectedArticle.comments}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-4 sm:px-5 py-4">
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  style={{
                    lineHeight: '1.7',
                  }}
                />
              </div>
            </div>

            {/* Article Footer */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  By <span className="font-semibold text-gray-800">{selectedArticle.author}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default Blogs