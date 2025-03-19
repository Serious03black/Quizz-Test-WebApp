/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { MapPin, Phone, Mail, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | CSMSS Chh. Shahu College of Engineering";
  }, []);

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <main className="flex-grow">
        {/* Hero Section with Background Animation */}
        <section className="relative bg-gradient-to-r flex from-blue-100 to-indigo-50 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute right-20 top-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute left-40 bottom-10 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 px-4 py-1 bg-white/80 backdrop-blur-sm rounded-full text-college-blue text-sm font-medium shadow-sm"
              >
                REACH OUT TO US
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600"
              >
                We'd love to hear from you. Get in touch with us.
              </motion.p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Contact Information */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column: Contact Information */}
              <div className="space-y-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-bold text-gray-900 mb-6"
                >
                  Get In Touch
                </motion.h2>

                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-college-blue shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">College Address</h3>
                      <p className="text-gray-600 mt-1">
                        CSMSS Chh.Shahu College of Engineering,<br />
                        Kanchanwadi, Paithan Road,<br />
                        Chhatrapati Sambhajinagar (Aurangabad), MS, India – 431 002.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-college-blue shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Phone Numbers</h3>
                      <p className="text-gray-600 mt-1">
                        Tel.: (0240) 2646363, 2646373, 2646350, 2379012<br />
                        9823461548, 9011629299<br />
                        Fax: (0240) 2379015
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-college-blue shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <div className="text-gray-600 mt-1">
                        <a href="mailto:info@csmssengg.org" className="hover:text-college-blue transition-colors">
                          info@csmssengg.org
                        </a><br />
                        <a href="mailto:admissions@csmssengg.org" className="hover:text-college-blue transition-colors">
                          admissions@csmssengg.org
                        </a><br />
                        <a href="mailto:placement@csmssengg.org" className="hover:text-college-blue transition-colors">
                          placement@csmssengg.org
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-college-blue shrink-0">
                      <Info className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Management</h3>
                      <p className="text-gray-600 mt-1">
                        CHHATRAPATI SHAHU MAHARAJ SHIKSHAN SANSTHA<br />
                        Kanchanwadi, Paithan Road,<br />
                        Chhatrapati Sambhajinagar (Aurangabad) - 431 002.<br />
                        Tel. : (0240) 2379053, 2379248, 2646464<br />
                        Fax: (0240) 2379035, 2379355, 2646222
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback</h3>
                  <ul className="space-y-3">
                    {[
                      "AICTE Student Feedback Online",
                      "AICTE Faculty Feedback Online",
                      "Student Feedback - Offline (Contact to respective Head of Department)",
                      "Online Grievance",
                    ].map((item, index) => (
                      <li key={index} className="group">
                        <a
                          href="#"
                          className="flex items-center py-2 text-gray-700 hover:text-college-blue transition-colors"
                        >
                          <ArrowRight className="h-4 w-0 mr-0 text-college-blue group-hover:w-4 group-hover:mr-2 transition-all duration-300 overflow-hidden" />
                          <span>{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Right Column: YouTube Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-730 h-315 rounded-xl overflow-hidden shadow-lg"
              >
              <iframe width="730" height="315" src="https://www.youtube.com/embed/6CFft1KnkHc?si=MrpXP9b8B1GY2flJ" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section with Animation */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Find Us On Map</h2>
              <p className="text-gray-600">Plan your visit to our campus located in Kanchanwadi, Aurangabad</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none z-10"></div>
              <div className="w-full h-[500px] bg-gray-200">
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
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;