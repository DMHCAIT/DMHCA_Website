import { FaWhatsapp, FaPhone } from 'react-icons/fa'

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col space-y-3 sm:space-y-4">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <FaWhatsapp className="text-white text-xl sm:text-2xl" />
        </div>
        <div className="hidden sm:block absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us
        </div>
      </a>

      {/* Call Button */}
      <a
        href="tel:+911234567890"
        className="group"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-coral-red hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <FaPhone className="text-white text-lg sm:text-xl" />
        </div>
        <div className="hidden sm:block absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Call us now
        </div>
      </a>
    </div>
  )
}

export default FloatingIcons