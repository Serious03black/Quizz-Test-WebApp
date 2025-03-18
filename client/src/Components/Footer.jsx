/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const canvasRef = useRef(null);

  // Three.js Effect for Footer
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add Earth Model
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64); // Increased Earth size and detail
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"), // Earth texture
      bumpMap: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_bump_2048.jpg"), // Bump map for terrain
      specularMap: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"), // Specular map for water reflections
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, 0, -15); // Position the Earth closer to the camera
    scene.add(earth);

    // Add Stars Background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000; // Number of stars
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 1000;
      starPositions[i + 1] = (Math.random() - 0.5) * 1000;
      starPositions[i + 2] = (Math.random() - 0.5) * 1000;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1, // Smaller stars
      color: 0xffffff,
      transparent: true,
      opacity: 0.5, // Reduced star opacity
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Ambient light
    const pointLight = new THREE.PointLight(0xffffff, 2, 200); // Point light
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    camera.position.z = 10; // Move the camera closer to the Earth

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.002; // Rotate the Earth
      stars.rotation.y += 0.0005; // Rotate the stars
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (email) {
        setSubscriptionStatus('success');
        setEmail('');
        setTimeout(() => setSubscriptionStatus(null), 3000);
      } else {
        setSubscriptionStatus('error');
      }
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Waste management SVG icons
  const WasteIcon = () => (
    <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v14m6-14v14" />
    </svg>
  );

  const LinksIcon = () => (
    <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );

  const ContactIcon = () => (
    <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const NewsletterIcon = () => (
    <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-black py-12 font-poppins overflow-hidden"
    >
      {/* Three.js Canvas for Footer */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center">
              <WasteIcon />
              <span className="text-3xl font-pacifico text-white">CSMSS College of Engineering</span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">Pioneering excellence in education and innovation</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center">
              <LinksIcon />
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {['features', 'pricing', 'contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5, color: '#ffffff' }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/${item}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center">
              <ContactIcon />
              <h3 className="text-lg font-semibold text-white">Contact</h3>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-300 text-sm">
                Email: <a href="mailto:info@csmssengg.org" className="text-white hover:text-gray-400 transition-colors">info@csmssengg.org</a>
              </li>
              <li className="text-gray-300 text-sm">
                Phone: <a href="tel:+912406646363" className="text-white hover:text-gray-400 transition-colors">+91-240-6646363</a>
              </li>
              <li className="text-gray-300 text-sm">
                Address: Kanchanwadi, Paithan Road, Chhatrapati Sambhajinagar (Aurangabad), MS, India - 431002
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center">
              <NewsletterIcon />
              <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-button bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-button hover:bg-teal-400 transition-colors text-sm"
                >
                  Subscribe
                </motion.button>
              </div>
              {subscriptionStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-green-400 text-xs"
                >
                  Successfully subscribed!
                </motion.p>
              )}
              {subscriptionStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-red-400 text-xs"
                >
                  Please enter a valid email
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300 text-sm"
        >
          <p>© SHIVAYAN Enterprises</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;