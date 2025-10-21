'use client';

import { 
  Heart,
  Shield,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.017 0C8.396 0 7.926.01 7.071.048 6.216.088 5.649.204 5.169.388a7.875 7.875 0 00-2.845 1.853A7.875 7.875 0 00.471 5.086C.287 5.566.171 6.133.131 6.988.093 7.843.083 8.313.083 11.934s.01 4.09.048 4.945c.04.855.156 1.422.34 1.902.187.777.487 1.434.923 1.87.436.436 1.093.736 1.87.923.48.184 1.047.3 1.902.34.855.038 1.325.048 4.946.048s4.09-.01 4.945-.048c.855-.04 1.422-.156 1.902-.34a7.875 7.875 0 001.87-.923c.436-.436.736-1.093.923-1.87.184-.48.3-1.047.34-1.902.038-.855.048-1.325.048-4.946s-.01-4.09-.048-4.945c-.04-.855-.156-1.422-.34-1.902a7.875 7.875 0 00-.923-1.87A7.875 7.875 0 0018.914.471c-.48-.184-1.047-.3-1.902-.34C16.157.01 15.687 0 12.017 0zm0 2.165c3.556 0 3.982.01 4.818.046.748.034 1.155.157 1.426.26.358.14.614.307.883.576.269.269.437.525.576.883.103.271.226.678.26 1.426.037.836.046 1.262.046 4.818s-.01 3.982-.046 4.818c-.034.748-.157 1.155-.26 1.426-.14.358-.307.614-.576.883-.269.269-.525.437-.883.576-.271.103-.678.226-1.426.26-.836.037-1.262.046-4.818.046s-3.982-.01-4.818-.046c-.748-.034-1.155-.157-1.426-.26a2.72 2.72 0 01-.883-.576 2.72 2.72 0 01-.576-.883c-.103-.271-.226-.678-.26-1.426-.037-.836-.046-1.262-.046-4.818s.01-3.982.046-4.818c.034-.748.157-1.155.26-1.426.14-.358.307-.614.576-.883.269-.269.525-.437.883-.576.271-.103.678-.226 1.426-.26.836-.037 1.262-.046 4.818-.046zm0 3.68a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zm0 8.506a3.351 3.351 0 110-6.702 3.351 3.351 0 010 6.702zm6.584-8.703a1.204 1.204 0 11-2.408 0 1.204 1.204 0 012.408 0z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
    { name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
    { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
  ];

  const footerLinks = {
    platform: [
      { name: 'Acerca de Nosotros', href: '/about' },
      { name: 'Nuestros Servicios', href: '/services' },
      { name: 'Equipo Profesional', href: '/team' },
      { name: 'Testimonios', href: '/testimonials' },
    ],
    support: [
      { name: 'Centro de Ayuda', href: '/help' },
      { name: 'Preguntas Frecuentes', href: '/faq' },
      { name: 'Contactar Soporte', href: '/support' },
      { name: 'Reportar Problema', href: '/report' },
    ],
    legal: [
      { name: 'Términos de Servicio', href: '/terms' },
      { name: 'Política de Privacidad', href: '/privacy' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'Consentimiento Informado', href: '/consent' },
    ],
    therapy: [
      { name: 'Tipos de Terapia', href: '/therapy-types' },
      { name: 'Emergencias', href: '/emergency' },
      { name: 'Recursos de Salud Mental', href: '/resources' },
      { name: 'Programas Especializados', href: '/programs' },
    ],
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🌙</span>
                <span className="text-2xl font-bold">Lunna Platform</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Tu bienestar mental es nuestra prioridad. Conectamos a personas con terapeutas 
                profesionales para brindar apoyo psicológico de calidad, accesible y seguro.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">692866417</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">sulat3821@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Barcelona, España</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900 border border-red-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-red-300" />
                  <span className="text-sm font-semibold text-red-300">Emergencias</span>
                </div>
                <p className="text-xs text-red-200">
                  Si tienes pensamientos de autolesión, llama al 024 (Línea de Atención 
                  a la Conducta Suicida) o acude al servicio de emergencias más cercano.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Plataforma
              </h3>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Terapia & Apoyo
              </h3>
              <ul className="space-y-2">
                {footerLinks.therapy.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Soporte y Legal
              </h3>
              <ul className="space-y-2 mb-6">
                {footerLinks.support.slice(0, 2).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
              
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Lunna Platform.</span>
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>para tu bienestar mental.</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm hidden sm:block">Síguenos:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Certificado ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>GDPR Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Colegio Oficial de Psicólogos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}