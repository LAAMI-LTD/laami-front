"use client";

interface SimpleMapProps {
  location?: string;
  title?: string;
}

export default function SimpleMap({ 
  location = "Eldoret, Kenya",
  title = "LAAMI LABS"
}: SimpleMapProps) {
  // Your provided Google Maps embed URL
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6554003043098!2d35.2732939!3d0.5177854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17810100ccaeb923%3A0x56935602e2a2ab91!2sLAAMI%20LABS!5e0!3m2!1sen!2ske!4v1778729600400!5m2!1sen!2ske";

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#01051f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find us here
          </h2>
          <div className="w-20 h-1 bg-[#a50044] mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {location}
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${title} Location Map`}
            className="w-full h-full"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=LAAMI+LABS+Eldoret"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#004d98] hover:text-[#a50044] transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </section>
  );
}