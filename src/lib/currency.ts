// Sistema de Conversión de Monedas para CORVICAC
// Conversión en tiempo real según la ubicación del usuario

import { useState, useEffect } from 'react';

export interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
    country: string;
    flag: string;
    format: {
        decimal: number;
        thousand: string;
        decimalSymbol: string;
    };
}

export interface ExchangeRate {
    currency: string;
    rate: number;
    updatedAt: string;
    source: string;
}

// Información de monedas por país
export const CURRENCIES: Record<string, CurrencyInfo> = {
    COP: {
        code: 'COP',
        name: 'Peso Colombiano',
        symbol: '$',
        country: 'Colombia',
        flag: '🇨🇴',
        format: { decimal: 0, thousand: '.', decimalSymbol: ',' }
    },
    USD: {
        code: 'USD',
        name: 'Dólar Americano',
        symbol: '$',
        country: 'Estados Unidos',
        flag: '🇺🇸',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    EUR: {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        country: 'Unión Europea',
        flag: '🇪🇺',
        format: { decimal: 2, thousand: '.', decimalSymbol: ',' }
    },
    GBP: {
        code: 'GBP',
        name: 'Libra Esterlina',
        symbol: '£',
        country: 'Reino Unido',
        flag: '🇬🇧',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    CAD: {
        code: 'CAD',
        name: 'Dólar Canadiense',
        symbol: '$',
        country: 'Canadá',
        flag: '🇨🇦',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    MXN: {
        code: 'MXN',
        name: 'Peso Mexicano',
        symbol: '$',
        country: 'México',
        flag: '🇲🇽',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    ARS: {
        code: 'ARS',
        name: 'Peso Argentino',
        symbol: '$',
        country: 'Argentina',
        flag: '🇦🇷',
        format: { decimal: 2, thousand: '.', decimalSymbol: ',' }
    },
    CLP: {
        code: 'CLP',
        name: 'Peso Chileno',
        symbol: '$',
        country: 'Chile',
        flag: '🇨🇱',
        format: { decimal: 0, thousand: '.', decimalSymbol: ',' }
    },
    PEN: {
        code: 'PEN',
        name: 'Sol Peruano',
        symbol: 'S/',
        country: 'Perú',
        flag: '🇵🇪',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    BRL: {
        code: 'BRL',
        name: 'Real Brasileño',
        symbol: 'R$',
        country: 'Brasil',
        flag: '🇧🇷',
        format: { decimal: 2, thousand: '.', decimalSymbol: ',' }
    },
    JPY: {
        code: 'JPY',
        name: 'Yen Japonés',
        symbol: '¥',
        country: 'Japón',
        flag: '🇯🇵',
        format: { decimal: 0, thousand: ',', decimalSymbol: '.' }
    },
    CNY: {
        code: 'CNY',
        name: 'Yuan Chino',
        symbol: '¥',
        country: 'China',
        flag: '🇨🇳',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    AUD: {
        code: 'AUD',
        name: 'Dólar Australiano',
        symbol: '$',
        country: 'Australia',
        flag: '🇦🇺',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    CHF: {
        code: 'CHF',
        name: 'Franco Suizo',
        symbol: 'CHF',
        country: 'Suiza',
        flag: '🇨🇭',
        format: { decimal: 2, thousand: "'", decimalSymbol: '.' }
    },
    SEK: {
        code: 'SEK',
        name: 'Corona Sueca',
        symbol: 'kr',
        country: 'Suecia',
        flag: '🇸🇪',
        format: { decimal: 2, thousand: ' ', decimalSymbol: ',' }
    },
    NOK: {
        code: 'NOK',
        name: 'Corona Noruega',
        symbol: 'kr',
        country: 'Noruega',
        flag: '🇳🇴',
        format: { decimal: 2, thousand: ' ', decimalSymbol: ',' }
    },
    DKK: {
        code: 'DKK',
        name: 'Corona Danesa',
        symbol: 'kr',
        country: 'Dinamarca',
        flag: '🇩🇰',
        format: { decimal: 2, thousand: '.', decimalSymbol: ',' }
    },
    PLN: {
        code: 'PLN',
        name: 'Złoty Polaco',
        symbol: 'zł',
        country: 'Polonia',
        flag: '🇵🇱',
        format: { decimal: 2, thousand: ' ', decimalSymbol: ',' }
    },
    CZK: {
        code: 'CZK',
        name: 'Corona Checa',
        symbol: 'Kč',
        country: 'República Checa',
        flag: '🇨🇿',
        format: { decimal: 2, thousand: ' ', decimalSymbol: ',' }
    },
    HUF: {
        code: 'HUF',
        name: 'Florín Húngaro',
        symbol: 'Ft',
        country: 'Hungría',
        flag: '🇭🇺',
        format: { decimal: 0, thousand: ' ', decimalSymbol: ',' }
    },
    RUB: {
        code: 'RUB',
        name: 'Rublo Ruso',
        symbol: '₽',
        country: 'Rusia',
        flag: '🇷🇺',
        format: { decimal: 2, thousand: ' ', decimalSymbol: ',' }
    },
    TRY: {
        code: 'TRY',
        name: 'Lira Turca',
        symbol: '₺',
        country: 'Turquía',
        flag: '🇹🇷',
        format: { decimal: 2, thousand: '.', decimalSymbol: ',' }
    },
    AED: {
        code: 'AED',
        name: 'Dirham de los Emiratos',
        symbol: 'د.إ',
        country: 'Emiratos Árabes',
        flag: '🇦🇪',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    SAR: {
        code: 'SAR',
        name: 'Riyal Saudita',
        symbol: 'ر.س',
        country: 'Arabia Saudita',
        flag: '🇸🇦',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    ILS: {
        code: 'ILS',
        name: 'Nuevo Shekel Israelí',
        symbol: '₪',
        country: 'Israel',
        flag: '🇮🇱',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    INR: {
        code: 'INR',
        name: 'Rupia India',
        symbol: '₹',
        country: 'India',
        flag: '🇮🇳',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    KRW: {
        code: 'KRW',
        name: 'Won Surcoreano',
        symbol: '₩',
        country: 'Corea del Sur',
        flag: '🇰🇷',
        format: { decimal: 0, thousand: ',', decimalSymbol: '.' }
    },
    SGD: {
        code: 'SGD',
        name: 'Dólar de Singapur',
        symbol: '$',
        country: 'Singapur',
        flag: '🇸🇬',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    HKD: {
        code: 'HKD',
        name: 'Dólar de Hong Kong',
        symbol: '$',
        country: 'Hong Kong',
        flag: '🇭🇰',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    NZD: {
        code: 'NZD',
        name: 'Dólar Neozelandés',
        symbol: '$',
        country: 'Nueva Zelanda',
        flag: '🇳🇿',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    },
    ZAR: {
        code: 'ZAR',
        name: 'Rand Sudafricano',
        symbol: 'R',
        country: 'Sudáfrica',
        flag: '🇿🇦',
        format: { decimal: 2, thousand: ',', decimalSymbol: '.' }
    }
};

// Tasas de cambio estimadas (para fallback)
export const ESTIMATED_RATES: Record<string, number> = {
    USD: 4100,
    EUR: 4400,
    GBP: 5100,
    CAD: 2950,
    MXN: 220,
    ARS: 4,
    CLP: 5,
    PEN: 1100,
    BRL: 750,
    JPY: 30,
    CNY: 570,
    AUD: 2700,
    CHF: 4500,
    SEK: 390,
    NOK: 380,
    DKK: 590,
    PLN: 950,
    CZK: 180,
    HUF: 11,
    RUB: 55,
    TRY: 250,
    AED: 1100,
    SAR: 1100,
    ILS: 1100,
    INR: 55,
    KRW: 3,
    SGD: 3000,
    HKD: 530,
    NZD: 2500,
    ZAR: 220
};

// Detección de moneda por país del usuario
export function detectUserCurrency(): CurrencyInfo {
    if (typeof window !== 'undefined') {
        try {
            // Intentar detectar por geolocalización
            const region = (navigator as any).userLanguage || navigator.language;
            const country = region.split('-')[1]?.toUpperCase();

            // Mapeo de países a monedas
            const countryToCurrency: Record<string, string> = {
                'US': 'USD', 'ES': 'EUR', 'GB': 'GBP', 'CA': 'CAD',
                'MX': 'MXN', 'AR': 'ARS', 'CL': 'CLP', 'PE': 'PEN',
                'BR': 'BRL', 'JP': 'JPY', 'CN': 'CNY', 'AU': 'AUD',
                'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK',
                'PL': 'PLN', 'CZ': 'CZK', 'HU': 'HUF', 'RU': 'RUB',
                'TR': 'TRY', 'AE': 'AED', 'SA': 'SAR', 'IL': 'ILS',
                'IN': 'INR', 'KR': 'KRW', 'SG': 'SGD', 'HK': 'HKD',
                'NZ': 'NZD', 'ZA': 'ZAR', 'CO': 'COP'
            };

            const currencyCode = countryToCurrency[country] || 'USD';
            return CURRENCIES[currencyCode] || CURRENCIES.USD;
        } catch {
            return CURRENCIES.USD;
        }
    }
    return CURRENCIES.COP; // Default para Colombia
}

// Conversión de COP a otra moneda
export function convertCurrency(amountCOP: number, targetCurrency: string, rate?: number): number {
    const exchangeRate = rate || ESTIMATED_RATES[targetCurrency] || ESTIMATED_RATES.USD;
    return amountCOP / exchangeRate;
}

// Formateo de moneda según el país
export function formatCurrencyLocalized(amount: number, currency: string): string {
    const currencyInfo = CURRENCIES[currency] || CURRENCIES.USD;
    const { decimal, thousand, decimalSymbol } = currencyInfo.format;

    // Formatear el número
    const parts = amount.toFixed(decimal).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Aplicar separador de miles
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);

    // Construir el resultado
    let result = formattedInteger;
    if (decimal > 0 && decimalPart) {
        result += decimalSymbol + decimalPart;
    }

    // Determinar posición del símbolo
    if (currency === 'EUR' || currency === 'CZK' || currency === 'HUF' || currency === 'DKK') {
        return result + ' ' + currencyInfo.symbol;
    } else {
        return currencyInfo.symbol + result;
    }
}

// Obtener tasas de cambio en tiempo real (API externa)
export async function getRealTimeRates(baseCurrency: string = 'COP'): Promise<Record<string, number>> {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        return data.rates;
    } catch {
        // Fallback a tasas estimadas
        return ESTIMATED_RATES;
    }
}

// Hook para manejar monedas en componentes React
export function useCurrency() {
    const [currency, setCurrency] = useState<CurrencyInfo>(detectUserCurrency());
    const [rates, setRates] = useState<Record<string, number>>(ESTIMATED_RATES);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Cargar tasas en tiempo real
        setLoading(true);
        getRealTimeRates('COP').then(newRates => {
            setRates(newRates);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const convertToUserCurrency = (amountCOP: number): string => {
        const rate = rates[currency.code] || ESTIMATED_RATES[currency.code] || 1;
        const convertedAmount = convertCurrency(amountCOP, currency.code, rate);
        return formatCurrencyLocalized(convertedAmount, currency.code);
    };

    const convertBetweenCurrencies = (amount: number, fromCurrency: string, toCurrency: string): number => {
        const fromRate = rates[fromCurrency] || ESTIMATED_RATES[fromCurrency] || 1;
        const toRate = rates[toCurrency] || ESTIMATED_RATES[toCurrency] || 1;

        // Convertir a COP base y luego a la moneda destino
        const amountCOP = amount * fromRate;
        return convertCurrency(amountCOP, toCurrency, toRate);
    };

    return {
        currency,
        setCurrency,
        rates,
        loading,
        convertToUserCurrency,
        convertBetweenCurrencies,
        formatCurrency: (amount: number, curr?: string) =>
            formatCurrencyLocalized(amount, curr || currency.code)
    };
}

// Exportación por defecto
export default {
    CURRENCIES,
    ESTIMATED_RATES,
    detectUserCurrency,
    convertCurrency,
    formatCurrencyLocalized,
    getRealTimeRates,
    useCurrency
};