module.exports = {
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo/logo.png' }]
    ],
    themeConfig: {
        logo: '/assets/img/logo/logo.png',
        sidebar: {
            '/python/advance/': [
                '',
                'one',
                'two'
            ],
            '/python/standard/': [
                '',
                'tt',
                'mm'
            ],
        },
        nav: [
            { text: '主页', link: '/' },
            {
                text: 'Python',
                items: [
                    { text: '进阶', link: '/python/advance/' },
                    { text: '标准库', link: '/python/standard/' },
                    { text: '各种工具', link: '/python/utils/' },
                ]
            },
            { text: "Java", link: '/java/' },
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