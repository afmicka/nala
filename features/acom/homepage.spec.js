module.exports = {
  FeatureName: 'Acom Home Page',
  features: [
    {
      tcid: '0',
      name: '@Acom-Homepage-Jarvis',
      path: '',
      browserParams: '?mboxDisable=1&adobe_authoring_enabled=true',
      tags: '@homepage @smoke @regression',
    },
    {
      tcid: '1',
      name: '@Acom-Smoke',
      path: '/homepage/index-loggedout',
      browserParams: '?mboxDisable=1&adobe_authoring_enabled=true',
      tags: '@homepage @smoke @regression',
    },    
    {
      tcid: '2',
      name: '@Acom-TWP-Modal',
      path: '/homepage/index-loggedout',
      browserParams: '#mini-plans-web-cta-creative-cloud-card',
      tags: '@homepage @smoke @regression',
    },        
  ],
};
