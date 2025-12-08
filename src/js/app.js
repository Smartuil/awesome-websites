// Main application logic
class AwesomeWebsites {
    constructor() {
        this.websites = [];
        this.filteredWebsites = [];
        this.categories = [];
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.renderWebsites();
            this.updateStats();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('加载数据失败，请刷新页面重试');
        }
    }

    shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring swap
        }
        return array;
    }

    async loadData() {
        try {
            // Load websites data
            const websitesResponse = await fetch('./data/websites.json');
            if (!websitesResponse.ok) {
                throw new Error('Failed to load websites data');
            }
            this.websites = await websitesResponse.json();
            
            // Randomize the order of websites
            this.shuffleArray(this.websites);
            
            this.filteredWebsites = [...this.websites];

            // Generate categories automatically from websites
            this.generateCategories();

        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    generateCategories() {
        // Extract unique categories from websites
        const categoryMap = new Map();
        
        this.websites.forEach(website => {
            if (!categoryMap.has(website.category)) {
                // Define category icons and descriptions
                const categoryInfo = this.getCategoryInfo(website.category);
                categoryMap.set(website.category, {
                    id: this.generateCategoryId(website.category),
                    name: website.category,
                    icon: categoryInfo.icon,
                    description: categoryInfo.description
                });
            }
        });

        this.categories = Array.from(categoryMap.values());
        this.updateFilterButtons();
    }

    formatDate(dateString) {
        if (!dateString) return '未知时间';
        
        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            
        } catch (error) {
            return dateString; // 如果格式化失败，返回原始字符串
        }
    }

    getLanguageDisplay(language) {
        const languageMap = {
            'zh': { text: '中', class: 'language-zh' },
            'cn': { text: '中', class: 'language-zh' },
            'en': { text: 'EN', class: 'language-en' },
            'ja': { text: '日', class: 'language-ja' },
            'jp': { text: '日', class: 'language-ja' },
            'ko': { text: '韩', class: 'language-ko' },
            'kr': { text: '韩', class: 'language-ko' },
            'es': { text: 'ES', class: 'language-es' },
            'fr': { text: 'FR', class: 'language-fr' },
            'de': { text: 'DE', class: 'language-de' },
            'ru': { text: 'RU', class: 'language-ru' },
            'ar': { text: 'AR', class: 'language-ar' },
            'pt': { text: 'PT', class: 'language-pt' },
            'it': { text: 'IT', class: 'language-it' }
        };
        
        return languageMap[language] || { text: '🌐', class: 'language-default' };
    }

    getCategoryInfo(categoryName) {
        const categoryMap = {
            // 🎨 设计创意类
            '设计创意': { icon: '🎨', description: 'UI/UX设计、创意作品、设计灵感' },
            'UI设计': { icon: '🎨', description: '用户界面设计、UI工具、设计资源' },
            '平面设计': { icon: '🖌️', description: '平面设计、插画、logo设计' },
            '3D设计': { icon: '🎭', description: '3D建模、渲染、动画设计' },
            '动画制作': { icon: '🎞️', description: '动画制作、动效设计、GIF工具' },
            '图标设计': { icon: '🔶', description: '图标设计、图标库、矢量图标' },
            '字体设计': { icon: '✒️', description: '字体设计、字体工具、字库' },
            '配色工具': { icon: '🎨', description: '配色方案、色彩工具、调色板' },
            '原型设计': { icon: '📐', description: '原型设计、线框图、交互原型' },
            '灵感素材': { icon: '💡', description: '设计灵感、创意素材、作品集' },
            
            // 🛠️ 开发工具类
            '开发工具': { icon: '🛠️', description: '编程工具、在线IDE、开发者工具' },
            '代码编辑': { icon: '💻', description: '代码编辑器、在线编辑器、代码工具' },
            '代码托管': { icon: '📦', description: '代码托管、版本控制、Git服务' },
            'API工具': { icon: '🔌', description: 'API测试、API文档、接口工具' },
            '数据库': { icon: '🗄️', description: '数据库工具、SQL工具、数据管理' },
            '部署运维': { icon: '🚀', description: '部署工具、CI/CD、运维工具' },
            '测试工具': { icon: '🔍', description: '测试工具、自动化测试、调试工具' },
            '包管理': { icon: '📦', description: '包管理工具、依赖管理、npm工具' },
            '代码质量': { icon: '✅', description: '代码检查、格式化、代码规范' },
            '终端工具': { icon: '⌨️', description: '终端、命令行工具、Shell工具' },
            
            // 📚 学习资源类
            '学习资源': { icon: '📚', description: '教程、文档、在线课程、学习资料' },
            '编程教程': { icon: '👨‍💻', description: '编程教程、编程学习、代码教学' },
            '在线课程': { icon: '🎓', description: '在线课程、MOOC、学习平台' },
            '技术文档': { icon: '📖', description: '技术文档、API文档、开发文档' },
            '编程练习': { icon: '💪', description: '编程练习、算法题、编程挑战' },
            '学习平台': { icon: '🏫', description: '在线学习、教育平台、知识分享' },
            '技术博客': { icon: '📝', description: '技术博客、开发经验、技术分享' },
            '书籍资源': { icon: '📕', description: '技术书籍、电子书、编程书籍' },
            '视频教程': { icon: '🎥', description: '视频教程、编程视频、学习视频' },
            '问答社区': { icon: '💬', description: '技术问答、编程问答、开发者社区' },
            
            // 🎮 娱乐休闲类
            '娱乐休闲': { icon: '🎮', description: '游戏、音乐、视频、娱乐网站' },
            '在线游戏': { icon: '🕹️', description: '在线游戏、网页游戏、休闲游戏' },
            '音乐平台': { icon: '🎵', description: '音乐播放、音乐发现、音乐工具' },
            '视频平台': { icon: '🎬', description: '视频网站、视频平台、视频工具' },
            '直播平台': { icon: '📺', description: '直播平台、视频直播、游戏直播' },
            '播客电台': { icon: '🎙️', description: '播客、电台、音频内容' },
            '漫画阅读': { icon: '📚', description: '在线漫画、漫画阅读器、漫画网站' },
            '小说阅读': { icon: '📖', description: '在线小说、电子书、阅读平台' },
            '图片社区': { icon: '📷', description: '图片分享、摄影社区、图片网站' },
            '小游戏': { icon: '🎯', description: '休闲小游戏、益智游戏、网页游戏' },
            
            // 🔧 实用工具类
            '实用工具': { icon: '🔧', description: '生产力工具、在线工具、实用网站' },
            '文件转换': { icon: '🔄', description: '文件转换、格式转换、文档转换' },
            '文本工具': { icon: '📄', description: '文本处理、文本工具、文字工具' },
            '计算工具': { icon: '🧮', description: '在线计算器、数学工具、统计工具' },
            '压缩工具': { icon: '📦', description: '文件压缩、解压工具、压缩软件' },
            '二维码': { icon: '📱', description: '二维码生成、二维码扫描、条形码' },
            '密码管理': { icon: '🔐', description: '密码生成、密码管理、安全工具' },
            '网络工具': { icon: '🌐', description: '网络工具、IP查询、网络检测' },
            '时间工具': { icon: '⏰', description: '时钟、计时器、闹钟、时间工具' },
            '单位转换': { icon: '⚖️', description: '单位转换、度量衡、换算工具' },
            '天气查询': { icon: '🌤️', description: '天气预报、天气查询、气象工具' },
            '地图导航': { icon: '🗺️', description: '地图服务、导航工具、位置服务' },
            '翻译工具': { icon: '🌍', description: '在线翻译、语言翻译、翻译工具' },
            'PDF工具': { icon: '📄', description: 'PDF编辑、PDF转换、PDF工具' },
            '截图工具': { icon: '📸', description: '截图工具、屏幕录制、图像捕捉' },
            
            // 📊 数据分析类
            '数据分析': { icon: '📊', description: '数据可视化、统计工具、数据分析' },
            '图表制作': { icon: '📈', description: '图表工具、数据可视化、图形制作' },
            '数据挖掘': { icon: '⛏️', description: '数据挖掘、数据科学、机器学习' },
            '统计分析': { icon: '📉', description: '统计分析、数据统计、统计软件' },
            'BI工具': { icon: '📊', description: '商业智能、BI工具、数据报表' },
            '大数据': { icon: '🗃️', description: '大数据工具、数据处理、数据分析' },
            '数据可视化': { icon: '🎯', description: '数据可视化、信息图表、数据展示' },
            'Excel工具': { icon: '📋', description: 'Excel工具、表格处理、电子表格' },
            
            // 🌐 Web3/区块链类
            'Web3/区块链': { icon: '🌐', description: '加密货币、NFT、DeFi、区块链应用' },
            '加密货币': { icon: '₿', description: '比特币、加密货币、数字货币' },
            'NFT市场': { icon: '🎨', description: 'NFT交易、数字藏品、NFT市场' },
            'DeFi工具': { icon: '💰', description: 'DeFi协议、去中心化金融、金融工具' },
            '钱包工具': { icon: '👛', description: '加密钱包、数字钱包、钱包管理' },
            '区块链浏览器': { icon: '🔍', description: '区块链浏览器、交易查询、区块信息' },
            '交易工具': { icon: '💹', description: '加密货币交易、交易所、交易工具' },
            '挖矿工具': { icon: '⚡', description: '挖矿工具、算力租赁、挖矿软件' },
            
            // 🤖 人工智能类
            '人工智能': { icon: '🤖', description: 'AI工具、机器学习、人工智能应用' },
            '机器学习': { icon: '🧠', description: '机器学习、深度学习、神经网络' },
            'AI绘画': { icon: '🎨', description: 'AI绘画、图像生成、AI艺术' },
            'AI写作': { icon: '✍️', description: 'AI写作、文本生成、内容创作' },
            '语音识别': { icon: '🎤', description: '语音识别、语音合成、语音工具' },
            '图像识别': { icon: '👁️', description: '图像识别、计算机视觉、图像处理' },
            'AI助手': { icon: '🤝', description: 'AI助手、智能客服、对话机器人' },
            '大模型': { icon: '🦾', description: '大语言模型、GPT、AI模型' },
            'AI编程': { icon: '💻', description: 'AI编程、代码生成、AI辅助开发' },
            
            // 📱 社交媒体类
            '社交媒体': { icon: '📱', description: '社交平台、社区论坛、即时通讯' },
            '即时通讯': { icon: '💬', description: '聊天工具、即时通讯、消息应用' },
            '社区论坛': { icon: '👥', description: '论坛社区、讨论区、社交网络' },
            '博客平台': { icon: '📝', description: '博客平台、个人博客、写作平台' },
            '短视频': { icon: '📹', description: '短视频平台、视频分享、创意视频' },
            '知识社区': { icon: '🎓', description: '知识分享、问答社区、专家平台' },
            '兴趣社区': { icon: '❤️', description: '兴趣社区、爱好者平台、专题社区' },
            '职业社交': { icon: '💼', description: '职业社交、招聘平台、职场社区' },
            
            // 🛒 电商购物类
            '电商平台': { icon: '🛒', description: '在线购物、电商网站、二手交易' },
            '二手交易': { icon: '♻️', description: '二手市场、闲置交易、回收平台' },
            '比价工具': { icon: '🔍', description: '价格比较、比价网站、优惠信息' },
            '团购平台': { icon: '👨‍👩‍👧‍👦', description: '团购网站、优惠团购、拼团平台' },
            '海淘代购': { icon: '🌍', description: '海淘网站、代购平台、跨境购物' },
            '优惠券': { icon: '🎫', description: '优惠券、折扣信息、促销活动' },
            '拍卖平台': { icon: '🔨', description: '在线拍卖、竞价平台、拍卖网站' },
            
            // 📰 新闻资讯类
            '新闻资讯': { icon: '📰', description: '新闻网站、资讯平台、博客' },
            '科技新闻': { icon: '💡', description: '科技新闻、技术资讯、IT新闻' },
            '财经资讯': { icon: '💹', description: '财经新闻、投资资讯、股市信息' },
            '娱乐八卦': { icon: '🌟', description: '娱乐新闻、明星八卦、娱乐资讯' },
            '体育新闻': { icon: '⚽', description: '体育新闻、赛事资讯、体育直播' },
            '资讯聚合': { icon: '📡', description: '新闻聚合、资讯订阅、RSS阅读' },
            '深度报道': { icon: '🔍', description: '深度报道、调查新闻、专题报道' },
            '行业资讯': { icon: '📊', description: '行业新闻、专业资讯、市场分析' },
            
            // 🖼️ 媒体处理类
            '图片处理': { icon: '🖼️', description: '图片编辑、在线PS、图像处理' },
            '视频处理': { icon: '🎬', description: '视频编辑、在线剪辑、视频工具' },
            '音频处理': { icon: '🎵', description: '音频编辑、音乐制作、声音处理' },
            'GIF制作': { icon: '🎞️', description: 'GIF制作、动图制作、表情包' },
            '图片压缩': { icon: '🗜️', description: '图片压缩、图片优化、图片瘦身' },
            '滤镜特效': { icon: '✨', description: '图片滤镜、特效处理、美颜工具' },
            '格式转换': { icon: '🔄', description: '格式转换、媒体转换、文件转换' },
            
            // 📄 办公协作类
            '在线办公': { icon: '📄', description: '在线文档、表格、演示文稿' },
            '协作工具': { icon: '🤝', description: '团队协作、项目管理、协作平台' },
            '文档编辑': { icon: '📝', description: '文档编辑、在线写作、文字处理' },
            '表格工具': { icon: '📊', description: '电子表格、数据表格、Excel在线' },
            '演示文稿': { icon: '📽️', description: 'PPT制作、演示文稿、幻灯片工具' },
            '笔记工具': { icon: '📓', description: '笔记应用、知识管理、备忘录' },
            '白板协作': { icon: '🎯', description: '在线白板、协作画板、思维导图' },
            '会议工具': { icon: '📹', description: '视频会议、在线会议、会议工具' },
            '日历管理': { icon: '📅', description: '日历工具、日程管理、时间规划' },
            '邮件工具': { icon: '📧', description: '邮件客户端、邮件管理、邮箱服务' },
            
            // ☁️ 云服务类
            '云存储': { icon: '☁️', description: '网盘、云存储、文件同步' },
            '云服务': { icon: '🌐', description: '云服务、云计算、服务器租赁' },
            'CDN服务': { icon: '🚀', description: 'CDN加速、内容分发、网络加速' },
            '域名服务': { icon: '🌍', description: '域名注册、域名管理、DNS服务' },
            '网站建设': { icon: '🏗️', description: '网站建设、建站工具、网站托管' },
            '服务器': { icon: '🖥️', description: '服务器租用、VPS、主机托管' },
            '云数据库': { icon: '🗄️', description: '云数据库、数据库服务、数据存储' },
            '云函数': { icon: '⚡', description: '云函数、无服务器、函数计算' },
            
            // 🎓 教育培训类
            '在线教育': { icon: '🎓', description: '在线教育、远程学习、教育平台' },
            '语言学习': { icon: '🗣️', description: '语言学习、外语培训、翻译学习' },
            '技能培训': { icon: '🛠️', description: '技能培训、职业技能、培训课程' },
            '考试培训': { icon: '📝', description: '考试培训、考试准备、题库练习' },
            '儿童教育': { icon: '👶', description: '儿童教育、早教平台、亲子教育' },
            '艺术培训': { icon: '🎭', description: '艺术培训、美术教育、音乐培训' },
            
            // 🏥 健康医疗类
            '健康管理': { icon: '🏥', description: '健康管理、医疗咨询、健康工具' },
            '运动健身': { icon: '💪', description: '运动健身、健身指导、运动工具' },
            '医疗查询': { icon: '🔍', description: '医疗查询、症状自查、药品查询' },
            '心理测试': { icon: '🧠', description: '心理测试、心理测评、心理咨询' },
            
            // 🚗 出行旅游类
            '旅游攻略': { icon: '✈️', description: '旅游攻略、旅行指南、景点介绍' },
            '酒店预订': { icon: '🏨', description: '酒店预订、住宿预订、民宿平台' },
            '交通出行': { icon: '🚗', description: '交通出行、打车软件、公共交通' },
            '地图服务': { icon: '🗺️', description: '地图服务、导航工具、位置服务' },
            '美食推荐': { icon: '🍽️', description: '美食推荐、餐厅查询、外卖订餐' },
            
            // 💰 金融理财类
            '金融理财': { icon: '💰', description: '理财工具、投资理财、金融产品' },
            '银行服务': { icon: '🏦', description: '网上银行、银行服务、金融应用' },
            '保险服务': { icon: '🛡️', description: '保险服务、保险购买、理赔服务' },
            '信用卡': { icon: '💳', description: '信用卡申请、信用卡管理、银行卡服务' },
            '股票基金': { icon: '📈', description: '股票交易、基金投资、证券服务' },
            
            // 🎨 创意生活类
            '生活美学': { icon: '🌸', description: '生活美学、生活方式、品质生活' },
            '手工艺': { icon: '🧵', description: '手工艺、DIY制作、手工教程' },
            '美食菜谱': { icon: '👨‍🍳', description: '美食菜谱、烹饪教程、美食分享' },
            '家居装饰': { icon: '🏠', description: '家居装饰、室内设计、装修灵感' },
            '宠物相关': { icon: '🐾', description: '宠物用品、宠物医疗、宠物社区' },
            
            // 🔒 安全隐私类
            '安全工具': { icon: '🔒', description: '安全工具、隐私保护、网络安全' },
            'VPN服务': { icon: '🛡️', description: 'VPN服务、网络代理、隐私保护' },
            '密码安全': { icon: '🔐', description: '密码管理、安全认证、加密工具' },
            '杀毒软件': { icon: '🦠', description: '杀毒软件、安全防护、病毒查杀' },
            
            // 🌱 环保公益类
            '环保公益': { icon: '🌱', description: '环保公益、绿色生活、公益项目' },
            '慈善捐助': { icon: '❤️', description: '慈善捐助、公益募捐、志愿服务' },
            '二手回收': { icon: '♻️', description: '二手回收、环保回收、循环利用' },
            
            // 🎯 其他分类
            '工具导航': { icon: '🧭', description: '工具导航、网站导航、资源导航' },
            '软件下载': { icon: '⬇️', description: '软件下载、应用商店、软件工具' },
            '浏览器': { icon: '🌐', description: '浏览器、插件扩展、上网工具' },
            '操作系统': { icon: '💻', description: '操作系统、系统工具、系统优化' },
            '硬件设备': { icon: '🖱️', description: '硬件设备、数码产品、科技产品' },
            '测试服务': { icon: '🧪', description: '测试服务、在线测试、检测工具' },
            '营销推广': { icon: '📢', description: '营销推广、广告工具、推广服务' },
            '企业管理': { icon: '🏢', description: '企业管理、ERP系统、企业服务' },
            
            // 🚀 现代服务类
            '低代码平台': { icon: '🔄', description: '低代码开发、无代码平台、快速开发工具' },
            'SaaS服务': { icon: '☁️', description: '软件即服务、云应用、订阅服务' },
            '开源项目': { icon: '🐙', description: '开源软件、开源项目、开源社区' },
            '远程办公': { icon: '🏠', description: '远程协作、在线办公、远程工作工具' },
            '数字营销': { icon: '📈', description: '数字营销、推广工具、营销自动化' },
            '内容创作': { icon: '✍️', description: '内容创作、自媒体工具、创作平台' },
            '数据科学': { icon: '🔬', description: '数据科学、数据分析、数据挖掘工具' },
            '物联网': { icon: '📡', description: '物联网设备、IoT平台、智能设备' },
            '元宇宙': { icon: '🌌', description: '虚拟现实、增强现实、元宇宙平台' },
            '绿色科技': { icon: '🌿', description: '环保科技、可持续发展、绿色技术' }
        };
        
        return categoryMap[categoryName] || { 
            icon: '🌟', 
            description: `${categoryName}相关网站` 
        };
    }

    generateCategoryId(categoryName) {
        // Convert Chinese to English ID or use simplified version
        const idMap = {
            // 🎨 设计创意类
            '设计创意': 'design',
            'UI设计': 'ui-design',
            '平面设计': 'graphic-design',
            '3D设计': '3d-design',
            '动画制作': 'animation',
            '图标设计': 'icon-design',
            '字体设计': 'font-design',
            '配色工具': 'color-tools',
            '原型设计': 'prototype',
            '灵感素材': 'inspiration',
            
            // 🛠️ 开发工具类
            '开发工具': 'devtools',
            '代码编辑': 'code-editor',
            '代码托管': 'code-hosting',
            'API工具': 'api-tools',
            '数据库': 'database',
            '部署运维': 'deployment',
            '测试工具': 'testing',
            '包管理': 'package-management',
            '代码质量': 'code-quality',
            '终端工具': 'terminal',
            
            // 📚 学习资源类
            '学习资源': 'learning',
            '编程教程': 'programming-tutorial',
            '在线课程': 'online-course',
            '技术文档': 'documentation',
            '编程练习': 'coding-practice',
            '学习平台': 'learning-platform',
            '技术博客': 'tech-blog',
            '书籍资源': 'books',
            '视频教程': 'video-tutorial',
            '问答社区': 'qa-community',
            
            // 🎮 娱乐休闲类
            '娱乐休闲': 'entertainment',
            '在线游戏': 'online-games',
            '音乐平台': 'music',
            '视频平台': 'video',
            '直播平台': 'live-streaming',
            '播客电台': 'podcast',
            '漫画阅读': 'comics',
            '小说阅读': 'novels',
            '图片社区': 'photo-community',
            '小游戏': 'mini-games',
            
            // 🔧 实用工具类
            '实用工具': 'utility',
            '文件转换': 'file-converter',
            '文本工具': 'text-tools',
            '计算工具': 'calculator',
            '压缩工具': 'compression',
            '二维码': 'qr-code',
            '密码管理': 'password',
            '网络工具': 'network-tools',
            '时间工具': 'time-tools',
            '单位转换': 'unit-converter',
            '天气查询': 'weather',
            '地图导航': 'maps',
            '翻译工具': 'translation',
            'PDF工具': 'pdf-tools',
            '截图工具': 'screenshot',
            
            // 📊 数据分析类
            '数据分析': 'data-analysis',
            '图表制作': 'chart-tools',
            '数据挖掘': 'data-mining',
            '统计分析': 'statistics',
            'BI工具': 'bi-tools',
            '大数据': 'big-data',
            '数据可视化': 'data-visualization',
            'Excel工具': 'excel-tools',
            
            // 🌐 Web3/区块链类
            'Web3/区块链': 'web3',
            '加密货币': 'cryptocurrency',
            'NFT市场': 'nft',
            'DeFi工具': 'defi',
            '钱包工具': 'wallet',
            '区块链浏览器': 'blockchain-explorer',
            '交易工具': 'trading',
            '挖矿工具': 'mining',
            
            // 🤖 人工智能类
            '人工智能': 'ai',
            '机器学习': 'machine-learning',
            'AI绘画': 'ai-art',
            'AI写作': 'ai-writing',
            '语音识别': 'speech-recognition',
            '图像识别': 'image-recognition',
            'AI助手': 'ai-assistant',
            '大模型': 'large-models',
            'AI编程': 'ai-coding',
            
            // 📱 社交媒体类
            '社交媒体': 'social-media',
            '即时通讯': 'messaging',
            '社区论坛': 'forums',
            '博客平台': 'blogging',
            '短视频': 'short-video',
            '知识社区': 'knowledge-community',
            '兴趣社区': 'interest-community',
            '职业社交': 'professional-networking',
            
            // 🛒 电商购物类
            '电商平台': 'ecommerce',
            '二手交易': 'second-hand',
            '比价工具': 'price-comparison',
            '团购平台': 'group-buying',
            '海淘代购': 'cross-border-shopping',
            '优惠券': 'coupons',
            '拍卖平台': 'auction',
            
            // 📰 新闻资讯类
            '新闻资讯': 'news',
            '科技新闻': 'tech-news',
            '财经资讯': 'finance-news',
            '娱乐八卦': 'entertainment-news',
            '体育新闻': 'sports-news',
            '资讯聚合': 'news-aggregator',
            '深度报道': 'in-depth-reporting',
            '行业资讯': 'industry-news',
            
            // 🖼️ 媒体处理类
            '图片处理': 'image-processing',
            '视频处理': 'video-processing',
            '音频处理': 'audio-processing',
            'GIF制作': 'gif-maker',
            '图片压缩': 'image-compression',
            '滤镜特效': 'filters-effects',
            '格式转换': 'format-converter',
            
            // 📄 办公协作类
            '在线办公': 'online-office',
            '协作工具': 'collaboration',
            '文档编辑': 'document-editor',
            '表格工具': 'spreadsheet',
            '演示文稿': 'presentation',
            '笔记工具': 'note-taking',
            '白板协作': 'whiteboard',
            '会议工具': 'meeting-tools',
            '日历管理': 'calendar',
            '邮件工具': 'email-tools',
            
            // ☁️ 云服务类
            '云存储': 'cloud-storage',
            '云服务': 'cloud-services',
            'CDN服务': 'cdn',
            '域名服务': 'domain-services',
            '网站建设': 'website-building',
            '服务器': 'servers',
            '云数据库': 'cloud-database',
            '云函数': 'cloud-functions',
            
            // 🎓 教育培训类
            '在线教育': 'online-education',
            '语言学习': 'language-learning',
            '技能培训': 'skills-training',
            '考试培训': 'exam-prep',
            '儿童教育': 'children-education',
            '艺术培训': 'arts-training',
            
            // 🏥 健康医疗类
            '健康管理': 'health-management',
            '运动健身': 'fitness',
            '医疗查询': 'medical-query',
            '心理测试': 'psychology-test',
            
            // 🚗 出行旅游类
            '旅游攻略': 'travel-guide',
            '酒店预订': 'hotel-booking',
            '交通出行': 'transportation',
            '地图服务': 'map-services',
            '美食推荐': 'food-recommendation',
            
            // 💰 金融理财类
            '金融理财': 'finance',
            '银行服务': 'banking',
            '保险服务': 'insurance',
            '信用卡': 'credit-card',
            '股票基金': 'stocks-funds',
            
            // 🎨 创意生活类
            '生活美学': 'life-aesthetics',
            '手工艺': 'handicraft',
            '美食菜谱': 'recipes',
            '家居装饰': 'home-decoration',
            '宠物相关': 'pets',
            
            // 🔒 安全隐私类
            '安全工具': 'security-tools',
            'VPN服务': 'vpn',
            '密码安全': 'password-security',
            '杀毒软件': 'antivirus',
            
            // 🌱 环保公益类
            '环保公益': 'environmental',
            '慈善捐助': 'charity',
            '二手回收': 'recycling',
            
            // 🎯 其他分类
            '工具导航': 'navigation',
            '软件下载': 'software-download',
            '浏览器': 'browser',
            '操作系统': 'operating-system',
            '硬件设备': 'hardware',
            '测试服务': 'testing-service',
            '营销推广': 'marketing',
            '企业管理': 'business-management',
            
            // 🚀 现代服务类（新增）
            '低代码平台': 'low-code-platform',
            'SaaS服务': 'saas-services',
            '开源项目': 'open-source',
            '远程办公': 'remote-work',
            '数字营销': 'digital-marketing',
            '内容创作': 'content-creation',
            '数据科学': 'data-science',
            '物联网': 'iot',
            '元宇宙': 'metaverse',
            '绿色科技': 'green-tech'
        };
        
        return idMap[categoryName] || categoryName.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    updateFilterButtons() {
        const filterButtonsContainer = document.querySelector('.filter-buttons');
        if (!filterButtonsContainer) return;

        // Count websites per category
        const categoryCounts = {};
        this.categories.forEach(category => {
            categoryCounts[category.name] = this.websites.filter(website => website.category === category.name).length;
        });

        // Create HTML for filter buttons
        const buttonsHTML = `
            <button class="filter-btn active" data-category="all" aria-pressed="true" aria-label="显示全部 ${this.websites.length} 个网站">全部 (${this.websites.length})</button>
            ${this.categories.map(category => 
                `<button class="filter-btn" data-category="${category.name}" aria-pressed="false" aria-label="显示 ${category.name} 分类的 ${categoryCounts[category.name] || 0} 个网站">${category.icon} ${category.name} (${categoryCounts[category.name] || 0})</button>`
            ).join('')}
        `;

        filterButtonsContainer.innerHTML = buttonsHTML;
        
        // Re-attach event listeners to new buttons
        this.attachFilterListeners();
    }

    attachFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                // Get the category filter and apply it
                const category = button.dataset.category;
                this.filterByCategory(category);
            });
        });
    }

    renderWebsites() {
        const grid = document.getElementById('websitesGrid');
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('noResults');

        // Hide loading
        loading.style.display = 'none';

        if (this.filteredWebsites.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';

        const websiteCards = this.filteredWebsites.map(website => this.createWebsiteCard(website)).join('');
        grid.innerHTML = websiteCards;
    }

    createWebsiteCard(website) {
        const tags = website.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const submitterName = website.submitter.name;
        const submitterGithub = website.submitter.github;
        
        // Get language display info
        const languageInfo = this.getLanguageDisplay(website.language);
        
        // Get logo URL - use custom logo if provided, otherwise fetch favicon
        const logoUrl = website.logo || `https://www.google.com/s2/favicons?domain=${new URL(website.url).hostname}&sz=128`;
        
        return `
            <article class="website-card" data-category="${website.category}" role="listitem" aria-label="${website.name} - ${website.description}">
                <div class="category-badge" aria-label="分类: ${website.category}">${website.category}</div>
                <div class="website-header">
                    <div class="website-info">
                        <img src="${logoUrl}" 
                             alt="${website.name} logo" 
                             class="website-logo" 
                             loading="eager"
                             onerror="this.src='https://www.google.com/s2/favicons?domain=${new URL(website.url).hostname}&sz=128'; this.onerror=function(){this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTIiIGZpbGw9IiM2MzY2ZjEiLz4KPHBhdGggZD0iTTEyIDI0TDI0IDM2TDM2IDEyVjM2SDI0VjEyTDEyIDI0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'};">
                        <div class="website-text">
                            <a href="${website.url}" target="_blank" rel="noopener noreferrer" class="website-title" aria-label="访问 ${website.name} 网站">
                                ${website.name}
                                <span class="language-badge ${languageInfo.class}" aria-label="语言: ${languageInfo.text}">${languageInfo.text}</span>
                            </a>
                            <div class="website-url" aria-label="网站地址: ${website.url}">${website.url}</div>
                        </div>
                    </div>
                </div>
                <p class="website-description">${website.description}</p>
                <div class="website-tags" role="list" aria-label="标签">${tags}</div>
                <div class="website-footer">
                    <div class="submitter-info">
                        <span>由</span>
                        <a href="https://github.com/${submitterGithub}" target="_blank" rel="noopener noreferrer" class="submitter-link" aria-label="查看 ${submitterName} 的 GitHub">
                            ${submitterName}
                        </a>
                        <span>推荐于</span>
                        <time class="added-date" datetime="${website.added_date}">${this.formatDate(website.added_date)}</time>
                    </div>
                    <a href="${website.url}" target="_blank" rel="noopener noreferrer" class="visit-btn" aria-label="访问 ${website.name} 网站">
                        访问
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                    </a>
                </div>
            </article>
        `;
    }

    updateStats() {
        // Update total websites
        const totalWebsitesEl = document.getElementById('totalWebsites');
        totalWebsitesEl.textContent = this.websites.length;

        // Update total categories
        const totalCategoriesEl = document.getElementById('totalCategories');
        totalCategoriesEl.textContent = this.categories.length;

        // Update unique contributors
        const contributors = new Set(this.websites.map(w => w.submitter.github));
        const totalContributorsEl = document.getElementById('totalContributors');
        totalContributorsEl.textContent = contributors.size;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Back to top button
        this.setupBackToTop();
        
        // Filter listeners are now attached in updateFilterButtons()
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredWebsites = [...this.websites];
        } else {
            this.filteredWebsites = this.websites.filter(website => {
                const nameMatch = website.name.toLowerCase().includes(searchTerm);
                const descriptionMatch = website.description.toLowerCase().includes(searchTerm);
                const tagsMatch = website.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                const categoryMatch = website.category.toLowerCase().includes(searchTerm);
                
                return nameMatch || descriptionMatch || tagsMatch || categoryMatch;
            });
        }
        
        this.renderWebsites();
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.filteredWebsites = [...this.websites];
        } else {
            this.filteredWebsites = this.websites.filter(website => 
                website.category === category
            );
        }
        this.renderWebsites();
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    showError(message) {
        const grid = document.getElementById('websitesGrid');
        const loading = document.getElementById('loading');
        
        loading.style.display = 'none';
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 16px;"></i>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">${message}</p>
            </div>
        `;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AwesomeWebsites();
});
