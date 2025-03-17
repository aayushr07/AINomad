'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden pt-40">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2, scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15, scale: 1.5 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 opacity-10 rounded-full filter blur-2xl"
        ></motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 z-10"
      >
        <h1 className="text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          AI-Nomad: Smart Travel Assistant
        </h1>
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          Plan your trips effortlessly with AI-driven itineraries, real-time assistance, and secure travel management.
        </p>
      </motion.header>

      {/* Features Section */}
      <section className="mt-16 px-6 sm:px-12 md:px-24 lg:px-32 text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-white"
        >
          Why AI-Nomad?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold">AI-Powered Itineraries</h3>
            <p className="mt-4 text-gray-300">
              Get personalized travel plans based on your interests, weather, and safety conditions.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold">Real-Time Assistance</h3>
            <p className="mt-4 text-gray-300">
              Solve travel problems instantly with AI-driven suggestions and support.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold">Secure Document Storage</h3>
            <p className="mt-4 text-gray-300">
              Keep your passports, visas, and travel documents safe with blockchain security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.button
          onClick={() => router.push('/plan-trip')}
          whileHover={{ scale: 1.1, backgroundColor: '#fff', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-12 py-4 bg-blue-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-2xl transition-all"
        >
          Plan Your Trip
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} AI-Nomad. All rights reserved.
      </footer>
    </div>
  );
}
