export const calculateRecommendations = (answers, language = 'fi') => {
    const recommendations = [];
    let goals = [];
    if (Array.isArray(answers.primary_goal)) {
        goals = answers.primary_goal.map(option => option.value);
    } else if (answers.primary_goal?.value === 'all') {
        goals = ['marketing', 'sales', 'service', 'cms', 'ops'];
    } else if (answers.primary_goal?.value) {
        goals = [answers.primary_goal.value];
    }

    const size = answers.company_size?.value; // small, medium, mid-market, enterprise
    const budget = answers.budget?.value; // starter, pro, enterprise

    // Helper to determine tier based on size and budget
    const getTier = (hub) => {
        if (budget === 'starter') return 'Starter';
        if (budget === 'enterprise') return 'Enterprise';

        // Default to Pro if budget allows, but downgrade for very small teams if needed
        if (size === 'small' && budget !== 'enterprise') return 'Starter';
        if (size === 'enterprise') return 'Enterprise';

        return 'Professional';
    };

    const reasons = {
        fi: {
            marketing: 'välttämätön liidien tuottamiseen.',
            sales: 'myyntiprosessin automatisointiin ja kauppojen nopeampaan päättämiseen.',
            service: 'asiakastikettien ja tuen hallintaan.',
            cms: 'tehokkaan ja integroidun verkkosivuston rakentamiseen.',
            ops: 'datan synkronoimiseen ja tietokannan puhdistamiseen.'
        },
        en: {
            marketing: 'essential for your lead generation goals.',
            sales: 'to automate your sales process and close deals faster.',
            service: 'to manage customer tickets and support.',
            cms: 'to build a powerful, integrated website.',
            ops: 'to sync your data and clean up your database.'
        }
    };

    const featuresList = {
        fi: {
            marketing: ['Sähköpostimarkkinointi', 'Laskeutumissivut', 'Lomakeautomaatio'],
            sales: ['Kauppaputket', 'Tapaamisten varaus', 'Sähköpostiseuranta'],
            service: ['Tiketöinti', 'Asiakasportaali', 'Tietopankki'],
            cms: ['Drag-and-Drop -editori', 'SEO-suositukset', 'Teemat'],
            ops: ['Datan synkronointi', 'Ohjelmoitava automaatio', 'Datan laadun automaatio']
        },
        en: {
            marketing: ['Email Marketing', 'Landing Pages', 'Form Automation'],
            sales: ['Deal Pipelines', 'Meeting Scheduling', 'Email Tracking'],
            service: ['Ticketing', 'Customer Portal', 'Knowledge Base'],
            cms: ['Drag-and-Drop Editor', 'SEO Recommendations', 'Themes'],
            ops: ['Data Sync', 'Programmable Automation', 'Data Quality Automation']
        }
    };

    // Marketing Hub
    if (goals.includes('marketing') || goals.includes('all')) {
        recommendations.push({
            hub: 'Marketing Hub',
            tier: getTier('marketing'),
            reason: reasons[language].marketing,
            features: featuresList[language].marketing,
            url: 'https://www.hubspot.com/pricing/marketing'
        });
    }

    // Sales Hub
    if (goals.includes('sales') || goals.includes('all')) {
        recommendations.push({
            hub: 'Sales Hub',
            tier: getTier('sales'),
            reason: reasons[language].sales,
            features: featuresList[language].sales,
            url: 'https://www.hubspot.com/pricing/sales'
        });
    }

    // Service Hub
    if (goals.includes('service') || goals.includes('all')) {
        recommendations.push({
            hub: 'Service Hub',
            tier: getTier('service'),
            reason: reasons[language].service,
            features: featuresList[language].service,
            url: 'https://www.hubspot.com/pricing/service'
        });
    }

    // CMS Hub
    if (goals.includes('cms')) {
        recommendations.push({
            hub: 'CMS Hub',
            tier: getTier('cms'),
            reason: reasons[language].cms,
            features: featuresList[language].cms,
            url: 'https://www.hubspot.com/pricing/cms'
        });
    }

    // Operations Hub
    if (goals.includes('ops')) {
        recommendations.push({
            hub: 'Operations Hub',
            tier: getTier('ops'),
            reason: reasons[language].ops,
            features: featuresList[language].ops,
            url: 'https://www.hubspot.com/pricing/operations'
        });
    }

    return recommendations;
};
