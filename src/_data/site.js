module.exports = {
  title: 'Benedikt Gregors Website',
  description: '',
  url: 'https://benedikt.gr',
  urls: {
    github: 'https://github.com/scsskid/',
    linkedin: 'https://linkedin.com/in/scsskid/',
    twitter: 'https://twitter.com/scsskid/'
  },
  baseUrl: '/',
  author: 'Name Surname',
  authorTwitterUrl: 'https://twitter.com/scsskid',
  authorTwitterHandle: '@scsskid',
  buildTime: new Date(),
  buildTimeString: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  availability: {
    status: true,
    text: 'available from january 2020',
    date: ''
  },
  dirs: {
    icons: '/src/assets/images/icons/'
  }
}
