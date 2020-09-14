module.exports = {
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }]
      ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        sidebar: {
            '/python/': [
              '',     /* /foo/ */
              'one',  /* /foo/one.html */
              'two'   /* /foo/two.html */
            ],
        },
        nav: [
            { text: '主页', link: '/' },
            { text: 'Linux', link: '/linux/' },
            {
                text: '中间件', items: [
                    { text: 'Elasticsearch', link: '/middle/elasticsearch/' },
                    { text: 'Nginx', link: '/middle/nginx/' },
                    { text: 'Kafka', link: '/middle/kafka/' },
                ]
            },
             {
                text: '数据库', items: [
                    { text: 'MySQL', link: '/database/mysql/' },
                    { text: 'Redis', link: '/database/redis/' }
                ]
            },
            { text: "Python", link: '/python/' },
            { text: "Java", link: '/java/' },
            { text: "Git Hub", link: 'https://github.com/xuqil' },
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@img': 'assets\img'
            }
        }
    }
}