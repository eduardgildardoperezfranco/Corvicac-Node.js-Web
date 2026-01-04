// Sistema de Países para CORVICAC - Investigación Profunda
// Países clasificados por potencial de patrocinio, acuerdos fiscales y vocación solidaria

export interface CountryInfo {
    code: string;
    name: string;
    englishName: string;
    flag: string;
    continent: 'Americas' | 'Europe' | 'Asia' | 'Africa' | 'Oceania';
    currency: string;
    taxDeduction: string;
    certificationType: string;
    legalFramework: string;
    processingTime: string;
    gdpPerCapita: number; // PIB per cápita en USD (últimos datos disponibles)
    hdi: number; // Índice de Desarrollo Humano (0.0 - 1.0)
    philanthropyIndex: number; // Índice de filantropía (1-10)
    spanishSpeaker: boolean; // Si tiene hablantes de español significativos
    strategic: boolean; // País estratégico para CORVICAC
    partnerships: string[]; // Alianzas potenciales
    备注: string; // Comentarios especiales
}

// Clasificación de países por bloques estratégicos
export const COUNTRIES_BY_STRATEGY: Record<string, CountryInfo[]> = {
    // Países de habla hispana (comunicación directa)
    spanishSpeaking: [
        {
            code: 'ES',
            name: 'España',
            englishName: 'Spain',
            flag: '🇪🇸',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: '20-35% dependiendo de la cuantía',
            certificationType: 'Entidad Benéfica Reconocida',
            legalFramework: 'Agencia Tributaria Española, Convenio de Doble Tributación',
            processingTime: '48-72 horas',
            gdpPerCapita: 32000,
            hdi: 0.904,
            philanthropyIndex: 7,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Fundación "la Caixa"', 'Fundación BBVA', 'Cáritas Española'],
            备注: 'Puente natural hacia Latinoamérica, fuerte tradición filantrópica'
        },
        {
            code: 'MX',
            name: 'México',
            englishName: 'Mexico',
            flag: '🇲🇽',
            continent: 'Americas',
            currency: 'MXN',
            taxDeduction: '100% deducible de impuestos',
            certificationType: 'Donataria Autorizada',
            legalFramework: 'SAT Reglamento Donatarias, Ley ISR',
            processingTime: '24-48 horas',
            gdpPerCapita: 10500,
            hdi: 0.779,
            philanthropyIndex: 8,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Fundación Carlos Slim', 'Fundación Telmex', 'Banamex'],
            备注: 'Economía grande, tradición solidaria fuerte, conexión cultural directa'
        },
        {
            code: 'AR',
            name: 'Argentina',
            englishName: 'Argentina',
            flag: '🇦🇷',
            continent: 'Americas',
            currency: 'ARS',
            taxDeduction: 'Hasta 40% del impuesto a las ganancias',
            certificationType: 'Entidad de Bien Público',
            legalFramework: 'AFIP, Régimen de Entidades de Bien Público',
            processingTime: '5-10 días hábiles',
            gdpPerCapita: 10000,
            hdi: 0.842,
            philanthropyIndex: 6,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Fundación Arcor', 'Fundación Pérez Companc', 'Banco Galicia'],
            备注: 'Alto nivel educativo, fuerte clase media, potencial en sectores empresariales'
        },
        {
            code: 'VE',
            name: 'Venezuela',
            englishName: 'Venezuela',
            flag: '🇻🇪',
            continent: 'Americas',
            currency: 'VES',
            taxDeduction: 'Hasta 10% del impuesto sobre la renta',
            certificationType: 'Organización No Gubernamental',
            legalFramework: 'Ley de Asociaciones sin Fines de Lucro',
            processingTime: '10-15 días hábiles',
            gdpPerCapita: 3000,
            hdi: 0.705,
            philanthropyIndex: 5,
            spanishSpeaker: true,
            strategic: false,
            partnerships: ['Fundación Bengoa', 'Fundación Juan Felipe Gómez Escobar'],
            备注: 'Situación compleja, pero diáspora venezolana en el exterior es potencial'
        },
        {
            code: 'CO',
            name: 'Colombia',
            englishName: 'Colombia',
            flag: '🇨🇴',
            continent: 'Americas',
            currency: 'COP',
            taxDeduction: '100% deducible + 10% adicional deducible',
            certificationType: 'Entidad Sin Ánimo de Lucro - ESE',
            legalFramework: 'Ley 1819 de 2016, Artículo 135 del Estatuto Tributario',
            processingTime: '24 horas',
            gdpPerCapita: 6800,
            hdi: 0.767,
            philanthropyIndex: 7,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Bancolombia', 'Grupo Éxito', 'Fundación Santa Fe'],
            备注: 'País base, conocimiento del contexto, credibilidad institucional'
        },
        {
            code: 'PE',
            name: 'Perú',
            englishName: 'Peru',
            flag: '🇵🇪',
            continent: 'Americas',
            currency: 'PEN',
            taxDeduction: 'Hasta 50% del impuesto a la renta',
            certificationType: 'Donante Calificado',
            legalFramework: 'Sunat, Régimen de Donaciones',
            processingTime: '3-5 días hábiles',
            gdpPerCapita: 7200,
            hdi: 0.761,
            philanthropyIndex: 6,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Fundación BBVA Perú', 'Telefónica Fundación', 'Intercorp'],
            备注: 'Economía en crecimiento, sectores mineros con alta rentabilidad'
        },
        {
            code: 'CL',
            name: 'Chile',
            englishName: 'Chile',
            flag: '🇨🇱',
            continent: 'Americas',
            currency: 'CLP',
            taxDeduction: 'Hasta 35% del impuesto anual',
            certificationType: 'Corporación de Bien Público',
            legalFramework: 'Ley 19.148, Donaciones a Entidades de Beneficencia',
            processingTime: '5-7 días hábiles',
            gdpPerCapita: 15000,
            hdi: 0.855,
            philanthropyIndex: 7,
            spanishSpeaker: true,
            strategic: true,
            partnerships: ['Fundación Chile', 'CMPC Fundación', 'Quiñenco'],
            备注: 'Economía más estable de Latinoamérica, altos índices de desarrollo'
        },
        {
            code: 'EC',
            name: 'Ecuador',
            englishName: 'Ecuador',
            flag: '🇪🇨',
            continent: 'Americas',
            currency: 'USD',
            taxDeduction: 'Hasta 50% del impuesto a la renta',
            certificationType: 'Organización de la Sociedad Civil',
            legalFramework: 'Ley de Organizaciones de la Sociedad Civil',
            processingTime: '7-10 días hábiles',
            gdpPerCapita: 6200,
            hdi: 0.748,
            philanthropyIndex: 6,
            spanishSpeaker: true,
            strategic: false,
            partnerships: ['Fundación Banco del Pacífico', 'Fundación León'],
            备注: 'Potencial limitado por situación económica, pero con sectores empresariales fuertes'
        },
        {
            code: 'GT',
            name: 'Guatemala',
            englishName: 'Guatemala',
            flag: '🇬🇹',
            continent: 'Americas',
            currency: 'GTQ',
            taxDeduction: 'Hasta 30% del impuesto sobre utilidades',
            certificationType: 'Asociación Civil sin Fines de Lucro',
            legalFramework: 'Código de Comercio, Asociaciones sin Fines de Lucro',
            processingTime: '10-15 días hábiles',
            gdpPerCapita: 5000,
            hdi: 0.676,
            philanthropyIndex: 5,
            spanishSpeaker: true,
            strategic: false,
            partnerships: ['Fundación Paiz', 'Cámara de Industria'],
            备注: 'Pequeña economía, pero con élites empresariales tradicionales'
        },
        {
            code: 'CU',
            name: 'Cuba',
            englishName: 'Cuba',
            flag: '🇨🇺',
            continent: 'Americas',
            currency: 'CUP',
            taxDeduction: 'No aplica - sistema económico diferente',
            certificationType: 'No disponible',
            legalFramework: 'No disponible',
            processingTime: 'No disponible',
            gdpPerCapita: 9000,
            hdi: 0.783,
            philanthropyIndex: 3,
            spanishSpeaker: true,
            strategic: false,
            partnerships: [],
            备注: 'Sistema económico diferente, no apto para estrategia fiscal actual'
        }
    ],

    // Países nórdicos (alta filantropía, excelentes condiciones fiscales)
    nordicPhilanthropic: [
        {
            code: 'SE',
            name: 'Suecia',
            englishName: 'Sweden',
            flag: '🇸🇪',
            continent: 'Europe',
            currency: 'SEK',
            taxDeduction: 'Hasta 75% para donaciones mayores a 1,000 SEK',
            certificationType: 'Allmännyttig organisation',
            legalFramework: 'Skatteverket, Regler för gavodragningsrätt',
            processingTime: '3-5 días',
            gdpPerCapita: 53000,
            hdi: 0.945,
            philanthropyIndex: 9,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['IKEA Foundation', 'H&M Foundation', 'Assar Gabrielsson Foundation'],
            备注: 'Alta cultura filantrópica, fondos nórdicos muy activos en Latinoamérica'
        },
        {
            code: 'NO',
            name: 'Noruega',
            englishName: 'Norway',
            flag: '🇳🇴',
            continent: 'Europe',
            currency: 'NOK',
            taxDeduction: 'Hasta 75% con mínimo de 500 NOK',
            certificationType: 'Gaveberettiget formål',
            legalFramework: 'Skatteetaten, Gavefradrag',
            processingTime: '3-5 días',
            gdpPerCapita: 75000,
            hdi: 0.961,
            philanthropyIndex: 9,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Norwegian Refugee Council', 'Fridtjof Nansen Institute'],
            备注: 'País con mayor HDI, fondos petroleros con fuerte vocación social'
        },
        {
            code: 'DK',
            name: 'Dinamarca',
            englishName: 'Denmark',
            flag: '🇩🇰',
            continent: 'Europe',
            currency: 'DKK',
            taxDeduction: 'Hasta 56% para donaciones significativas',
            certificationType: 'Almennyttige formål',
            legalFramework: 'SKAT, Gavefradrag til almennyttige formål',
            processingTime: '3-5 días',
            gdpPerCapita: 63000,
            hdi: 0.94,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Novo Nordisk Foundation', 'Carlsberg Foundation', 'A.P. Møller Foundation'],
            备注: 'Fundaciones familiares con enorme patrimonio, fuerte tradición social'
        },
        {
            code: 'FI',
            name: 'Finlandia',
            englishName: 'Finland',
            flag: '🇫🇮',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: 'Hasta 80% para donaciones superiores a 1,250 EUR',
            certificationType: 'Yleishyödyllinen yhdistys',
            legalFramework: 'Verohallinto, Lahjoitusten verovähennys',
            processingTime: '3-5 días',
            gdpPerCapita: 51000,
            hdi: 0.938,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Kone Foundation', 'Jane and Aatos Erkko Foundation', 'Helenius Foundation'],
            备注: 'Tecnología y fortunas industriales con fuerte vocación social'
        },
        {
            code: 'IS',
            name: 'Islandia',
            englishName: 'Iceland',
            flag: '🇮🇸',
            continent: 'Europe',
            currency: 'ISK',
            taxDeduction: 'Hasta 75% con deducción directa en declaración',
            certificationType: 'Almennur innkaupamaður',
            legalFramework: 'Skatturinn, Gjöld við aflögun',
            processingTime: '2-3 días',
            gdpPerCapita: 56000,
            hdi: 0.959,
            philanthropyIndex: 7,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Eimskipafélag Íslands', 'Icelandic Arctic Cooperation Network'],
            备注: 'Pequeña población pero altísimo nivel de vida y desarrollo'
        }
    ],

    // Países europeos con fuertes acuerdos con Colombia
    europeanPartners: [
        {
            code: 'DE',
            name: 'Alemania',
            englishName: 'Germany',
            flag: '🇩🇪',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: 'Hasta 20% del ingreso imponible + 100% adicional',
            certificationType: 'Anerkannte Gemeinnützigkeit',
            legalFramework: 'Finanzamt reconocimiento, Doble Tributación Alemania-Colombia',
            processingTime: '5-7 días hábiles',
            gdpPerCapita: 48000,
            hdi: 0.947,
            philanthropyIndex: 7,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Konrad Adenauer Foundation', 'Robert Bosch Stiftung', 'Carl Zeiss Foundation'],
            备注: 'Fuertes acuerdos con Colombia, fondos de partidos políticos con alcance internacional'
        },
        {
            code: 'FR',
            name: 'Francia',
            englishName: 'France',
            flag: '🇫🇷',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: '75% para donaciones a ONG, 60% para fundaciones',
            certificationType: 'Organisme d\'intérêt général',
            legalFramework: 'Service des Impôts, Réduction d\'impôt pour dons',
            processingTime: '3-5 días',
            gdpPerCapita: 40000,
            hdi: 0.901,
            philanthropyIndex: 6,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Fondation Caritas', 'Fondation de France', 'Fondation Louis Dreyfus'],
            备注: 'Fuerte tradición laica de solidaridad, acuerdos bilaterales con Colombia'
        },
        {
            code: 'IT',
            name: 'Italia',
            englishName: 'Italy',
            flag: '🇮🇹',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: 'Hasta 35% dependiendo del tipo de donación',
            certificationType: 'Ente del Terzo Settore',
            legalFramework: 'Agenzia delle Entrate, Detrazioni per donazioni',
            processingTime: '5-10 días',
            gdpPerCapita: 35000,
            hdi: 0.892,
            philanthropyIndex: 5,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Fondazione Cariplo', 'Fondazione Compagnia di San Paolo', 'Fondazione Cassa di Risparmio'],
            备注: 'Fundaciones bancarias con enorme patrimonio, diáspora italiana en Colombia'
        },
        {
            code: 'NL',
            name: 'Países Bajos',
            englishName: 'Netherlands',
            flag: '🇳🇱',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: 'Hasta 1,285 EUR + 40% sobre exceso',
            certificationType: 'Algemeen nut beogende instelling (ANBI)',
            legalFramework: 'Belastingdienst, ANBI-regeling',
            processingTime: '2-5 días',
            gdpPerCapita: 55000,
            hdi: 0.944,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Hivos', 'Netherlands Red Cross', 'Doen Foundation'],
            备注: 'Puerto de entrada a Europa, fondos europeos, fuerte tradición humanitaria'
        },
        {
            code: 'BE',
            name: 'Bélgica',
            englishName: 'Belgium',
            flag: '🇧🇪',
            continent: 'Europe',
            currency: 'EUR',
            taxDeduction: 'Hasta 45% para personas, 60% para empresas',
            certificationType: 'Organisme d\'utilité publique',
            legalFramework: 'SPF Finances, Déductions fiscales pour donations',
            processingTime: '5-7 días',
            gdpPerCapita: 49000,
            hdi: 0.931,
            philanthropyIndex: 7,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['King Baudouin Foundation', 'Fondation de France (sección belga)'],
            备注: 'Sede de UE, puerta a Europa, fundaciones con alcance internacional'
        },
        {
            code: 'CH',
            name: 'Suiza',
            englishName: 'Switzerland',
            flag: '🇨🇭',
            continent: 'Europe',
            currency: 'CHF',
            taxDeduction: 'Hasta 70% dependiendo del cantón',
            certificationType: 'Gemeinnützige Organisation',
            legalFramework: 'Eidgenössische Steuerverwaltung, Spendenabzug',
            processingTime: '3-7 días',
            gdpPerCapita: 85000,
            hdi: 0.962,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Novartis Foundation', 'Roche', 'Zurich Insurance Foundation'],
            备注: 'Mayor PIB per cápita del mundo, fundaciones con enorme patrimonio'
        }
    ],

    // Países anglosajones (mercados tradicionales de filantropía)
    angloSaxonMarkets: [
        {
            code: 'US',
            name: 'Estados Unidos',
            englishName: 'United States',
            flag: '🇺🇸',
            continent: 'Americas',
            currency: 'USD',
            taxDeduction: 'Hasta 60% del ingreso bruto ajustado',
            certificationType: '501(c)(3) Equivalent',
            legalFramework: 'IRS Sección 170, Tratado de Impuestos Colombia-EE.UU.',
            processingTime: '24-48 horas',
            gdpPerCapita: 65000,
            hdi: 0.926,
            philanthropyIndex: 9,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Bill & Melinda Gates Foundation', 'Ford Foundation', 'Rockefeller Foundation'],
            备注: 'Mayor mercado filantrópico del mundo, millones de hispanohablantes'
        },
        {
            code: 'CA',
            name: 'Canadá',
            englishName: 'Canada',
            flag: '🇨🇦',
            continent: 'Americas',
            currency: 'CAD',
            taxDeduction: 'Hasta 75% con límite progresivo',
            certificationType: 'Registered Charity Status',
            legalFramework: 'CRA Sección 118.1, Convenio de Doble Tributación',
            processingTime: '48-72 horas',
            gdpPerCapita: 47000,
            hdi: 0.932,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Pierre Elliott Trudeau Foundation', 'Candidation'],
            备注: 'Relaciones bilaterales fuertes con Colombia, políticas de inclusión'
        },
        {
            code: 'GB',
            name: 'Reino Unido',
            englishName: 'United Kingdom',
            flag: '🇬🇧',
            continent: 'Europe',
            currency: 'GBP',
            taxDeduction: 'Gift Aid - 25% adicional en impuestos',
            certificationType: 'Charitable Status Recognition',
            legalFramework: 'HMRC Gift Aid, Convenio Antidoble Imposición',
            processingTime: '24-48 horas',
            gdpPerCapita: 40000,
            hdi: 0.922,
            philanthropyIndex: 7,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Wellcome Trust', 'Leverhulme Trust', 'Esmée Fairbairn Foundation'],
            备注: 'Centro financiero global, fundaciones seculares con gran patrimonio'
        },
        {
            code: 'AU',
            name: 'Australia',
            englishName: 'Australia',
            flag: '🇦🇺',
            continent: 'Oceania',
            currency: 'AUD',
            taxDeduction: '100% deducible para entidades registradas',
            certificationType: 'Deductible Gift Recipient (DGR)',
            legalFramework: 'Australian Taxation Office, Gift Deductions',
            processingTime: '5-10 días',
            gdpPerCapita: 55000,
            hdi: 0.951,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['The Myer Foundation', 'Paul Ramsay Foundation', 'Rebecca Cooper Foundation'],
            备注: 'Mercado filantrópico en crecimiento, leyes favorables a la filantropía'
        },
        {
            code: 'NZ',
            name: 'Nueva Zelanda',
            englishName: 'New Zealand',
            flag: '🇳🇿',
            continent: 'Oceania',
            currency: 'NZD',
            taxDeduction: 'Hasta 33.33% para donaciones calificadas',
            certificationType: 'Donee Gift Deductor',
            legalFramework: 'Inland Revenue, Gift Deductions',
            processingTime: '5-10 días',
            gdpPerCapita: 42000,
            hdi: 0.931,
            philanthropyIndex: 8,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Michael & Suzanne Borrin Foundation', 'NEXT Foundation'],
            备注: 'Pequeña pero con altos índices de desarrollo y filantropía'
        }
    ],

    // Países asiáticos emergentes (alto potencial futuro)
    asianEmerging: [
        {
            code: 'SG',
            name: 'Singapur',
            englishName: 'Singapore',
            flag: '🇸🇬',
            continent: 'Asia',
            currency: 'SGD',
            taxDeduction: 'Hasta 250% de deducción adicional',
            certificationType: 'Institution of a Public Character (IPC)',
            legalFramework: 'Charities Act, IPC Scheme',
            processingTime: '8-12 semanas',
            gdpPerCapita: 65000,
            hdi: 0.944,
            philanthropyIndex: 6,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Temasek Foundation', 'GIC Private Limited', 'DBS Foundation'],
            备注: 'Centro financiero de Asia, riqueza creciente, leyes favorables'
        },
        {
            code: 'HK',
            name: 'Hong Kong',
            englishName: 'Hong Kong',
            flag: '🇭🇰',
            continent: 'Asia',
            currency: 'HKD',
            taxDeduction: '100% deducible para entidades calificadas',
            certificationType: 'Charitable Institution',
            legalFramework: 'Inland Revenue Ordinance, Section 88',
            processingTime: '6-8 semanas',
            gdpPerCapita: 50000,
            hdi: 0.949,
            philanthropyIndex: 5,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Li Ka Shing Foundation', 'Tencent Foundation', 'Hong Kong Jockey Club'],
            备注: 'Puente entre Oriente y Occidente, gran concentración de riqueza'
        },
        {
            code: 'JP',
            name: 'Japón',
            englishName: 'Japan',
            flag: '🇯🇵',
            continent: 'Asia',
            currency: 'JPY',
            taxDeduction: 'Hasta 40% del impuesto sobre la renta',
            certificationType: 'Public Interest Incorporated Association',
            legalFramework: 'Act on General Incorporated Associations, Tax Ordinance',
            processingTime: '3-6 meses',
            gdpPerCapita: 40000,
            hdi: 0.919,
            philanthropyIndex: 4,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Sasakawa Peace Foundation', 'Toyota Foundation', 'Nippon Foundation'],
            备注: 'Tercer economía mundial, fundaciones corporativas muy activas'
        },
        {
            code: 'KR',
            name: 'Corea del Sur',
            englishName: 'South Korea',
            flag: '🇰🇷',
            continent: 'Asia',
            currency: 'KRW',
            taxDeduction: 'Hasta 15% para personas, 10% para empresas',
            certificationType: 'Public Benefit Corporation',
            legalFramework: 'Income Tax Act, Corporate Tax Act',
            processingTime: '2-3 meses',
            gdpPerCapita: 35000,
            hdi: 0.925,
            philanthropyIndex: 3,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Samsung Foundation', 'POSCO Asia Foundation', 'Lotte Foundation'],
            备注: 'Economía tecnológica avanzada, cultura empresarial fuerte'
        },
        {
            code: 'CN',
            name: 'China',
            englishName: 'China',
            flag: '🇨🇳',
            continent: 'Asia',
            currency: 'CNY',
            taxDeduction: 'Hasta 12% del ingreso anual',
            certificationType: 'Tax-Exempt Non-Profit Organization',
            legalFramework: 'Charity Law, Enterprise Income Tax Law',
            processingTime: '6-12 meses',
            gdpPerCapita: 12000,
            hdi: 0.781,
            philanthropyIndex: 3,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['China Foundation Center', 'Tencent Foundation'],
            备注: 'Economía enorme pero regulación compleja, potencial a largo plazo'
        },
        {
            code: 'IN',
            name: 'India',
            englishName: 'India',
            flag: '🇮🇳',
            continent: 'Asia',
            currency: 'INR',
            taxDeduction: 'Hasta 50% + exención de impuestos',
            certificationType: 'Public Charitable Trust',
            legalFramework: 'Income Tax Act, Section 80G',
            processingTime: '3-6 meses',
            gdpPerCapita: 2400,
            hdi: 0.645,
            philanthropyIndex: 4,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Tata Trusts', 'Azim Premji Foundation', 'Reliance Foundation'],
            备注: 'Gran cantidad de fortunas, tradición filantrópica milenaria'
        }
    ],

    // Países con acuerdos árabes o del Medio Oriente
    middleEastern: [
        {
            code: 'AE',
            name: 'Emiratos Árabes Unidos',
            englishName: 'United Arab Emirates',
            flag: '🇦🇪',
            continent: 'Asia',
            currency: 'AED',
            taxDeduction: '100% deducible para fines benéficos',
            certificationType: 'Charitable Organization',
            legalFramework: 'Ministry of Community Development, Charities Law',
            processingTime: '4-6 semanas',
            gdpPerCapita: 45000,
            hdi: 0.888,
            philanthropyIndex: 6,
            spanishSpeaker: false,
            strategic: true,
            partnerships: ['Dubai Cares', 'Abu Dhabi Crown Prince Court', 'Zayed Foundation'],
            备注: 'Centro financiero emergente, fuerte tradición islámica de caridad'
        },
        {
            code: 'SA',
            name: 'Arabia Saudita',
            englishName: 'Saudi Arabia',
            flag: '🇸🇦',
            continent: 'Asia',
            currency: 'SAR',
            taxDeduction: 'Basado en Zakat (2.5%) y Sadaqah voluntaria',
            certificationType: 'Charitable Association',
            legalFramework: 'Ministry of Human Resources, Charitable Associations Law',
            processingTime: '6-12 semanas',
            gdpPerCapita: 23000,
            hdi: 0.868,
            philanthropyIndex: 5,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['King Khalid Foundation', 'Alwaleed Philanthropies', 'SABIC Foundation'],
            备注: 'Riqueza petrolera enorme, sistema basado en principios islámicos'
        },
        {
            code: 'QA',
            name: 'Qatar',
            englishName: 'Qatar',
            flag: '🇶🇦',
            continent: 'Asia',
            currency: 'QAR',
            taxDeduction: '100% deducible para organizaciones aprobadas',
            certificationType: 'Charitable Organization',
            legalFramework: 'Ministry of Social Development, Law No. 22',
            processingTime: '4-8 semanas',
            gdpPerCapita: 60000,
            hdi: 0.858,
            philanthropyIndex: 5,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Qatar Foundation', 'Qatar Red Crescent Society'],
            备注: 'Alto PIB per cápita, inversión en imagen internacional'
        },
        {
            code: 'IL',
            name: 'Israel',
            englishName: 'Israel',
            flag: '🇮🇱',
            continent: 'Asia',
            currency: 'ILS',
            taxDeduction: 'Hasta 44% del impuesto sobre la renta',
            certificationType: 'Amuta or Public Beneficiary Company',
            legalFramework: 'Israel Tax Authority, Income Tax Ordinance',
            processingTime: '4-6 semanas',
            gdpPerCapita: 45000,
            hdi: 0.919,
            philanthropyIndex: 6,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Yad Hanadiv', 'Maimonides Fund', 'Lev Echad'],
            备注: 'Alta innovación, filantropía judía global muy activa'
        }
    ],

    // Países africanos con potencial
    africanPotential: [
        {
            code: 'ZA',
            name: 'Sudáfrica',
            englishName: 'South Africa',
            flag: '🇿🇦',
            continent: 'Africa',
            currency: 'ZAR',
            taxDeduction: 'Hasta 10% del ingreso imponible',
            certificationType: 'Public Benefit Organisation (PBO)',
            legalFramework: 'South African Revenue Service, Income Tax Act',
            processingTime: '6-8 semanas',
            gdpPerCapita: 6500,
            hdi: 0.708,
            philanthropyIndex: 5,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Nelson Mandela Foundation', 'Oppenheimer Memorial Trust'],
            备注: 'Economía más desarrollada de África, desigualdad alta pero clase media creciente'
        },
        {
            code: 'NG',
            name: 'Nigeria',
            englishName: 'Nigeria',
            flag: '🇳🇬',
            continent: 'Africa',
            currency: 'NGN',
            taxDeduction: 'Hasta 10% del impuesto sobre la renta',
            certificationType: 'Charitable Trust',
            legalFramework: 'Corporate Affairs Commission, Tax Laws',
            processingTime: '8-12 semanas',
            gdpPerCapita: 1500,
            hdi: 0.552,
            philanthropyIndex: 4,
            spanishSpeaker: false,
            strategic: false,
            partnerships: ['Tony Elumelu Foundation', 'Oando Foundation'],
            备注: 'Población enorme, economía en crecimiento, potencial futuro'
        }
    ]
};

// Lista combinada de todos los países para los dropdowns
export const ALL_COUNTRIES: CountryInfo[] = [
    ...COUNTRIES_BY_STRATEGY.spanishSpeaking,
    ...COUNTRIES_BY_STRATEGY.nordicPhilanthropic,
    ...COUNTRIES_BY_STRATEGY.europeanPartners,
    ...COUNTRIES_BY_STRATEGY.angloSaxonMarkets,
    ...COUNTRIES_BY_STRATEGY.asianEmerging,
    ...COUNTRIES_BY_STRATEGY.middleEastern,
    ...COUNTRIES_BY_STRATEGY.africanPotential
];

// Países recomendados para mostrar en orden de prioridad
export const PRIORITY_COUNTRIES: CountryInfo[] = [
    // Países hispanohablantes (comunicación directa)
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'ES')!,
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'MX')!,
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'AR')!,
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'CO')!,
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'PE')!,
    COUNTRIES_BY_STRATEGY.spanishSpeaking.find(c => c.code === 'CL')!,

    // Países nórdicos (alta filantropía)
    COUNTRIES_BY_STRATEGY.nordicPhilanthropic.find(c => c.code === 'SE')!,
    COUNTRIES_BY_STRATEGY.nordicPhilanthropic.find(c => c.code === 'NO')!,
    COUNTRIES_BY_STRATEGY.nordicPhilanthropic.find(c => c.code === 'DK')!,
    COUNTRIES_BY_STRATEGY.nordicPhilanthropic.find(c => c.code === 'FI')!,

    // Países anglosajones tradicionales
    COUNTRIES_BY_STRATEGY.angloSaxonMarkets.find(c => c.code === 'US')!,
    COUNTRIES_BY_STRATEGY.angloSaxonMarkets.find(c => c.code === 'CA')!,
    COUNTRIES_BY_STRATEGY.angloSaxonMarkets.find(c => c.code === 'GB')!,

    // Países europeos con fuertes acuerdos
    COUNTRIES_BY_STRATEGY.europeanPartners.find(c => c.code === 'DE')!,
    COUNTRIES_BY_STRATEGY.europeanPartners.find(c => c.code === 'FR')!,
    COUNTRIES_BY_STRATEGY.europeanPartners.find(c => c.code === 'IT')!,
    COUNTRIES_BY_STRATEGY.europeanPartners.find(c => c.code === 'NL')!,
    COUNTRIES_BY_STRATEGY.europeanPartners.find(c => c.code === 'CH')!,

    // Países asiáticos emergentes
    COUNTRIES_BY_STRATEGY.asianEmerging.find(c => c.code === 'SG')!,
    COUNTRIES_BY_STRATEGY.asianEmerging.find(c => c.code === 'HK')!,
    COUNTRIES_BY_STRATEGY.asianEmerging.find(c => c.code === 'JP')!,

    // Países del Medio Oriente
    COUNTRIES_BY_STRATEGY.middleEastern.find(c => c.code === 'AE')!,
    COUNTRIES_BY_STRATEGY.middleEastern.find(c => c.code === 'SA')!
];

// Función para obtener país por código
export function getCountryByCode(code: string): CountryInfo | undefined {
    return ALL_COUNTRIES.find(c => c.code === code);
}

// Función para obtener países por continente
export function getCountriesByContinent(continent: string): CountryInfo[] {
    return ALL_COUNTRIES.filter(c => c.continent === continent);
}

// Función para obtener países por nivel de filantropía
export function getCountriesByPhilanthropy(minIndex: number): CountryInfo[] {
    return ALL_COUNTRIES.filter(c => c.philanthropyIndex >= minIndex).sort((a, b) => b.philanthropyIndex - a.philanthropyIndex);
}

// Función para obtener países estratégicos
export function getStrategicCountries(): CountryInfo[] {
    return ALL_COUNTRIES.filter(c => c.strategic).sort((a, b) => b.gdpPerCapita - a.gdpPerCapita);
}

// Resumen estadístico
export const COUNTRY_STATS = {
    totalCountries: ALL_COUNTRIES.length,
    spanishSpeaking: COUNTRIES_BY_STRATEGY.spanishSpeaking.length,
    nordic: COUNTRIES_BY_STRATEGY.nordicPhilanthropic.length,
    european: COUNTRIES_BY_STRATEGY.europeanPartners.length,
    angloSaxon: COUNTRIES_BY_STRATEGY.angloSaxonMarkets.length,
    asian: COUNTRIES_BY_STRATEGY.asianEmerging.length,
    middleEastern: COUNTRIES_BY_STRATEGY.middleEastern.length,
    african: COUNTRIES_BY_STRATEGY.africanPotential.length,

    averageGDP: Math.round(ALL_COUNTRIES.reduce((sum, c) => sum + c.gdpPerCapita, 0) / ALL_COUNTRIES.length),
    averageHDI: Number((ALL_COUNTRIES.reduce((sum, c) => sum + c.hdi, 0) / ALL_COUNTRIES.length).toFixed(3)),
    averagePhilanthropy: Number((ALL_COUNTRIES.reduce((sum, c) => sum + c.philanthropyIndex, 0) / ALL_COUNTRIES.length).toFixed(1))
};

// Exportación por defecto
export default {
    COUNTRIES_BY_STRATEGY,
    ALL_COUNTRIES,
    PRIORITY_COUNTRIES,
    getCountryByCode,
    getCountriesByContinent,
    getCountriesByPhilanthropy,
    getStrategicCountries,
    COUNTRY_STATS
};