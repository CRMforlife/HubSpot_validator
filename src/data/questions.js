export const questions = [
    {
        id: 'business_type',
        text: {
            fi: "Minkä tyyppinen yritys olette?",
            en: "What type of business are you?"
        },
        options: [
            { id: 'b2b', label: { fi: 'B2B (Yritykseltä yritykselle)', en: 'B2B (Business to Business)' }, value: 'b2b' },
            { id: 'b2c', label: { fi: 'B2C (Yritykseltä kuluttajalle)', en: 'B2C (Business to Consumer)' }, value: 'b2c' },
            { id: 'both', label: { fi: 'Molemmat', en: 'Both' }, value: 'both' },
        ]
    },
    {
        id: 'company_size',
        text: {
            fi: "Kuinka monta työntekijää teillä on?",
            en: "How many employees do you have?"
        },
        options: [
            { id: '1-10', label: { fi: '1-10', en: '1-10' }, value: 'small' },
            { id: '11-50', label: { fi: '11-50', en: '11-50' }, value: 'medium' },
            { id: '51-200', label: { fi: '51-200', en: '51-200' }, value: 'mid-market' },
            { id: '201+', label: { fi: '201+', en: '201+' }, value: 'enterprise' },
        ]
    },
    {
        id: 'primary_goal',
        text: {
            fi: "Mitkä ovat ensisijaiset tavoitteenne HubSpotin kanssa?",
            en: "What are your primary goals with HubSpot right now?"
        },
        multiSelect: true,
        options: [
            { id: 'leads', label: { fi: 'Hanki lisää liidejä', en: 'Generate more leads' }, value: 'marketing' },
            { id: 'sales', label: { fi: 'Sulje enemmän kauppoja / Myynnin automaatio', en: 'Close more deals / Sales automation' }, value: 'sales' },
            { id: 'service', label: { fi: 'Asiakastuki / Tikettien hallinta', en: 'Support customers / Ticket management' }, value: 'service' },
            { id: 'website', label: { fi: 'Rakenna tai ylläpidä verkkosivustoa', en: 'Build or host a website' }, value: 'cms' },
            { id: 'data', label: { fi: 'Synkronoi dataa & puhdista operaatioita', en: 'Sync data & clean operations' }, value: 'ops' },
        ]
    },
    {
        id: 'budget',
        text: {
            fi: "Mikä on arvioitu kuukausibudjettinne ohjelmistolle?",
            en: "What is your estimated monthly budget for software?"
        },
        options: [
            { id: 'low', label: { fi: 'Alle 50 €/kk', en: 'Less than 50 €/mo' }, value: 'starter' },
            { id: 'mid', label: { fi: '500 € - 1 500 €/kk', en: '500 € - 1 500 €/mo' }, value: 'pro' },
            { id: 'high', label: { fi: '1 500+ €/kk', en: '1 500+ €/mo' }, value: 'enterprise' },
        ]
    },
    {
        id: 'contacts',
        text: {
            fi: "Kuinka monta kontaktia (sähköpostiosoitetta) teillä on tällä hetkellä?",
            en: "How many contacts (email addresses) do you currently have?"
        },
        options: [
            { id: '0-1k', label: { fi: '0 - 1,000', en: '0 - 1,000' }, value: 'low' },
            { id: '1k-10k', label: { fi: '1,000 - 10,000', en: '1,000 - 10,000' }, value: 'mid' },
            { id: '10k+', label: { fi: '10,000+', en: '10,000+' }, value: 'high' },
        ]
    }
];
