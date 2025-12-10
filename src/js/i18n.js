// Internationalization (i18n) configuration
const i18n = {
    currentLang: 'zh',
    supportedLangs: ['zh', 'en'],
    translations: {
        zh: {
            siteTitle: 'Awesome Websites',
            subtitle: '全球宝藏网站大合集 | 发现精彩，分享快乐',
            statsHeading: '网站统计数据',
            totalWebsites: '网站总数',
            totalCategories: '分类数量',
            totalContributors: '贡献者',
            filterHeading: '筛选和搜索',
            searchPlaceholder: '搜索网站名称或描述...',
            searchLabel: '搜索网站',
            all: '全部',
            showAll: '显示全部',
            showCategory: '显示',
            websites: '个网站',
            websitesHeading: '网站列表',
            loading: '加载中...',
            noResults: '没有找到匹配的网站',
            visit: '访问',
            category: '分类',
            language: '语言',
            tags: '标签',
            recommendedBy: '由',
            recommendedAt: '推荐于',
            unknownTime: '未知时间',
            ctaTitle: '发现了有趣的网站？',
            ctaDescription: '欢迎提交PR，与大家分享你的发现！',
            submitWebsite: '提交网站',
            footerBy: 'Awesome Websites By',
            backToTop: '回到顶部',
            toggleTheme: '切换深色/浅色模式',
            switchLanguage: '切换语言',
            loadError: '加载数据失败，请刷新页面重试',
            langZh: '中',
            langEn: 'EN',
            langJa: '日',
            langKo: '韩',
            categories: {
                '设计创意': '设计创意', 'UI设计': 'UI设计', '平面设计': '平面设计', '3D设计': '3D设计',
                '动画制作': '动画制作', '图标设计': '图标设计', '字体设计': '字体设计', '配色工具': '配色工具',
                '原型设计': '原型设计', '灵感素材': '灵感素材', '开发工具': '开发工具', '代码编辑': '代码编辑',
                '代码托管': '代码托管', 'API工具': 'API工具', '数据库': '数据库', '部署运维': '部署运维',
                '测试工具': '测试工具', '包管理': '包管理', '代码质量': '代码质量', '终端工具': '终端工具',
                '学习资源': '学习资源', '编程教程': '编程教程', '在线课程': '在线课程', '技术文档': '技术文档',
                '编程练习': '编程练习', '学习平台': '学习平台', '技术博客': '技术博客', '书籍资源': '书籍资源',
                '视频教程': '视频教程', '问答社区': '问答社区', '娱乐休闲': '娱乐休闲', '在线游戏': '在线游戏',
                '音乐平台': '音乐平台', '视频平台': '视频平台', '直播平台': '直播平台', '播客电台': '播客电台',
                '漫画阅读': '漫画阅读', '小说阅读': '小说阅读', '图片社区': '图片社区', '小游戏': '小游戏',
                '实用工具': '实用工具', '文件转换': '文件转换', '文本工具': '文本工具', '计算工具': '计算工具',
                '压缩工具': '压缩工具', '二维码': '二维码', '密码管理': '密码管理', '网络工具': '网络工具',
                '时间工具': '时间工具', '单位转换': '单位转换', '天气查询': '天气查询', '地图导航': '地图导航',
                '翻译工具': '翻译工具', 'PDF工具': 'PDF工具', '截图工具': '截图工具', '数据分析': '数据分析',
                '图表制作': '图表制作', '数据挖掘': '数据挖掘', '统计分析': '统计分析', 'BI工具': 'BI工具',
                '大数据': '大数据', '数据可视化': '数据可视化', 'Excel工具': 'Excel工具', 'Web3/区块链': 'Web3/区块链',
                '加密货币': '加密货币', 'NFT市场': 'NFT市场', 'DeFi工具': 'DeFi工具', '钱包工具': '钱包工具',
                '区块链浏览器': '区块链浏览器', '交易工具': '交易工具', '挖矿工具': '挖矿工具', '人工智能': '人工智能',
                '机器学习': '机器学习', 'AI绘画': 'AI绘画', 'AI写作': 'AI写作', '语音识别': '语音识别',
                '图像识别': '图像识别', 'AI助手': 'AI助手', '大模型': '大模型', 'AI编程': 'AI编程',
                '社交媒体': '社交媒体', '即时通讯': '即时通讯', '社区论坛': '社区论坛', '博客平台': '博客平台',
                '短视频': '短视频', '知识社区': '知识社区', '兴趣社区': '兴趣社区', '职业社交': '职业社交',
                '电商平台': '电商平台', '二手交易': '二手交易', '比价工具': '比价工具', '团购平台': '团购平台',
                '海淘代购': '海淘代购', '优惠券': '优惠券', '拍卖平台': '拍卖平台', '新闻资讯': '新闻资讯',
                '科技新闻': '科技新闻', '财经资讯': '财经资讯', '娱乐八卦': '娱乐八卦', '体育新闻': '体育新闻',
                '资讯聚合': '资讯聚合', '深度报道': '深度报道', '行业资讯': '行业资讯', '图片处理': '图片处理',
                '视频处理': '视频处理', '音频处理': '音频处理', 'GIF制作': 'GIF制作', '图片压缩': '图片压缩',
                '滤镜特效': '滤镜特效', '格式转换': '格式转换', '在线办公': '在线办公', '协作工具': '协作工具',
                '文档编辑': '文档编辑', '表格工具': '表格工具', '演示文稿': '演示文稿', '笔记工具': '笔记工具',
                '白板协作': '白板协作', '会议工具': '会议工具', '日历管理': '日历管理', '邮件工具': '邮件工具',
                '云存储': '云存储', '云服务': '云服务', 'CDN服务': 'CDN服务', '域名服务': '域名服务',
                '网站建设': '网站建设', '服务器': '服务器', '云数据库': '云数据库', '云函数': '云函数',
                '在线教育': '在线教育', '语言学习': '语言学习', '技能培训': '技能培训', '考试培训': '考试培训',
                '儿童教育': '儿童教育', '艺术培训': '艺术培训', '健康管理': '健康管理', '运动健身': '运动健身',
                '医疗查询': '医疗查询', '心理测试': '心理测试', '旅游攻略': '旅游攻略', '酒店预订': '酒店预订',
                '交通出行': '交通出行', '地图服务': '地图服务', '美食推荐': '美食推荐', '金融理财': '金融理财',
                '银行服务': '银行服务', '保险服务': '保险服务', '信用卡': '信用卡', '股票基金': '股票基金',
                '生活美学': '生活美学', '手工艺': '手工艺', '美食菜谱': '美食菜谱', '家居装饰': '家居装饰',
                '宠物相关': '宠物相关', '安全工具': '安全工具', 'VPN服务': 'VPN服务', '密码安全': '密码安全',
                '杀毒软件': '杀毒软件', '环保公益': '环保公益', '慈善捐助': '慈善捐助', '二手回收': '二手回收',
                '工具导航': '工具导航', '软件下载': '软件下载', '浏览器': '浏览器', '操作系统': '操作系统',
                '硬件设备': '硬件设备', '测试服务': '测试服务', '营销推广': '营销推广', '企业管理': '企业管理',
                '低代码平台': '低代码平台', 'SaaS服务': 'SaaS服务', '开源项目': '开源项目', '远程办公': '远程办公',
                '数字营销': '数字营销', '内容创作': '内容创作', '数据科学': '数据科学', '物联网': '物联网',
                '元宇宙': '元宇宙', '绿色科技': '绿色科技'
            }
        },
        en: {
            siteTitle: 'Awesome Websites',
            subtitle: 'Global Treasure Websites Collection | Discover & Share',
            statsHeading: 'Website Statistics',
            totalWebsites: 'Total Websites',
            totalCategories: 'Categories',
            totalContributors: 'Contributors',
            filterHeading: 'Filter and Search',
            searchPlaceholder: 'Search website name or description...',
            searchLabel: 'Search websites',
            all: 'All',
            showAll: 'Show all',
            showCategory: 'Show',
            websites: 'websites',
            websitesHeading: 'Website List',
            loading: 'Loading...',
            noResults: 'No matching websites found',
            visit: 'Visit',
            category: 'Category',
            language: 'Language',
            tags: 'Tags',
            recommendedBy: 'By',
            recommendedAt: 'on',
            unknownTime: 'Unknown',
            ctaTitle: 'Found an interesting website?',
            ctaDescription: 'Submit a PR to share your discovery with everyone!',
            submitWebsite: 'Submit Website',
            footerBy: 'Awesome Websites By',
            backToTop: 'Back to top',
            toggleTheme: 'Toggle dark/light mode',
            switchLanguage: 'Switch language',
            loadError: 'Failed to load data. Please refresh the page.',
            langZh: 'CN',
            langEn: 'EN',
            langJa: 'JA',
            langKo: 'KO',
            categories: {
                '设计创意': 'Design & Creative', 'UI设计': 'UI Design', '平面设计': 'Graphic Design', '3D设计': '3D Design',
                '动画制作': 'Animation', '图标设计': 'Icon Design', '字体设计': 'Font Design', '配色工具': 'Color Tools',
                '原型设计': 'Prototyping', '灵感素材': 'Inspiration', '开发工具': 'Dev Tools', '代码编辑': 'Code Editor',
                '代码托管': 'Code Hosting', 'API工具': 'API Tools', '数据库': 'Database', '部署运维': 'Deployment',
                '测试工具': 'Testing', '包管理': 'Package Manager', '代码质量': 'Code Quality', '终端工具': 'Terminal',
                '学习资源': 'Learning', '编程教程': 'Programming Tutorial', '在线课程': 'Online Courses', '技术文档': 'Documentation',
                '编程练习': 'Coding Practice', '学习平台': 'Learning Platform', '技术博客': 'Tech Blog', '书籍资源': 'Books',
                '视频教程': 'Video Tutorial', '问答社区': 'Q&A Community', '娱乐休闲': 'Entertainment', '在线游戏': 'Online Games',
                '音乐平台': 'Music', '视频平台': 'Video', '直播平台': 'Live Streaming', '播客电台': 'Podcast',
                '漫画阅读': 'Comics', '小说阅读': 'Novels', '图片社区': 'Photo Community', '小游戏': 'Mini Games',
                '实用工具': 'Utilities', '文件转换': 'File Converter', '文本工具': 'Text Tools', '计算工具': 'Calculator',
                '压缩工具': 'Compression', '二维码': 'QR Code', '密码管理': 'Password Manager', '网络工具': 'Network Tools',
                '时间工具': 'Time Tools', '单位转换': 'Unit Converter', '天气查询': 'Weather', '地图导航': 'Maps',
                '翻译工具': 'Translation', 'PDF工具': 'PDF Tools', '截图工具': 'Screenshot', '数据分析': 'Data Analysis',
                '图表制作': 'Chart Tools', '数据挖掘': 'Data Mining', '统计分析': 'Statistics', 'BI工具': 'BI Tools',
                '大数据': 'Big Data', '数据可视化': 'Data Visualization', 'Excel工具': 'Excel Tools', 'Web3/区块链': 'Web3/Blockchain',
                '加密货币': 'Cryptocurrency', 'NFT市场': 'NFT Market', 'DeFi工具': 'DeFi', '钱包工具': 'Wallet',
                '区块链浏览器': 'Blockchain Explorer', '交易工具': 'Trading', '挖矿工具': 'Mining', '人工智能': 'AI',
                '机器学习': 'Machine Learning', 'AI绘画': 'AI Art', 'AI写作': 'AI Writing', '语音识别': 'Speech Recognition',
                '图像识别': 'Image Recognition', 'AI助手': 'AI Assistant', '大模型': 'Large Models', 'AI编程': 'AI Coding',
                '社交媒体': 'Social Media', '即时通讯': 'Messaging', '社区论坛': 'Forums', '博客平台': 'Blogging',
                '短视频': 'Short Video', '知识社区': 'Knowledge Community', '兴趣社区': 'Interest Community', '职业社交': 'Professional Network',
                '电商平台': 'E-commerce', '二手交易': 'Second-hand', '比价工具': 'Price Comparison', '团购平台': 'Group Buying',
                '海淘代购': 'Cross-border Shopping', '优惠券': 'Coupons', '拍卖平台': 'Auction', '新闻资讯': 'News',
                '科技新闻': 'Tech News', '财经资讯': 'Finance News', '娱乐八卦': 'Entertainment News', '体育新闻': 'Sports News',
                '资讯聚合': 'News Aggregator', '深度报道': 'In-depth Reporting', '行业资讯': 'Industry News', '图片处理': 'Image Processing',
                '视频处理': 'Video Processing', '音频处理': 'Audio Processing', 'GIF制作': 'GIF Maker', '图片压缩': 'Image Compression',
                '滤镜特效': 'Filters & Effects', '格式转换': 'Format Converter', '在线办公': 'Online Office', '协作工具': 'Collaboration',
                '文档编辑': 'Document Editor', '表格工具': 'Spreadsheet', '演示文稿': 'Presentation', '笔记工具': 'Note Taking',
                '白板协作': 'Whiteboard', '会议工具': 'Meeting Tools', '日历管理': 'Calendar', '邮件工具': 'Email Tools',
                '云存储': 'Cloud Storage', '云服务': 'Cloud Services', 'CDN服务': 'CDN', '域名服务': 'Domain Services',
                '网站建设': 'Website Building', '服务器': 'Servers', '云数据库': 'Cloud Database', '云函数': 'Cloud Functions',
                '在线教育': 'Online Education', '语言学习': 'Language Learning', '技能培训': 'Skills Training', '考试培训': 'Exam Prep',
                '儿童教育': 'Children Education', '艺术培训': 'Arts Training', '健康管理': 'Health Management', '运动健身': 'Fitness',
                '医疗查询': 'Medical Query', '心理测试': 'Psychology Test', '旅游攻略': 'Travel Guide', '酒店预订': 'Hotel Booking',
                '交通出行': 'Transportation', '地图服务': 'Map Services', '美食推荐': 'Food Recommendation', '金融理财': 'Finance',
                '银行服务': 'Banking', '保险服务': 'Insurance', '信用卡': 'Credit Card', '股票基金': 'Stocks & Funds',
                '生活美学': 'Life Aesthetics', '手工艺': 'Handicraft', '美食菜谱': 'Recipes', '家居装饰': 'Home Decoration',
                '宠物相关': 'Pets', '安全工具': 'Security Tools', 'VPN服务': 'VPN', '密码安全': 'Password Security',
                '杀毒软件': 'Antivirus', '环保公益': 'Environmental', '慈善捐助': 'Charity', '二手回收': 'Recycling',
                '工具导航': 'Tool Navigation', '软件下载': 'Software Download', '浏览器': 'Browser', '操作系统': 'Operating System',
                '硬件设备': 'Hardware', '测试服务': 'Testing Service', '营销推广': 'Marketing', '企业管理': 'Business Management',
                '低代码平台': 'Low-code Platform', 'SaaS服务': 'SaaS Services', '开源项目': 'Open Source', '远程办公': 'Remote Work',
                '数字营销': 'Digital Marketing', '内容创作': 'Content Creation', '数据科学': 'Data Science', '物联网': 'IoT',
                '元宇宙': 'Metaverse', '绿色科技': 'Green Tech'
            }
        }
    },
    init() {
        const path = window.location.pathname;
        if (path.includes('/en/') || path.endsWith('/en')) {
            this.currentLang = 'en';
        } else {
            const savedLang = localStorage.getItem('preferred_language');
            if (savedLang && this.supportedLangs.includes(savedLang)) {
                this.currentLang = savedLang;
            }
        }
        return this.currentLang;
    },
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                value = this.translations.zh;
                for (const k2 of keys) {
                    if (value && value[k2] !== undefined) {
                        value = value[k2];
                    } else {
                        return key;
                    }
                }
                break;
            }
        }
        return value;
    },
    getCategory(categoryName) {
        return this.translations[this.currentLang].categories[categoryName] || categoryName;
    },
    setLanguage(lang) {
        if (this.supportedLangs.includes(lang)) {
            this.currentLang = lang;
            localStorage.setItem('preferred_language', lang);
            return true;
        }
        return false;
    },
    getLanguage() {
        return this.currentLang;
    },
    isEnglish() {
        return this.currentLang === 'en';
    },
    getAlternateUrl() {
        const baseUrl = 'https://smartuil.github.io/awesome-websites';
        return this.currentLang === 'zh' ? baseUrl + '/en' : baseUrl;
    }
};
