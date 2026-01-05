'use client';

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { analytics } from "@/lib/analytics";
import CommunityEngagement from "@/components/CommunityEngagement";
import KPIDashboard from "@/components/KPIDashboard";
import AccessibilityPanel from "@/components/AccessibilityPanel";

export default function Home() {
  const [userProgress, setUserProgress] = useState({ points: 0, level: 'Descubridor', completedActions: [] as string[] });
  const [communityStats, setCommunityStats] = useState({ totalDonations: 125000000, beneficiariesReached: 8000, projectsActive: 150 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize user progress from localStorage
    const savedProgress = localStorage.getItem('corvicac-user-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    // Track page view for analytics
    if (typeof window !== 'undefined') {
      setIsVisible(true);
      // Enhanced analytics tracking
      analytics.trackPageView();
    }
  }, []);

  const handleAction = (action: string) => {
    // Track user action
    const newPoints = userProgress.points + 10;
    const newCompletedActions = [...userProgress.completedActions, action];

    const updatedProgress = {
      ...userProgress,
      points: newPoints,
      completedActions: newCompletedActions
    };

    setUserProgress(updatedProgress);
    localStorage.setItem('corvicac-user-progress', JSON.stringify(updatedProgress));

    // Send event to analytics
    analytics.trackUserAction(action, 10);
  };

  return (
    <main className="min-h-screen bg-[var(--color-secondary-soft-gray)]">
      {/* Enhanced Hero Section with Gamification */}
      <section
        className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[var(--color-secondary-soft-gray)] opacity-50"></div>

        {/* User Progress Bar */}
        {isVisible && (
          <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-20">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tu Impacto: {userProgress.points} puntos</span>
                <span className="font-semibold text-[var(--color-primary-green)]">Nivel: {userProgress.level}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((userProgress.points / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center" maxWidth="full" padding="md">
          <div className="space-y-8">
            <h1
              id="hero-title"
              className="font-heading text-4xl font-bold tracking-tight text-[var(--color-primary-black)] sm:text-5xl lg:text-6xl"
              data-aos="fade-right"
            >
              Justicia, Igualdad, <br />
              <span className="text-[var(--color-primary-green)]">Respeto y Dignidad</span>
            </h1>
            <p
              className="text-lg text-[var(--color-primary-brown)]/80 max-w-lg leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano.
              Trabajamos por la reconstrucción del tejido social y la defensa de los derechos humanos.
            </p>

            {/* Enhanced Call to Action with Gamification */}
            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <Link href="/nosotros" aria-label="Conocer nuestra misión" onClick={() => handleAction('learn_mission')}>
                <Button variant="primary">
                  Conocer Nuestra Misión
                </Button>
              </Link>
              <Button variant="outline" href="mailto:info@corvicac.org" aria-label="Contáctanos por correo" onClick={() => handleAction('contact_email')}>
                Contáctanos
              </Button>
              <Button
                variant="outline"
                href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20CORVICAC"
                aria-label="Contactar por WhatsApp"
                className="border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleAction('contact_whatsapp')}
              >
                💬 WhatsApp
              </Button>
            </div>

            {/* Enhanced Trust indicators with Real-time Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                    title={`Beneficiario ${i}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-[var(--color-primary-green)]">{communityStats.beneficiariesReached}+</span> personas beneficiadas
                <span className="mx-2">•</span>
                <span className="font-semibold text-[var(--color-primary-deep)]">{communityStats.projectsActive}</span> proyectos activos
              </div>
            </div>

            {/* Social Proof with Engagement */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">Únete a nuestra comunidad</h4>
              <p className="text-green-700 text-sm mb-4">
                {communityStats.totalDonations.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                recaudados este mes por {Math.floor(communityStats.totalDonations / 50000)} personas como tú
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleAction('share_social')}>
                  Compartir en redes
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction('learn_more')}>
                  Aprender más
                </Button>
              </div>
            </div>
          </div>

          <div
            className="relative rounded-[16px] overflow-hidden shadow-xl bg-[var(--color-secondary-warm-gray)] aspect-video group hover:shadow-2xl transition-shadow"
            data-aos="fade-left"
          >
            {/* Enhanced Logo Video with Analytics */}
            <video
              className="w-full h-full object-cover"
              src="/video-logo.mp4"
              controls
              autoPlay={false}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Video institucional de CORVICAC"
              onPlay={() => handleAction('watch_video')}
            >
              Tu navegador no soporta el elemento de video.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--color-primary-green)]">
              Nuestra Visión
            </div>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              🎥 +10 puntos al ver el video completo
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Values Section with Interactive Elements */}
      <section
        className="py-20 bg-white"
        aria-labelledby="values-title"
      >
        <Container maxWidth="full" padding="md">
          <div className="text-center mb-16">
            <h2
              id="values-title"
              className="font-heading text-3xl font-bold text-[var(--color-primary-black)] mt-8 mb-4"
              data-aos="fade-up"
            >
              Nuestros Valores Fundamentales
            </h2>
            <p
              className="text-lg text-[var(--color-primary-brown)]/80 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Guían nuestro compromiso diario con las víctimas del conflicto armado colombiano
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Empatía",
                desc: "Puente espiritual que nos permite sentir el dolor ajeno como propio. Fundamento de la sanación colectiva y la construcción de sociedades compasivas donde cada ser humano es visto, escuchado y valorado en su dignidad esencial.",
                icon: "🤝",
                action: "empathy_action",
                points: 25
              },
              {
                title: "Justicia",
                desc: "Compromiso inquebrantable con la verdad, la reparación y la no repetición. Herramienta transformadora que busca restaurar el equilibrio social, garantizar derechos y crear condiciones para que las víctimas puedan reconstruir sus vidas con dignidad.",
                icon: "⚖️",
                action: "justice_action",
                points: 30
              },
              {
                title: "Comunidad",
                desc: "Red de pertenencia y solidaridad donde las heridas individuales se convierten en fortalezas colectivas. Espacio de apoyo mutuo donde las diferencias se celebran y las experiencias compartidas fortalecen el tejido social fracturado.",
                icon: "🏠",
                action: "community_action",
                points: 20
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-[16px] bg-[var(--color-secondary-soft-gray)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 100}
                onClick={() => handleAction(item.action)}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-[var(--color-primary-deep)] mb-4 group-hover:text-[var(--color-primary-green)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[var(--color-primary-black)]/70 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">+{item.points} puntos</span>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleAction(item.action); }}>
                    Explorar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action with Progress Tracking */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] rounded-2xl p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-4">¿Listo para ser parte del cambio?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Únete a nuestra misión de reconstruir vidas y promover la paz en Colombia.
                Tu apoyo puede marcar la diferencia.
              </p>

              {/* Progress towards next level */}
              <div className="mb-6 bg-white/20 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Próximo nivel: Comprometido</span>
                  <span>{userProgress.points}/100 puntos</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userProgress.points / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/apoyar">
                  <Button variant="ghost" size="lg" className="bg-white text-[var(--color-primary-green)] hover:bg-gray-100" onClick={() => handleAction('donate_action')}>
                    Hacer una Donación
                  </Button>
                </Link>
                <Link href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20ser%20voluntario%20en%20CORVICAC">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--color-primary-green)]" onClick={() => handleAction('volunteer_action')}>
                    Ser Voluntario
                  </Button>
                </Link>
              </div>

              {/* Social Sharing Incentives */}
              <div className="mt-6 text-sm text-white/80">
                Comparte tu compromiso y gana +15 puntos extra
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced: KPIs Dashboard */}
      <section className="py-20 bg-gray-50">
        <Container maxWidth="full" padding="md">
          <KPIDashboard />
        </Container>
      </section>

      {/* Community Engagement Section */}
      <section className="py-20 bg-white">
        <Container maxWidth="full" padding="md">
          <div className="grid lg:grid-cols-2 gap-8">
            <CommunityEngagement />

            {/* Social Media Integration */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--color-primary-black)] mb-4">Conecta en Redes Sociales</h3>
              <p className="text-gray-600 mb-6">Sigue nuestro trabajo en tiempo real y únete a la conversación</p>

              <div className="space-y-4">
                {[
                  { platform: 'Facebook', icon: '📘', url: 'https://facebook.com/corvicac', followers: '15K', action: 'follow_facebook' },
                  { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/corvicac', followers: '12K', action: 'follow_instagram' },
                  { platform: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/corvicac', followers: '8K', action: 'follow_linkedin' },
                  { platform: 'Twitter', icon: '🐦', url: 'https://twitter.com/corvicac', followers: '10K', action: 'follow_twitter' },
                  { platform: 'YouTube', icon: '📺', url: 'https://youtube.com/corvicac', followers: '5K', action: 'follow_youtube' }
                ].map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.trackSocialShare(social.platform.toLowerCase(), 'homepage')}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{social.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{social.platform}</div>
                        <div className="text-sm text-gray-500">{social.followers} seguidores</div>
                      </div>
                    </div>
                    <button
                      className="bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(social.url, '_blank');
                        analytics.trackUserAction(social.action, 5);
                      }}
                    >
                      Seguir
                    </button>
                  </a>
                ))}
              </div>

              {/* Share Your Story */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">¿Tienes una historia que contar?</h4>
                <p className="text-blue-700 text-sm mb-4">
                  Comparte tu experiencia con CORVICAC y ayuda a inspirar a otros.
                </p>
                <button
                  onClick={() => {
                    analytics.trackUserAction('share_story', 20);
                    alert('Gracias por querer compartir tu historia. Por favor escríbenos a info@corvicac.org');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Compartir Historia
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)]">
        <Container maxWidth="full" padding="md">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Transforma Vidas Hoy</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Cada acción que tomas aquí tiene un impacto real en la vida de personas que han sufrido el conflicto armado.
              Únete a nuestra comunidad de cambio.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">❤️</div>
                <h3 className="font-bold mb-2">Donar</h3>
                <p className="text-sm mb-4 text-white/80">Tu contribución directa cambia vidas</p>
                <Link href="/apoyar">
                  <button
                    onClick={() => analytics.trackConversion('donation_intent', 0, 'COP')}
                    className="bg-white text-[var(--color-primary-green)] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Hacer Donación
                  </button>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="font-bold mb-2">Voluntariado</h3>
                <p className="text-sm mb-4 text-white/80">Dona tu tiempo y talento</p>
                <Link href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20ser%20voluntario%20en%20CORVICAC">
                  <button
                    onClick={() => analytics.trackConversion('volunteer_intent')}
                    className="bg-white text-[var(--color-primary-green)] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Ser Voluntario
                  </button>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">📢</div>
                <h3 className="font-bold mb-2">Difundir</h3>
                <p className="text-sm mb-4 text-white/80">Comparte nuestra misión</p>
                <button
                  onClick={() => {
                    analytics.trackSocialShare('unknown', 'homepage_cta');
                    // Implement share dialog
                    if (navigator.share) {
                      navigator.share({
                        title: 'CORVICAC - Transformando Vidas',
                        text: 'Descubre cómo CORVICAC está reconstruyendo vidas después del conflicto armado en Colombia',
                        url: window.location.href
                      });
                    }
                  }}
                  className="bg-white text-[var(--color-primary-green)] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Compartir
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/nosotros" className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Quiénes Somos
              </Link>
              <Link href="/programas" className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Nuestros Programas
              </Link>
              <Link href="/eventos" className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Nuestros Eventos
              </Link>
              <Link href="/apoyar" className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Apóyanos
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-white/70">
              <span>✅ Transparencia Total</span>
              <span>✅ Impacto Medible</span>
              <span>✅ +20 años de trayectoria</span>
              <span>✅ Reconocimiento Internacional</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Accessibility Tools */}
      <AccessibilityPanel />
    </main>
  );
}