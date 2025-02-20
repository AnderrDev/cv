import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        e.target,
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 flex justify-center items-center" data-aos="fade-up">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contacto</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
          </motion.button>
          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-center font-medium"
            >
              ¡Mensaje enviado con éxito!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center font-medium"
            >
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}