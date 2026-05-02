'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  User,
  Globe,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Food Street, Dhaka', 'Bangladesh'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+880 1234 56789', '+880 9876 54321'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@smartmeal.com', 'support@smartmeal.com'],
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      color: 'from-teal-500 to-emerald-500'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the Sign Up button, fill in your details, and verify your email address to get started.'
    },
    {
      question: 'Is SmartMeal free to use?',
      answer: 'Yes, SmartMeal offers a free plan with basic features. Premium plans are available for advanced features.'
    },
    {
      question: 'How can I track meals?',
      answer: 'After logging in, go to the Meal Tracker section and add your daily breakfast, lunch, and dinner meals.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription anytime from your account settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 border border-white/20">
            <MessageSquare className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-100 text-sm font-semibold">Get in Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
              SmartMeal
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="white"/>
          </svg>
        </div>
      </section>

      
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-semibold">Send Message</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Let's Talk
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                {isSubmitted && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">Message sent successfully!</span>
                  </div>
                )}
              </form>
            </div>

            
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-semibold">Connect With Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Follow Us
              </h2>
              <p className="text-gray-600 mb-8">
                Stay connected on social media for updates and news.
              </p>
              
              <div className="flex gap-4 mb-12">
                <a href="#" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 text-emerald-600">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 text-emerald-600">
                  <BsTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 text-emerald-600">
                  <BsInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 text-emerald-600">
                  <LiaLinkedin className="w-5 h-5" />
                </a>
              </div>

              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-xl font-semibold text-gray-900 hover:bg-emerald-50 transition-colors">
                        <span className="text-sm">{faq.question}</span>
                        <ArrowRight className="w-4 h-4 transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="p-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              
              <div className="mt-6 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-center text-white">
                <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-emerald-100 text-sm mb-4">Our support team is available 24/7</p>
                <a href="tel:+880123456789" className="inline-flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-4 h-4" />
                  +880 1234 56789
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.348346286183!2d90.392418!3d23.750965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd552c2b3b%3A0x4e5b8e5e5e5e5e5e!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;