'use client';

import React, { useState, useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

// Tipos para APIs del navegador - Solución definitiva para evitar loops
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface VoiceAssistantProps {
  isActive: boolean;
  onStatusChange: (status: boolean) => void;
}

export default function VoiceAssistant({ isActive, onStatusChange }: VoiceAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
    if (!('speechSynthesis' in window)) {
      console.warn('La síntesis de voz no es compatible con este navegador');
      return;
    }

    // Cancelar cualquier habla en curso
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configuración de voz
    utterance.rate = options?.rate || rate;
    utterance.pitch = options?.pitch || pitch;
    utterance.volume = options?.volume || volume;
    
    // Configuración de idioma
    utterance.lang = 'es-CO';

    // Encontrar voz en español si está disponible
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.includes('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    // Eventos de control
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentUtterance(utterance);
      analytics.trackEvent('voice_assistant', {
        action: 'start_speaking',
        text: text.substring(0, 50) + '...',
        timestamp: new Date().toISOString()
      });
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = (event) => {
      console.error('Error en la síntesis de voz:', event);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isActive) {
      // Saludo inicial al activar el asistente
      speak("Bienvenido al sitio web de CORVICAC. Soy su asistente de voz. Estamos en la página de inicio. Puede usar los siguientes comandos: 'Menú' para escuchar las opciones de navegación, 'Sobre nosotros' para conocer nuestra historia, 'Eventos' para ver nuestras actividades, 'Programas' para conocer nuestros proyectos, 'Apoyar' para saber cómo ayudarnos, 'Accesibilidad' para ajustar las configuraciones, o 'Detener' para silenciarme.");
    }

    return () => {
      // Limpiar al desactivar
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [isActive]);

  const handleCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();

    if (normalizedCommand.includes('menú') || normalizedCommand.includes('menu')) {
      speak("Opciones de navegación: Inicio, Nosotros, Eventos, Programas, Apoyar, Herramientas de Accesibilidad. ¿A dónde desea ir?");
    }
    else if (normalizedCommand.includes('sobre nosotros') || normalizedCommand.includes('nosotros')) {
      speak("Redirigiendo a la sección 'Nosotros'. Aquí encontrará información sobre nuestra historia, misión, visión y equipo. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/nosotros';
      }, 2000);
    }
    else if (normalizedCommand.includes('eventos')) {
      speak("Redirigiendo a la sección 'Eventos'. Aquí podrá ver todas nuestras actividades y eventos recientes. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/eventos';
      }, 2000);
    }
    else if (normalizedCommand.includes('programas') || normalizedCommand.includes('proyectos')) {
      speak("Redirigiendo a la sección 'Programas'. Aquí encontrará información sobre nuestros proyectos de educación, salud, desarrollo comunitario y más. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/programas';
      }, 2000);
    }
    else if (normalizedCommand.includes('apoyar') || normalizedCommand.includes('donar') || normalizedCommand.includes('colaborar')) {
      speak("Redirigiendo a la sección 'Apoyar'. Aquí encontrará diferentes formas de colaborar con nuestra causa: donaciones, voluntariado, patrocinios y más. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/apoyar';
      }, 2000);
    }
    else if (normalizedCommand.includes('accesibilidad') || normalizedCommand.includes('herramientas')) {
      speak("Redirigiendo a la Guía de Accesibilidad. Aquí encontrará todas las herramientas para personalizar su experiencia: tamaño de fuente, contraste, modo de lectura y más. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/accessibility-guide';
      }, 2000);
    }
    else if (normalizedCommand.includes('inicio') || normalizedCommand.includes('home')) {
      speak("Redirigiendo a la página de inicio. Un momento por favor.");
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
    else if (normalizedCommand.includes('detener') || normalizedCommand.includes('callar') || normalizedCommand.includes('silencio')) {
      stopSpeaking();
      speak("Entendido. Me he silenciado. Puede activarme nuevamente cuando lo necesite.");
    }
    else if (normalizedCommand.includes('configuración') || normalizedCommand.includes('configuracion') || normalizedCommand.includes('ajustes')) {
      speak("Puede acceder a las configuraciones de accesibilidad haciendo clic en el icono de discapacidad ♿ en la esquina inferior derecha de su pantalla. Allí encontrará opciones para ajustar el tamaño de fuente, contraste, modo de lectura y animaciones.");
    }
    else if (normalizedCommand.includes('contacto') || normalizedCommand.includes('teléfono') || normalizedCommand.includes('telefono')) {
      speak("Para contactarnos, puede encontrar nuestra información de contacto en la sección 'Nosotros' o enviar un correo electrónico a contacto@corvicac.org. También puede llamarnos al número que aparece en nuestra página de contacto.");
    }
    else if (normalizedCommand.includes('gracias') || normalizedCommand.includes('bien') || normalizedCommand.includes('ok')) {
      speak("De nada. Estoy aquí para ayudarle en lo que necesite.");
    }
    else {
      speak("No entendí su comando. Puede decir: 'Menú' para ver las opciones, 'Detener' para silenciarme, o mencionar cualquier sección como 'Nosotros', 'Eventos', 'Programas', 'Apoyar' o 'Accesibilidad'.");
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentUtterance(null);
  };

  const startListening = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      speak("Lo siento, el reconocimiento de voz no es compatible con este navegador. Le recomiendo usar Google Chrome para esta funcionalidad.");
      return;
    }

    // Uso controlado de APIs no tipadas - Solución definitiva
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-CO';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    speak("Escuchando. Por favor, diga su comando.");

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      speak(`Entendí: "${transcript}". Procesando...`);
      handleCommand(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      speak("Lo siento, no pude entender lo que dijo. Por favor, inténtelo de nuevo.");
    };

    recognition.onend = () => {
      // El reconocimiento termina automáticamente después de escuchar
    };

    recognition.start();
  };

  const getPageDescription = () => {
    const path = window.location.pathname;
    
    switch (path) {
      case '/':
        return "Está en la página de inicio de CORVICAC. Aquí puede ver nuestro resumen, últimas noticias, y acceder a todas nuestras secciones principales.";
      case '/nosotros':
        return "Está en la sección 'Nosotros'. Aquí encontrará información sobre nuestra historia, misión, visión, equipo y logros.";
      case '/eventos':
        return "Está en la sección 'Eventos'. Aquí puede ver todas nuestras actividades recientes, fotos y testimonios de participantes.";
      case '/programas':
        return "Está en la sección 'Programas'. Aquí encontrará información detallada sobre nuestros proyectos de educación, salud, desarrollo y más.";
      case '/apoyar':
        return "Está en la sección 'Apoyar'. Aquí encontrará diferentes formas de colaborar: donaciones, voluntariado, patrocinios y más.";
      case '/accessibility-guide':
        return "Está en la Guía de Accesibilidad. Aquí encontrará todas las herramientas para personalizar su experiencia de navegación.";
      default:
        return "Está navegando por el sitio web de CORVICAC. Use comandos de voz para moverse entre secciones o pedir ayuda.";
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed bottom-24 left-6 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 z-50 animate-in slide-in-from-left-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          🎙️ Asistente de Voz
          {isSpeaking && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
        </h3>
        <button
          onClick={() => onStatusChange(false)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Desactivar asistente de voz"
        >
          ✕
        </button>
      </div>

      {/* Estado actual */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <div className="text-sm text-gray-600 mb-2">Estado:</div>
        <div className={`text-sm font-medium ${isSpeaking ? 'text-green-600' : 'text-gray-600'}`}>
          {isSpeaking ? '🔊 Hablando...' : '🔇 En espera'}
        </div>
      </div>

      {/* Controles de voz */}
      <div className="space-y-3 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => speak(getPageDescription())}
            className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded hover:bg-blue-200 transition-colors text-sm"
            disabled={isSpeaking}
          >
            📖 Describir Página
          </button>
          <button
            onClick={startListening}
            className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded hover:bg-green-200 transition-colors text-sm"
            disabled={isSpeaking}
          >
            🎤 Escuchar Comando
          </button>
        </div>
        
        <button
          onClick={stopSpeaking}
          className="w-full bg-red-100 text-red-700 py-2 px-3 rounded hover:bg-red-200 transition-colors text-sm"
          disabled={!isSpeaking}
        >
          ⏹️ Detener Habla
        </button>
      </div>

      {/* Controles de audio */}
      <div className="space-y-2 mb-4">
        <div className="text-xs text-gray-500">Volumen</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full"
          aria-label="Control de volumen"
          title="Control de volumen"
        />
        <div className="text-xs text-gray-500">Velocidad</div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full"
          aria-label="Control de velocidad"
          title="Control de velocidad"
        />
        <div className="text-xs text-gray-500">Tono</div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
          className="w-full"
          aria-label="Control de tono"
          title="Control de tono"
        />
      </div>

      {/* Comandos rápidos */}
      <div className="border-t border-gray-200 pt-3">
        <div className="text-xs text-gray-500 mb-2">Comandos rápidos:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button onClick={() => handleCommand('menú')} className="text-left hover:text-blue-600">Menú</button>
          <button onClick={() => handleCommand('nosotros')} className="text-left hover:text-blue-600">Nosotros</button>
          <button onClick={() => handleCommand('eventos')} className="text-left hover:text-blue-600">Eventos</button>
          <button onClick={() => handleCommand('programas')} className="text-left hover:text-blue-600">Programas</button>
          <button onClick={() => handleCommand('apoyar')} className="text-left hover:text-blue-600">Apoyar</button>
          <button onClick={() => handleCommand('accesibilidad')} className="text-left hover:text-blue-600">Accesibilidad</button>
        </div>
      </div>

      {/* Información de soporte */}
      <div className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500">✓</span>
          <span>Voz en español</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-500">✓</span>
          <span>Reconocimiento de voz</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-500">✓</span>
          <span>Comandos personalizados</span>
        </div>
      </div>
    </div>
  );
}