'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Cake, GraduationCap, Trees } from 'lucide-react';

const scenarios = [
  {
    title: 'Game Day',
    description: 'Bring more excitement to every cheer.',
    icon: Gamepad2,
    color: 'from-orange-400 to-red-500',
    image: '🏈',
  },
  {
    title: 'Birthday Parties',
    description: 'Add playful energy to celebrations.',
    icon: Cake,
    color: 'from-pink-400 to-rose-500',
    image: '🎂',
  },
  {
    title: 'School Events',
    description: 'A fun accessory for group activities.',
    icon: GraduationCap,
    color: 'from-blue-400 to-indigo-500',
    image: '🎓',
  },
  {
    title: 'Outdoor Gatherings',
    description: 'Perfect for family fun and event moments.',
    icon: Trees,
    color: 'from-green-400 to-emerald-500',
    image: '🏕️',
  },
];

export default function UseScenariosSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Made for Real Fun Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Our products are designed to enhance every celebration, game day, and outdoor adventure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${scenario.color} opacity-90`} />
              
              <div className="relative p-8 lg:p-10 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <scenario.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {scenario.title}
                  </h3>
                  
                  <p className="text-white/90 text-lg">
                    {scenario.description}
                  </p>
                </div>
                
                <div className="text-6xl mt-6 opacity-80 group-hover:scale-110 transition-transform duration-300">
                  {scenario.image}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
