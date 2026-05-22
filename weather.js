// Weather and Environmental Data
const WeatherSystem = {
    getOptimalConditions(location) {
        const conditions = {
            jakarta: {
                bestMonth: 'Juni-Juli',
                temperature: '25-28°C',
                humidity: '70-80%',
                windSpeed: '5-15 km/h'
            },
            bandung: {
                bestMonth: 'Mei-Oktober',
                temperature: '20-23°C',
                humidity: '65-75%',
                windSpeed: '3-10 km/h'
            },
            surabaya: {
                bestMonth: 'April-Oktober',
                temperature: '26-29°C',
                humidity: '75-85%',
                windSpeed: '8-18 km/h'
            },
            medan: {
                bestMonth: 'Juni-Agustus',
                temperature: '24-26°C',
                humidity: '80-90%',
                windSpeed: '4-12 km/h'
            }
        };
        return conditions[location] || conditions.jakarta;
    },

    getMoonPhaseImpact(date) {
        const impacts = {
            newMoon: '+20% aktivitas ikan',
            waxingCrescent: '+10% aktivitas ikan',
            firstQuarter: '+15% aktivitas ikan',
            waxingGibbous: '+25% aktivitas ikan',
            fullMoon: '+40% aktivitas ikan',
            waningGibbous: '+30% aktivitas ikan',
            lastQuarter: '+20% aktivitas ikan',
            waningCrescent: '+15% aktivitas ikan'
        };
        return impacts;
    }
};