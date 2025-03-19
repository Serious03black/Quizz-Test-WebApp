import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Info } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600">
                We'd love to hear from you. Get in touch with us.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <MapPin className="h-6 w-6 text-college-blue mr-4" />
                    <div>
                      <h3 className="font-medium">College Address</h3>
                      <p className="text-gray-600 mt-1">
                        CSMSS Chh.Shahu College of Engineering,<br />
                        Kanchanwadi, Paithan Road,<br />
                        Chhatrapati Sambhajinagar (Aurangabad), MS, India – 431 002.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Phone className="h-6 w-6 text-college-blue mr-4" />
                    <div>
                      <h3 className="font-medium">Phone Numbers</h3>
                      <p className="text-gray-600 mt-1">
                        Tel.: (0240) 2646363, 2646373, 2646350, 2379012<br />
                        9823461548, 9011629299<br />
                        Fax: (0240) 2379015
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Mail className="h-6 w-6 text-college-blue mr-4" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600 mt-1">
                        info@csmssengg.org<br />
                        admissions@csmssengg.org<br />
                        placement@csmssengg.org
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Info className="h-6 w-6 text-college-blue mr-4" />
                    <div>
                      <h3 className="font-medium">Management</h3>
                      <p className="text-gray-600 mt-1">
                        CHHATRAPATI SHAHU MAHARAJ SHIKSHAN SANSTHA<br />
                        Kanchanwadi, Paithan Road,<br />
                        Chhatrapati Sambhajinagar (Aurangabad) - 431 002.<br />
                        Tel. : (0240) 2379053, 2379248, 2646464<br />
                        Fax: (0240) 2379035, 2379355, 2646222
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback</h3>
                  <ul className="space-y-2 text-college-blue">
                    <li>
                      <a href="#" className="hover:underline">AICTE Student Feedback Online</a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">AICTE Faculty Feedback Online</a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">Student Feedback - Offline (Contact to respective Head of Department)</a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">Online Grievance</a>
                    </li>
                  </ul>
                </div>
              </div>
              
              
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us On Map</h2>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.1033468678967!2d75.3605!3d19.8733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb989ce71a2631%3A0x155cf756b42e77cb!2sCSMSS%20Chhatrapati%20Shahu%20Maharaj%20Shikshan%20Sanstha%20College%20of%20Engineering%20Aurangabad!5e0!3m2!1sen!2sin!4v1627306854684!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="CSMSS College Map"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
        </div>
  );
};

export default ContactUs;