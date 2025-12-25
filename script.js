// 应用状态管理
const appState = {
    currentLanguage: 'zh',
    currentPage: 'welcome-page',
    currentTopic: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    isAnswered: false
};

// 多语言文本
const translations = {
    zh: {
        welcomeTitle: '学习英雄',
        welcomeSubtitle: 'AI问答引导式学习平台',
        startButton: '开始学习',
        topicSetupTitle: '设置学习主题',
        topicPlaceholder: '输入你想学习的主题...',
        generateButton: '生成问答卡片',
        popularTopics: '热门主题示例',
        questionText: '问题',
        scoreText: '得分:',
        nextButton: '下一题',
        resultTitle: '学习完成！',
        finalScore: '最终得分:',
        accuracy: '正确率:',
        restartButton: '重新开始',
        newTopicButton: '新主题'
    },
    en: {
        welcomeTitle: 'Learning Hero',
        welcomeSubtitle: 'AI-Powered Interactive Learning Platform',
        startButton: 'Start Learning',
        topicSetupTitle: 'Set Learning Topic',
        topicPlaceholder: 'Enter your learning topic...',
        generateButton: 'Generate Q&A Cards',
        popularTopics: 'Popular Topics',
        questionText: 'Question',
        scoreText: 'Score:',
        nextButton: 'Next',
        resultTitle: 'Learning Complete!',
        finalScore: 'Final Score:',
        accuracy: 'Accuracy:',
        restartButton: 'Restart',
        newTopicButton: 'New Topic'
    }
};

// 示例题库（实际应用中应该调用AI API）
const questionBanks = {
    '人工智能基础': [
        {
            question: '什么是机器学习？',
            question_en: 'What is Machine Learning?',
            options: [
                '让计算机像人类一样思考的程序',
                '通过数据训练计算机模型的方法',
                '人工智能的另一种说法',
                '计算机自动编程的技术'
            ],
            options_en: [
                'Programs that make computers think like humans',
                'Method of training computer models through data',
                'Another term for artificial intelligence',
                'Technology for automatic computer programming'
            ],
            correctAnswer: 1,
            explanation: '机器学习是通过数据训练模型，让计算机能够自动学习和改进的技术。',
            explanation_en: 'Machine learning is a technology that trains models through data, enabling computers to learn and improve automatically.'
        },
        {
            question: '深度学习主要基于什么结构？',
            question_en: 'What structure is deep learning primarily based on?',
            options: [
                '决策树',
                '神经网络',
                '支持向量机',
                '贝叶斯网络'
            ],
            options_en: [
                'Decision trees',
                'Neural networks',
                'Support vector machines',
                'Bayesian networks'
            ],
            correctAnswer: 1,
            explanation: '深度学习主要基于多层神经网络结构，能够处理复杂的模式识别任务。',
            explanation_en: 'Deep learning is primarily based on multi-layer neural network structures, capable of handling complex pattern recognition tasks.'
        },
        {
            question: '以下哪个不是常见的机器学习类型？',
            question_en: 'Which of the following is NOT a common type of machine learning?',
            options: [
                '监督学习',
                '无监督学习',
                '强化学习',
                '自动学习'
            ],
            options_en: [
                'Supervised learning',
                'Unsupervised learning',
                'Reinforcement learning',
                'Automatic learning'
            ],
            correctAnswer: 3,
            explanation: '常见的机器学习类型包括监督学习、无监督学习和强化学习。',
            explanation_en: 'Common types of machine learning include supervised learning, unsupervised learning, and reinforcement learning.'
        },
        {
            question: '人工智能的"图灵测试"是什么？',
            question_en: 'What is the "Turing Test" in artificial intelligence?',
            options: [
                '测试计算机图形处理能力',
                '判断机器是否具有人类智能的测试',
                '评估算法复杂度的测试',
                '检测网络安全漏洞的测试'
            ],
            options_en: [
                'Test for computer graphics processing capability',
                'Test to determine if a machine has human-like intelligence',
                'Test for evaluating algorithm complexity',
                'Test for detecting network security vulnerabilities'
            ],
            correctAnswer: 1,
            explanation: '图灵测试是由艾伦·图灵提出的，用于判断机器是否具有人类智能的测试方法。',
            explanation_en: 'The Turing Test, proposed by Alan Turing, is a method to determine if a machine exhibits human-like intelligence.'
        },
        {
            question: '自然语言处理(NLP)主要处理什么？',
            question_en: 'What does Natural Language Processing (NLP) primarily deal with?',
            options: [
                '计算机视觉和图像识别',
                '人类语言与计算机的交互',
                '数据库管理和查询优化',
                '网络协议和通信安全'
            ],
            options_en: [
                'Computer vision and image recognition',
                'Interaction between human language and computers',
                'Database management and query optimization',
                'Network protocols and communication security'
            ],
            correctAnswer: 1,
            explanation: '自然语言处理是人工智能的一个分支，专注于人类语言与计算机之间的交互和理解。',
            explanation_en: 'Natural Language Processing is a branch of AI that focuses on interaction and understanding between human language and computers.'
        }
    ],
    '世界历史': [
        {
            question: '第一次世界大战爆发于哪一年？',
            question_en: 'In which year did World War I begin?',
            options: [
                '1912年',
                '1914年',
                '1916年',
                '1918年'
            ],
            options_en: [
                '1912',
                '1914',
                '1916',
                '1918'
            ],
            correctAnswer: 1,
            explanation: '第一次世界大战于1914年7月28日爆发，持续到1918年11月11日。',
            explanation_en: 'World War I began on July 28, 1914, and lasted until November 11, 1918.'
        },
        {
            question: '古埃及文明主要位于哪个河流流域？',
            question_en: 'Which river valley was ancient Egyptian civilization primarily located in?',
            options: [
                '尼罗河',
                '幼发拉底河',
                '印度河',
                '黄河'
            ],
            options_en: [
                'Nile River',
                'Euphrates River',
                'Indus River',
                'Yellow River'
            ],
            correctAnswer: 0,
            explanation: '古埃及文明发源于尼罗河流域，依赖尼罗河的定期泛滥进行农业生产。',
            explanation_en: 'Ancient Egyptian civilization originated in the Nile River valley, relying on the river\'s periodic flooding for agricultural production.'
        },
        {
            question: '文艺复兴运动起源于哪个国家？',
            question_en: 'Which country did the Renaissance movement originate from?',
            options: [
                '法国',
                '英国',
                '意大利',
                '德国'
            ],
            options_en: [
                'France',
                'England',
                'Italy',
                'Germany'
            ],
            correctAnswer: 2,
            explanation: '文艺复兴运动起源于14世纪的意大利，后来传播到欧洲其他国家。',
            explanation_en: 'The Renaissance movement originated in Italy in the 14th century and later spread to other European countries.'
        },
        {
            question: '美国独立宣言签署于哪一年？',
            question_en: 'In which year was the United States Declaration of Independence signed?',
            options: [
                '1775年',
                '1776年',
                '1781年',
                '1789年'
            ],
            options_en: [
                '1775',
                '1776',
                '1781',
                '1789'
            ],
            correctAnswer: 1,
            explanation: '美国独立宣言于1776年7月4日签署，标志着美国从英国独立。',
            explanation_en: 'The United States Declaration of Independence was signed on July 4, 1776, marking America\'s independence from Britain.'
        },
        {
            question: '工业革命最早开始于哪个国家？',
            question_en: 'Which country did the Industrial Revolution first begin in?',
            options: [
                '美国',
                '法国',
                '英国',
                '德国'
            ],
            options_en: [
                'United States',
                'France',
                'Great Britain',
                'Germany'
            ],
            correctAnswer: 2,
            explanation: '工业革命最早于18世纪60年代在英国开始，后来传播到欧洲和北美。',
            explanation_en: 'The Industrial Revolution first began in Great Britain in the 1760s and later spread to Europe and North America.'
        }
    ],
    '编程入门': [
        {
            question: 'HTML是什么的缩写？',
            question_en: 'What does HTML stand for?',
            options: [
                'Hyper Text Markup Language',
                'High Tech Modern Language',
                'Hyper Transfer Markup Language',
                'Home Tool Markup Language'
            ],
            options_en: [
                'Hyper Text Markup Language',
                'High Tech Modern Language',
                'Hyper Transfer Markup Language',
                'Home Tool Markup Language'
            ],
            correctAnswer: 0,
            explanation: 'HTML是HyperText Markup Language的缩写，用于创建网页结构。',
            explanation_en: 'HTML stands for HyperText Markup Language, used for creating web page structures.'
        },
        {
            question: '以下哪个是JavaScript的特性？',
            question_en: 'Which of the following is a characteristic of JavaScript?',
            options: [
                '编译型语言',
                '静态类型',
                '事件驱动',
                '只能运行在服务器端'
            ],
            options_en: [
                'Compiled language',
                'Statically typed',
                'Event-driven',
                'Only runs on server-side'
            ],
            correctAnswer: 2,
            explanation: 'JavaScript是解释型、动态类型、事件驱动的脚本语言，可以在浏览器和服务器端运行。',
            explanation_en: 'JavaScript is an interpreted, dynamically typed, event-driven scripting language that can run in browsers and on server-side.'
        },
        {
            question: 'CSS的主要作用是什么？',
            question_en: 'What is the main purpose of CSS?',
            options: [
                '处理网页逻辑',
                '定义网页样式和布局',
                '存储网站数据',
                '管理用户认证'
            ],
            options_en: [
                'Handle webpage logic',
                'Define webpage styles and layout',
                'Store website data',
                'Manage user authentication'
            ],
            correctAnswer: 1,
            explanation: 'CSS用于定义网页的样式、布局和外观，与HTML配合使用。',
            explanation_en: 'CSS is used to define the styles, layout, and appearance of web pages, working together with HTML.'
        },
        {
            question: 'Python是什么类型的编程语言？',
            question_en: 'What type of programming language is Python?',
            options: [
                '编译型语言',
                '解释型语言',
                '机器语言',
                '汇编语言'
            ],
            options_en: [
                'Compiled language',
                'Interpreted language',
                'Machine language',
                'Assembly language'
            ],
            correctAnswer: 1,
            explanation: 'Python是解释型高级编程语言，具有简洁易读的语法特点。',
            explanation_en: 'Python is an interpreted high-level programming language known for its concise and readable syntax.'
        },
        {
            question: 'Git的主要用途是什么？',
            question_en: 'What is the main purpose of Git?',
            options: [
                '网页设计',
                '版本控制',
                '数据库管理',
                '网络通信'
            ],
            options_en: [
                'Web design',
                'Version control',
                'Database management',
                'Network communication'
            ],
            correctAnswer: 1,
            explanation: 'Git是一个分布式版本控制系统，用于跟踪代码变更和协作开发。',
            explanation_en: 'Git is a distributed version control system used for tracking code changes and collaborative development.'
        }
    ],
    '生物科学': [
        {
            question: 'DNA的全称是什么？',
            question_en: 'What is the full name of DNA?',
            options: [
                '脱氧核糖核酸',
                '核糖核酸',
                '蛋白质',
                '氨基酸'
            ],
            options_en: [
                'Deoxyribonucleic Acid',
                'Ribonucleic Acid',
                'Protein',
                'Amino Acid'
            ],
            correctAnswer: 0,
            explanation: 'DNA是脱氧核糖核酸的缩写，是生物遗传信息的载体。',
            explanation_en: 'DNA stands for Deoxyribonucleic Acid, which carries genetic information in living organisms.'
        },
        {
            question: '光合作用主要发生在植物的哪个部位？',
            question_en: 'Where does photosynthesis primarily occur in plants?',
            options: [
                '根部',
                '茎部',
                '叶片',
                '花朵'
            ],
            options_en: [
                'Roots',
                'Stems',
                'Leaves',
                'Flowers'
            ],
            correctAnswer: 2,
            explanation: '光合作用主要发生在植物的叶片中，叶绿体是进行光合作用的细胞器。',
            explanation_en: 'Photosynthesis primarily occurs in plant leaves, with chloroplasts being the organelles responsible for this process.'
        },
        {
            question: '人类有多少对染色体？',
            question_en: 'How many pairs of chromosomes do humans have?',
            options: [
                '21对',
                '22对',
                '23对',
                '24对'
            ],
            options_en: [
                '21 pairs',
                '22 pairs',
                '23 pairs',
                '24 pairs'
            ],
            correctAnswer: 2,
            explanation: '正常人类有23对染色体，其中22对是常染色体，1对是性染色体。',
            explanation_en: 'Normal humans have 23 pairs of chromosomes, with 22 pairs being autosomes and 1 pair being sex chromosomes.'
        },
        {
            question: '哪种细胞器被称为"细胞的动力工厂"？',
            question_en: 'Which organelle is known as the "powerhouse of the cell"?',
            options: [
                '核糖体',
                '线粒体',
                '高尔基体',
                '内质网'
            ],
            options_en: [
                'Ribosome',
                'Mitochondrion',
                'Golgi apparatus',
                'Endoplasmic reticulum'
            ],
            correctAnswer: 1,
            explanation: '线粒体是细胞的能量工厂，负责产生ATP（三磷酸腺苷）。',
            explanation_en: 'Mitochondria are the energy factories of cells, responsible for producing ATP (Adenosine Triphosphate).'
        },
        {
            question: '达尔文的进化论主要基于什么原理？',
            question_en: 'What principle is Darwin\'s theory of evolution primarily based on?',
            options: [
                '自然选择',
                '基因突变',
                '物种隔离',
                '环境适应'
            ],
            options_en: [
                'Natural selection',
                'Genetic mutation',
                'Species isolation',
                'Environmental adaptation'
            ],
            correctAnswer: 0,
            explanation: '达尔文的进化论核心是自然选择，即适者生存的原理。',
            explanation_en: 'The core of Darwin\'s theory of evolution is natural selection, the principle of survival of the fittest.'
        }
    ],
    '金融知识': [
        {
            question: '什么是通货膨胀？',
            question_en: 'What is inflation?',
            options: [
                '货币贬值，物价上涨',
                '货币升值，物价下跌',
                '经济增长放缓',
                '失业率上升'
            ],
            options_en: [
                'Currency devaluation and rising prices',
                'Currency appreciation and falling prices',
                'Economic growth slowdown',
                'Rising unemployment rate'
            ],
            correctAnswer: 0,
            explanation: '通货膨胀是指货币购买力下降，一般物价水平持续上涨的经济现象。',
            explanation_en: 'Inflation refers to the economic phenomenon where currency purchasing power decreases and general price levels continuously rise.'
        },
        {
            question: '股票市场的主要功能是什么？',
            question_en: 'What is the main function of the stock market?',
            options: [
                '为企业融资提供平台',
                '提供赌博场所',
                '促进商品交易',
                '管理银行账户'
            ],
            options_en: [
                'Provide a platform for corporate financing',
                'Provide gambling venues',
                'Facilitate commodity trading',
                'Manage bank accounts'
            ],
            correctAnswer: 0,
            explanation: '股票市场的主要功能是为企业提供融资渠道，同时为投资者提供投资机会。',
            explanation_en: 'The main function of the stock market is to provide financing channels for companies and investment opportunities for investors.'
        },
        {
            question: '什么是复利？',
            question_en: 'What is compound interest?',
            options: [
                '利息再生利息',
                '单次计算的利息',
                '固定利率',
                '浮动利率'
            ],
            options_en: [
                'Interest earning interest',
                'Single-calculated interest',
                'Fixed interest rate',
                'Floating interest rate'
            ],
            correctAnswer: 0,
            explanation: '复利是指利息再生利息的计算方式，能让资金以指数级增长。',
            explanation_en: 'Compound interest refers to the calculation method where interest earns interest, allowing funds to grow exponentially.'
        },
        {
            question: '中央银行的主要职责不包括？',
            question_en: 'Which of the following is NOT a main responsibility of a central bank?',
            options: [
                '制定货币政策',
                '发行货币',
                '管理商业银行',
                '提供个人贷款'
            ],
            options_en: [
                'Formulating monetary policy',
                'Issuing currency',
                'Managing commercial banks',
                'Providing personal loans'
            ],
            correctAnswer: 3,
            explanation: '中央银行负责货币政策、货币发行和金融稳定，但不直接向个人提供贷款。',
            explanation_en: 'Central banks are responsible for monetary policy, currency issuance, and financial stability, but do not directly provide personal loans.'
        },
        {
            question: '什么是GDP？',
            question_en: 'What is GDP?',
            options: [
                '国内生产总值',
                '国民生产总值',
                '人均收入',
                '通货膨胀率'
            ],
            options_en: [
                'Gross Domestic Product',
                'Gross National Product',
                'Per capita income',
                'Inflation rate'
            ],
            correctAnswer: 0,
            explanation: 'GDP是国内生产总值的缩写，衡量一个国家或地区在一定时期内生产的所有最终产品和服务的市场价值。',
            explanation_en: 'GDP stands for Gross Domestic Product, measuring the market value of all final goods and services produced in a country or region during a specific period.'
        }
    ],
    '地理知识': [
        {
            question: '世界上最长的河流是？',
            question_en: 'What is the longest river in the world?',
            options: [
                '尼罗河',
                '亚马逊河',
                '长江',
                '密西西比河'
            ],
            options_en: [
                'Nile River',
                'Amazon River',
                'Yangtze River',
                'Mississippi River'
            ],
            correctAnswer: 0,
            explanation: '尼罗河全长约6650公里，是世界上最长的河流。',
            explanation_en: 'The Nile River is approximately 6,650 kilometers long, making it the longest river in the world.'
        },
        {
            question: '中国的首都是？',
            question_en: 'What is the capital of China?',
            options: [
                '上海',
                '北京',
                '广州',
                '深圳'
            ],
            options_en: [
                'Shanghai',
                'Beijing',
                'Guangzhou',
                'Shenzhen'
            ],
            correctAnswer: 1,
            explanation: '北京是中华人民共和国的首都。',
            explanation_en: 'Beijing is the capital of the People\'s Republic of China.'
        },
        {
            question: '哪个洲没有沙漠？',
            question_en: 'Which continent has no deserts?',
            options: [
                '亚洲',
                '欧洲',
                '非洲',
                '大洋洲'
            ],
            options_en: [
                'Asia',
                'Europe',
                'Africa',
                'Oceania'
            ],
            correctAnswer: 1,
            explanation: '欧洲是唯一没有沙漠的大洲，虽然有一些半沙漠地区。',
            explanation_en: 'Europe is the only continent without deserts, though it has some semi-desert areas.'
        },
        {
            question: '珠穆朗玛峰位于哪个国家？',
            question_en: 'Mount Everest is located in which country?',
            options: [
                '中国',
                '尼泊尔',
                '中国和尼泊尔边境',
                '印度'
            ],
            options_en: [
                'China',
                'Nepal',
                'China-Nepal border',
                'India'
            ],
            correctAnswer: 2,
            explanation: '珠穆朗玛峰位于中国和尼泊尔边境，是世界最高峰。',
            explanation_en: 'Mount Everest is located on the China-Nepal border and is the world\'s highest peak.'
        },
        {
            question: '哪个大洋面积最大？',
            question_en: 'Which ocean is the largest by area?',
            options: [
                '大西洋',
                '印度洋',
                '太平洋',
                '北冰洋'
            ],
            options_en: [
                'Atlantic Ocean',
                'Indian Ocean',
                'Pacific Ocean',
                'Arctic Ocean'
            ],
            correctAnswer: 2,
            explanation: '太平洋是世界上最大的海洋，覆盖地球表面的约三分之一。',
            explanation_en: 'The Pacific Ocean is the largest ocean in the world, covering about one-third of Earth\'s surface.'
        }
    ],
    '体育运动': [
        {
            question: '世界杯足球赛每几年举办一次？',
            question_en: 'How often is the FIFA World Cup held?',
            options: [
                '每2年',
                '每3年',
                '每4年',
                '每5年'
            ],
            options_en: [
                'Every 2 years',
                'Every 3 years',
                'Every 4 years',
                'Every 5 years'
            ],
            correctAnswer: 2,
            explanation: 'FIFA世界杯足球赛每4年举办一次，是世界上最重要的足球赛事。',
            explanation_en: 'The FIFA World Cup is held every 4 years and is the most important football tournament in the world.'
        },
        {
            question: '奥林匹克运动会的发源地是？',
            question_en: 'Where did the Olympic Games originate?',
            options: [
                '意大利',
                '希腊',
                '英国',
                '法国'
            ],
            options_en: [
                'Italy',
                'Greece',
                'United Kingdom',
                'France'
            ],
            correctAnswer: 1,
            explanation: '古代奥林匹克运动会起源于希腊的奥林匹亚。',
            explanation_en: 'The ancient Olympic Games originated in Olympia, Greece.'
        },
        {
            question: '篮球比赛中每队上场几名球员？',
            question_en: 'How many players from each team are on the court during a basketball game?',
            options: [
                '4名',
                '5名',
                '6名',
                '7名'
            ],
            options_en: [
                '4 players',
                '5 players',
                '6 players',
                '7 players'
            ],
            correctAnswer: 1,
            explanation: '标准篮球比赛中每队有5名球员同时在场上比赛。',
            explanation_en: 'In standard basketball games, each team has 5 players on the court at the same time.'
        },
        {
            question: '马拉松比赛的全程距离是多少公里？',
            question_en: 'What is the total distance of a marathon race in kilometers?',
            options: [
                '38.195公里',
                '42.195公里',
                '45.195公里',
                '50.195公里'
            ],
            options_en: [
                '38.195 kilometers',
                '42.195 kilometers',
                '45.195 kilometers',
                '50.195 kilometers'
            ],
            correctAnswer: 1,
            explanation: '马拉松比赛的全程距离为42.195公里，来源于马拉松战役的距离。',
            explanation_en: 'The marathon race is 42.195 kilometers long, derived from the distance of the Battle of Marathon.'
        },
        {
            question: '网球比赛中的"大满贯"不包括？',
            question_en: 'Which of the following is NOT part of tennis Grand Slam?',
            options: [
                '温布尔登',
                '法网',
                '美网',
                '奥运会'
            ],
            options_en: [
                'Wimbledon',
                'French Open',
                'US Open',
                'Olympic Games'
            ],
            correctAnswer: 3,
            explanation: '网球大满贯包括温布尔登、法网、美网和澳网，奥运会不是大满贯赛事。',
            explanation_en: 'The tennis Grand Slam includes Wimbledon, French Open, US Open, and Australian Open. The Olympic Games is not a Grand Slam event.'
        }
    ],
    '天文科学': [
        {
            question: '太阳系中最大的行星是？',
            question_en: 'What is the largest planet in our solar system?',
            options: [
                '土星',
                '木星',
                '海王星',
                '天王星'
            ],
            options_en: [
                'Saturn',
                'Jupiter',
                'Neptune',
                'Uranus'
            ],
            correctAnswer: 1,
            explanation: '木星是太阳系中最大的行星，质量比其他所有行星的总和还大。',
            explanation_en: 'Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.'
        },
        {
            question: '地球绕太阳公转一圈需要多长时间？',
            question_en: 'How long does it take for Earth to complete one orbit around the Sun?',
            options: [
                '365天',
                '366天',
                '365.25天',
                '364天'
            ],
            options_en: [
                '365 days',
                '366 days',
                '365.25 days',
                '364 days'
            ],
            correctAnswer: 2,
            explanation: '地球绕太阳公转一圈需要365.25天，这就是为什么有闰年的原因。',
            explanation_en: 'Earth takes 365.25 days to orbit the Sun, which is why we have leap years.'
        },
        {
            question: '月球上沒有的是什么？',
            question_en: 'What is NOT found on the Moon?',
            options: [
                '大气层',
                '环形山',
                '灰尘',
                '重力'
            ],
            options_en: [
                'Atmosphere',
                'Craters',
                'Dust',
                'Gravity'
            ],
            correctAnswer: 0,
            explanation: '月球几乎没有大气层，这导致温度差异极大且无法传播声音。',
            explanation_en: 'The Moon has almost no atmosphere, causing extreme temperature differences and preventing sound transmission.'
        },
        {
            question: '北极星位于哪个星座？',
            question_en: 'Which constellation is the North Star located in?',
            options: [
                '大熊座',
                '小熊座',
                '天鹅座',
                '仙后座'
            ],
            options_en: [
                'Ursa Major',
                'Ursa Minor',
                'Cygnus',
                'Cassiopeia'
            ],
            correctAnswer: 1,
            explanation: '北极星位于小熊座，是小熊座中最亮的恒星。',
            explanation_en: 'The North Star is located in Ursa Minor and is the brightest star in the Little Dipper constellation.'
        },
        {
            question: '光从太阳到达地球需要多长时间？',
            question_en: 'How long does it take for light to travel from the Sun to Earth?',
            options: [
                '8分钟',
                '8秒钟',
                '8小时',
                '8天'
            ],
            options_en: [
                '8 minutes',
                '8 seconds',
                '8 hours',
                '8 days'
            ],
            correctAnswer: 0,
            explanation: '光从太阳到达地球大约需要8分20秒。',
            explanation_en: 'Light takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth.'
        }
    ],
    '音乐艺术': [
        {
            question: '被誉为"乐圣"的作曲家是？',
            question_en: 'Which composer is known as the "Sage of Music"?',
            options: [
                '莫扎特',
                '贝多芬',
                '巴赫',
                '舒伯特'
            ],
            options_en: [
                'Mozart',
                'Beethoven',
                'Bach',
                'Schubert'
            ],
            correctAnswer: 1,
            explanation: '贝多芬被誉为"乐圣"，是古典音乐史上最重要的作曲家之一。',
            explanation_en: 'Beethoven is known as the "Sage of Music" and is one of the most important composers in classical music history.'
        },
        {
            question: '《蒙娜丽莎》是哪位画家的作品？',
            question_en: 'Who painted the "Mona Lisa"?',
            options: [
                '米开朗基罗',
                '达芬奇',
                '拉斐尔',
                '毕加索'
            ],
            options_en: [
                'Michelangelo',
                'Leonardo da Vinci',
                'Raphael',
                'Picasso'
            ],
            correctAnswer: 1,
            explanation: '《蒙娜丽莎》是意大利文艺复兴时期画家达芬奇的代表作。',
            explanation_en: 'The "Mona Lisa" is a masterpiece by Italian Renaissance artist Leonardo da Vinci.'
        },
        {
            question: '中国京剧的四大名旦不包括？',
            question_en: 'Which of the following is NOT one of the Four Great Dan in Peking Opera?',
            options: [
                '梅兰芳',
                '程砚秋',
                '尚小云',
                '荀慧生'
            ],
            options_en: [
                'Mei Lanfang',
                'Cheng Yanqiu',
                'Shang Xiaoyun',
                'Xun Huisheng'
            ],
            correctAnswer: 3,
            explanation: '中国京剧四大名旦是梅兰芳、程砚秋、尚小云、荀慧生。',
            explanation_en: 'The Four Great Dan in Peking Opera are Mei Lanfang, Cheng Yanqiu, Shang Xiaoyun, and Xun Huisheng.'
        },
        {
            question: '被称为"现代艺术之父"的是？',
            question_en: 'Who is known as the "Father of Modern Art"?',
            options: [
                '塞尚',
                '梵高',
                '毕加索',
                '莫奈'
            ],
            options_en: [
                'Cézanne',
                'Van Gogh',
                'Picasso',
                'Monet'
            ],
            correctAnswer: 0,
            explanation: '保罗·塞尚被称为"现代艺术之父"，对现代艺术发展影响深远。',
            explanation_en: 'Paul Cézanne is known as the "Father of Modern Art" and had profound influence on modern art development.'
        },
        {
            question: '中国传统绘画中的"墨分五色"不包括？',
            question_en: 'Which color is NOT included in the "Five Tones of Ink" in traditional Chinese painting?',
            options: [
                '浓',
                '淡',
                '干',
                '紫'
            ],
            options_en: [
                'Dark',
                'Light',
                'Dry',
                'Purple'
            ],
            correctAnswer: 3,
            explanation: '墨分五色指的是浓、淡、干、湿、焦五种不同的墨色层次。',
            explanation_en: 'The "Five Tones of Ink" refers to five different ink color levels: dark, light, dry, wet, and scorched.'
        }
    ],
    '环境科学': [
        {
            question: '温室效应的主要原因是什么？',
            question_en: 'What is the main cause of the greenhouse effect?',
            options: [
                '氧气增加',
                '二氧化碳等温室气体增加',
                '植物减少',
                '水资源减少'
            ],
            options_en: [
                'Increased oxygen',
                'Increased greenhouse gases like carbon dioxide',
                'Reduced plant life',
                'Reduced water resources'
            ],
            correctAnswer: 1,
            explanation: '温室效应主要由二氧化碳、甲烷等温室气体增加导致，这些气体阻止热量散失到太空。',
            explanation_en: 'The greenhouse effect is mainly caused by increased greenhouse gases like carbon dioxide and methane, which trap heat in the atmosphere.'
        },
        {
            question: '什么是可再生能源？',
            question_en: 'What are renewable energy sources?',
            options: [
                '煤炭',
                '石油',
                '太阳能',
                '天然气'
            ],
            options_en: [
                'Coal',
                'Oil',
                'Solar energy',
                'Natural gas'
            ],
            correctAnswer: 2,
            explanation: '可再生能源是指在自然界中可以循环再生的能源，如太阳能、风能、水能等。',
            explanation_en: 'Renewable energy sources are energy that can be regenerated naturally, such as solar, wind, and hydroelectric power.'
        },
        {
            question: '酸雨的主要成分是什么？',
            question_en: 'What are the main components of acid rain?',
            options: [
                '硫酸和硝酸',
                '盐酸和氢氟酸',
                '碳酸和磷酸',
                '醋酸和柠檬酸'
            ],
            options_en: [
                'Sulfuric acid and nitric acid',
                'Hydrochloric acid and hydrofluoric acid',
                'Carbonic acid and phosphoric acid',
                'Acetic acid and citric acid'
            ],
            correctAnswer: 0,
            explanation: '酸雨主要由硫酸和硝酸组成，这些酸性物质来源于工业排放的二氧化硫和氮氧化物。',
            explanation_en: 'Acid rain mainly consists of sulfuric acid and nitric acid, which come from industrial emissions of sulfur dioxide and nitrogen oxides.'
        },
        {
            question: '臭氧层的主要作用是？',
            question_en: 'What is the main function of the ozone layer?',
            options: [
                '提供氧气',
                '吸收紫外线',
                '调节温度',
                '产生降雨'
            ],
            options_en: [
                'Provide oxygen',
                'Absorb ultraviolet radiation',
                'Regulate temperature',
                'Generate rainfall'
            ],
            correctAnswer: 1,
            explanation: '臭氧层的主要作用是吸收太阳发射的紫外线，保护地球上的生物免受辐射伤害。',
            explanation_en: 'The main function of the ozone layer is to absorb ultraviolet radiation from the Sun, protecting life on Earth from harmful radiation.'
        },
        {
            question: '生物多样性的三个层次不包括？',
            question_en: 'Which of the following is NOT a level of biodiversity?',
            options: [
                '物种多样性',
                '基因多样性',
                '生态系统多样性',
                '气候多样性'
            ],
            options_en: [
                'Species diversity',
                'Genetic diversity',
                'Ecosystem diversity',
                'Climate diversity'
            ],
            correctAnswer: 3,
            explanation: '生物多样性包括物种多样性、基因多样性和生态系统多样性三个层次。',
            explanation_en: 'Biodiversity includes three levels: species diversity, genetic diversity, and ecosystem diversity.'
        }
    ],
    '心理学': [
        {
            question: '心理学之父是谁？',
            question_en: 'Who is considered the father of psychology?',
            options: [
                '弗洛伊德',
                '冯特',
                '荣格',
                '华生'
            ],
            options_en: [
                'Freud',
                'Wundt',
                'Jung',
                'Watson'
            ],
            correctAnswer: 1,
            explanation: '威廉·冯特被认为是心理学之父，他在1879年建立了世界上第一个心理学实验室。',
            explanation_en: 'Wilhelm Wundt is considered the father of psychology, establishing the world\'s first psychology laboratory in 1879.'
        },
        {
            question: '马斯洛需求层次理论的最高层次是？',
            question_en: 'What is the highest level in Maslow\'s hierarchy of needs?',
            options: [
                '安全需求',
                '社交需求',
                '自我实现需求',
                '尊重需求'
            ],
            options_en: [
                'Safety needs',
                'Social needs',
                'Self-actualization needs',
                'Esteem needs'
            ],
            correctAnswer: 2,
            explanation: '自我实现需求是马斯洛需求层次理论的最高层次，指个人潜能的充分发挥。',
            explanation_en: 'Self-actualization is the highest level in Maslow\'s hierarchy of needs, referring to the full realization of personal potential.'
        },
        {
            question: '记忆的三个基本过程不包括？',
            question_en: 'Which of the following is NOT one of the three basic processes of memory?',
            options: [
                '编码',
                '存储',
                '提取',
                '删除'
            ],
            options_en: [
                'Encoding',
                'Storage',
                'Retrieval',
                'Deletion'
            ],
            correctAnswer: 3,
            explanation: '记忆的三个基本过程是编码、存储和提取，不包括删除。',
            explanation_en: 'The three basic processes of memory are encoding, storage, and retrieval, not deletion.'
        },
        {
            question: '认知失调理论是由谁提出的？',
            question_en: 'Who proposed the theory of cognitive dissonance?',
            options: [
                '皮亚杰',
                '费斯廷格',
                '班杜拉',
                '科尔伯格'
            ],
            options_en: [
                'Piaget',
                'Festinger',
                'Bandura',
                'Kohlberg'
            ],
            correctAnswer: 1,
            explanation: '认知失调理论是由利昂·费斯廷格在1957年提出的心理学理论。',
            explanation_en: 'The theory of cognitive dissonance was proposed by Leon Festinger in 1957.'
        },
        {
            question: '情商(EQ)的概念是谁推广的？',
            question_en: 'Who popularized the concept of Emotional Intelligence (EQ)?',
            options: [
                '弗洛伊德',
                '加德纳',
                '丹尼尔·戈尔曼',
                '斯坦伯格'
            ],
            options_en: [
                'Freud',
                'Gardner',
                'Daniel Goleman',
                'Sternberg'
            ],
            correctAnswer: 2,
            explanation: '丹尼尔·戈尔曼在1995年出版了《情商》一书，推广了情商概念。',
            explanation_en: 'Daniel Goleman popularized the concept of Emotional Intelligence with his 1995 book "Emotional Intelligence".'
        }
    ],
    '医学常识': [
        {
            question: '人体最大的器官是？',
            question_en: 'What is the largest organ in the human body?',
            options: [
                '肝脏',
                '肺脏',
                '皮肤',
                '大脑'
            ],
            options_en: [
                'Liver',
                'Lungs',
                'Skin',
                'Brain'
            ],
            correctAnswer: 2,
            explanation: '皮肤是人体最大的器官，成年人皮肤总面积约1.5-2平方米。',
            explanation_en: 'Skin is the largest organ in the human body, with a total area of approximately 1.5-2 square meters in adults.'
        },
        {
            question: '血液由什么细胞运输氧气？',
            question_en: 'What cells in blood transport oxygen?',
            options: [
                '白细胞',
                '红细胞',
                '血小板',
                '血浆'
            ],
            options_en: [
                'White blood cells',
                'Red blood cells',
                'Platelets',
                'Plasma'
            ],
            correctAnswer: 1,
            explanation: '红细胞含有血红蛋白，负责运输氧气到身体各部位。',
            explanation_en: 'Red blood cells contain hemoglobin and are responsible for transporting oxygen to various parts of the body.'
        },
        {
            question: '人体共有多少块骨骼？',
            question_en: 'How many bones are in the human body?',
            options: [
                '196块',
                '206块',
                '216块',
                '226块'
            ],
            options_en: [
                '196 bones',
                '206 bones',
                '216 bones',
                '226 bones'
            ],
            correctAnswer: 1,
            explanation: '成年人骨骼系统由206块骨骼组成。',
            explanation_en: 'The adult human skeletal system consists of 206 bones.'
        },
        {
            question: '什么是抗生素？',
            question_en: 'What are antibiotics?',
            options: [
                '抗病毒的药物',
                '杀死细菌的药物',
                '止痛的药物',
                '退烧的药物'
            ],
            options_en: [
                'Antiviral drugs',
                'Bacteria-killing drugs',
                'Pain relief drugs',
                'Fever-reducing drugs'
            ],
            correctAnswer: 1,
            explanation: '抗生素是能够杀死或抑制细菌生长的药物，对病毒无效。',
            explanation_en: 'Antibiotics are drugs that can kill or inhibit bacterial growth, but they are ineffective against viruses.'
        },
        {
            question: '人体正常体温大约是多少摄氏度？',
            question_en: 'What is the normal human body temperature in Celsius?',
            options: [
                '36-37°C',
                '35-36°C',
                '37-38°C',
                '38-39°C'
            ],
            options_en: [
                '36-37°C',
                '35-36°C',
                '37-38°C',
                '38-39°C'
            ],
            correctAnswer: 0,
            explanation: '人体正常体温大约在36-37摄氏度之间。',
            explanation_en: 'Normal human body temperature is approximately 36-37 degrees Celsius.'
        }
    ]
};

// 页面切换函数
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(pageId).classList.add('active');
    appState.currentPage = pageId;
}

// 语言切换函数
function switchLanguage(lang) {
    appState.currentLanguage = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // 更新所有文本内容
    updateTextContent(lang);
}

// 更新文本内容
function updateTextContent(lang) {
    // 隐藏所有语言版本的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.style.display = 'none';
    });
    
    // 显示当前语言版本的元素
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(element => {
        element.style.display = element.tagName === 'INPUT' ? 'block' : 'inline-block';
    });
    
    // 特殊处理按钮元素 - 根据语言显示/隐藏
    const startButtonZh = document.getElementById('start-learning-zh');
    const startButtonEn = document.getElementById('start-learning-en');
    const generateButtonZh = document.getElementById('generate-questions-zh');
    const generateButtonEn = document.getElementById('generate-questions-en');
    const topicInputZh = document.getElementById('topic-input-zh');
    const topicInputEn = document.getElementById('topic-input-en');
    
    // 处理开始学习按钮
    if (startButtonZh && startButtonEn) {
        startButtonZh.style.display = lang === 'zh' ? 'inline-block' : 'none';
        startButtonEn.style.display = lang === 'en' ? 'inline-block' : 'none';
    }
    
    // 处理生成问答卡片按钮
    if (generateButtonZh && generateButtonEn) {
        generateButtonZh.style.display = lang === 'zh' ? 'inline-block' : 'none';
        generateButtonEn.style.display = lang === 'en' ? 'inline-block' : 'none';
    }
    
    // 处理输入框
    if (topicInputZh && topicInputEn) {
        topicInputZh.style.display = lang === 'zh' ? 'block' : 'none';
        topicInputEn.style.display = lang === 'en' ? 'block' : 'none';
    }
    
    // 特殊处理主题标签 - 确保正确显示
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        const tagLang = tag.getAttribute('data-lang');
        if (tagLang === lang) {
            tag.style.display = 'inline-block';
        } else {
            tag.style.display = 'none';
        }
    });
    
    // 更新动态文本
    const texts = translations[lang];
    Object.keys(texts).forEach(key => {
        const elements = document.querySelectorAll(`[data-lang-key="${key}"]`);
        elements.forEach(element => {
            element.textContent = texts[key];
        });
    });
}

// 生成AI问答卡片（模拟AI生成）
function generateQuestions(topic) {
    appState.currentTopic = topic;
    
    // 模拟AI生成过程
    showLoading(true);
    
    setTimeout(() => {
        // 从题库中获取问题，或者生成新问题
        if (questionBanks[topic]) {
            appState.questions = [...questionBanks[topic]];
        } else {
            // 如果没有预设题库，生成通用问题
            appState.questions = generateGenericQuestions(topic);
        }
        
        // 打乱问题顺序
        shuffleArray(appState.questions);
        
        // 限制问题数量为5个
        appState.questions = appState.questions.slice(0, 5);
        
        showLoading(false);
        startQuiz();
    }, 1500);
}

// 生成通用问题（当主题不在预设题库中时）
function generateGenericQuestions(topic) {
    return [
        {
            question: `${topic}的基本概念是什么？`,
            question_en: `What is the basic concept of ${topic}?`,
            options: [
                '这是一个复杂的技术概念',
                '涉及多个领域的知识体系',
                '需要专业背景才能理解',
                '以上都不正确'
            ],
            options_en: [
                'This is a complex technical concept',
                'A knowledge system involving multiple fields',
                'Requires professional background to understand',
                'None of the above are correct'
            ],
            correctAnswer: 1,
            explanation: `${topic}是一个涉及多个领域的综合性知识体系。`,
            explanation_en: `${topic} is a comprehensive knowledge system involving multiple fields.`
        },
        {
            question: `学习${topic}的主要目的是什么？`,
            question_en: `What is the main purpose of learning ${topic}?`,
            options: [
                '获得专业认证',
                '提升个人能力',
                '解决实际问题',
                '所有选项都正确'
            ],
            options_en: [
                'Obtain professional certification',
                'Enhance personal capabilities',
                'Solve practical problems',
                'All of the above are correct'
            ],
            correctAnswer: 3,
            explanation: `学习${topic}可以帮助提升能力、解决实际问题，并获得专业认可。`,
            explanation_en: `Learning ${topic} can help enhance capabilities, solve practical problems, and gain professional recognition.`
        },
        {
            question: `${topic}在现代社会中的应用包括哪些？`,
            question_en: `What are the applications of ${topic} in modern society?`,
            options: [
                '仅限于理论研究',
                '广泛应用于各个领域',
                '只在特定行业使用',
                '还没有实际应用'
            ],
            options_en: [
                'Limited to theoretical research',
                'Widely used in various fields',
                'Only used in specific industries',
                'No practical applications yet'
            ],
            correctAnswer: 1,
            explanation: `${topic}在现代社会的各个领域都有广泛应用。`,
            explanation_en: `${topic} has wide applications in various fields of modern society.`
        },
        {
            question: `${topic}的发展历史是怎样的？`,
            question_en: `What is the development history of ${topic}?`,
            options: [
                '起源于古代文明',
                '近代才开始发展',
                '经历了多个发展阶段',
                '以上都不正确'
            ],
            options_en: [
                'Originated from ancient civilizations',
                'Began development only in modern times',
                'Has gone through multiple development stages',
                'None of the above are correct'
            ],
            correctAnswer: 2,
            explanation: `${topic}经历了从简单到复杂、从理论到实践的多个发展阶段。`,
            explanation_en: `${topic} has gone through multiple development stages from simple to complex, from theory to practice.`
        },
        {
            question: `学习${topic}需要具备哪些基础知识？`,
            question_en: `What basic knowledge is required to learn ${topic}?`,
            options: [
                '不需要任何基础知识',
                '需要相关领域的基础知识',
                '只需要数学基础',
                '只需要英语基础'
            ],
            options_en: [
                'No basic knowledge required',
                'Basic knowledge in related fields is needed',
                'Only mathematical foundation is needed',
                'Only English foundation is needed'
            ],
            correctAnswer: 1,
            explanation: `学习${topic}通常需要相关领域的基础知识，但初学者也可以从基础开始学习。`,
            explanation_en: `Learning ${topic} usually requires basic knowledge in related fields, but beginners can also start from the basics.`
        }
    ];
}

// 打乱数组顺序
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 显示/隐藏加载状态
function showLoading(show) {
    const generateBtn = document.querySelector('.generate-btn');
    if (show) {
        generateBtn.innerHTML = '<span class="loading"></span>生成中...';
        generateBtn.disabled = true;
    } else {
        generateBtn.textContent = translations[appState.currentLanguage].generateButton;
        generateBtn.disabled = false;
    }
}

// 开始答题
function startQuiz() {
    console.log('=== startQuiz调试信息 ===');
    console.log('当前语言:', appState.currentLanguage);
    console.log('题目数量:', appState.questions.length);
    
    appState.currentQuestionIndex = 0;
    appState.score = 0;
    appState.selectedOption = null;
    appState.isAnswered = false;
    
    console.log('分数已重置为:', appState.score);
    
    // 更新问题总数
    document.getElementById('total-questions').textContent = appState.questions.length;
    
    showPage('quiz-page');
    displayQuestion();
}

// 显示当前问题
function displayQuestion() {
    const question = appState.questions[appState.currentQuestionIndex];
    
    // 更新进度条
    const progress = ((appState.currentQuestionIndex + 1) / appState.questions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    
    // 更新问题编号
    document.getElementById('current-num').textContent = appState.currentQuestionIndex + 1;
    
    // 更新得分
    document.getElementById('score').textContent = appState.score;
    
    // 根据语言显示问题
    const questionText = appState.currentLanguage === 'en' ? question.question_en : question.question;
    document.getElementById('question-text').textContent = questionText;
    
    // 显示选项
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const options = appState.currentLanguage === 'en' ? question.options_en : question.options;
    options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // 重置下一题按钮状态
    const nextButtons = document.querySelectorAll('[id^="next-question-"]');
    nextButtons.forEach(button => {
        button.disabled = true;
        button.onclick = nextQuestion;
    });
}

// 选择选项
function selectOption(optionIndex) {
    if (appState.isAnswered) return;
    
    appState.selectedOption = optionIndex;
    appState.isAnswered = true;
    
    const question = appState.questions[appState.currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // 调试信息：输出关键变量
    console.log('=== selectOption调试信息 ===');
    console.log('当前语言:', appState.currentLanguage);
    console.log('选择选项索引:', optionIndex);
    console.log('正确答案索引:', question.correctAnswer);
    console.log('当前分数:', appState.score);
    console.log('选项数量:', options.length);
    
    // 标记选中的选项
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
    
    // 检查答案并更新分数
    if (optionIndex === question.correctAnswer) {
        appState.score += 10;
        console.log('答对了！新分数:', appState.score);
        options[optionIndex].classList.add('correct');
    } else {
        console.log('答错了！正确答案是索引', question.correctAnswer);
        options[optionIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');
    }
    
    // 启用下一题按钮
    const nextButtons = document.querySelectorAll('[id^="next-question-"]');
    nextButtons.forEach(button => {
        button.disabled = false;
    });
    
    // 立即更新分数显示
    document.getElementById('score').textContent = appState.score;
}

// 下一题
function nextQuestion() {
    appState.currentQuestionIndex++;
    
    if (appState.currentQuestionIndex < appState.questions.length) {
        appState.selectedOption = null;
        appState.isAnswered = false;
        displayQuestion();
    } else {
        showResults();
    }
}

// 显示结果
function showResults() {
    console.log('=== showResults调试信息 ===');
    console.log('最终分数:', appState.score);
    console.log('题目总数:', appState.questions.length);
    console.log('当前语言:', appState.currentLanguage);
    
    const accuracy = Math.round((appState.score / (appState.questions.length * 10)) * 100);
    
    // 确保分数正确显示 - 修复英文模式计分问题
    const finalScoreElement = document.getElementById('final-score');
    const maxScoreElement = document.getElementById('max-score');
    const accuracyElement = document.getElementById('accuracy');
    
    if (finalScoreElement) finalScoreElement.textContent = appState.score;
    if (maxScoreElement) maxScoreElement.textContent = appState.questions.length * 10;
    if (accuracyElement) accuracyElement.textContent = accuracy + '%';
    
    console.log('显示的最终分数:', finalScoreElement ? finalScoreElement.textContent : '未找到元素');
    
    showPage('result-page');
}

// 事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言显示
    switchLanguage(appState.currentLanguage);
    
    // 语言切换
    const langBtnZh = document.getElementById('lang-zh');
    const langBtnEn = document.getElementById('lang-en');
    
    if (langBtnZh) {
        langBtnZh.addEventListener('click', () => switchLanguage('zh'));
    }
    
    if (langBtnEn) {
        langBtnEn.addEventListener('click', () => switchLanguage('en'));
    }
    
    // 开始学习按钮（处理所有语言版本）
    const startButtonZh = document.getElementById('start-learning-zh');
    const startButtonEn = document.getElementById('start-learning-en');
    
    console.log('中文按钮:', startButtonZh);
    console.log('英文按钮:', startButtonEn);
    
    if (startButtonZh) {
        startButtonZh.addEventListener('click', () => {
            console.log('中文按钮被点击');
            showPage('topic-setup');
        });
    }
    
    if (startButtonEn) {
        startButtonEn.addEventListener('click', () => {
            console.log('英文按钮被点击');
            showPage('topic-setup');
        });
    }
    
    // 生成问答卡片按钮（处理所有语言版本）
    const generateButtonZh = document.getElementById('generate-questions-zh');
    const generateButtonEn = document.getElementById('generate-questions-en');
    
    if (generateButtonZh) {
        generateButtonZh.addEventListener('click', () => {
            const topicInputs = document.querySelectorAll('[id^="topic-input-"]');
            const activeInput = Array.from(topicInputs).find(input => input.style.display !== 'none');
            const topic = activeInput ? activeInput.value.trim() : '';
            
            if (topic) {
                generateQuestions(topic);
            } else {
                const alertText = appState.currentLanguage === 'en' ? 'Please enter a learning topic' : '请输入学习主题';
                alert(alertText);
            }
        });
    }
    
    if (generateButtonEn) {
        generateButtonEn.addEventListener('click', () => {
            const topicInputs = document.querySelectorAll('[id^="topic-input-"]');
            const activeInput = Array.from(topicInputs).find(input => input.style.display !== 'none');
            const topic = activeInput ? activeInput.value.trim() : '';
            
            if (topic) {
                generateQuestions(topic);
            } else {
                const alertText = appState.currentLanguage === 'en' ? 'Please enter a learning topic' : '请输入学习主题';
                alert(alertText);
            }
        });
    }
    
    // 主题示例标签
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const topic = tag.getAttribute('data-topic');
            const topicInputs = document.querySelectorAll('[id^="topic-input-"]');
            const activeInput = Array.from(topicInputs).find(input => input.style.display !== 'none');
            if (activeInput) {
                activeInput.value = topic;
            }
        });
    });
    
    // 重新开始按钮（处理所有语言版本）
    document.querySelectorAll('[id^="restart-quiz-"]').forEach(button => {
        button.addEventListener('click', () => {
            startQuiz();
        });
    });
    
    // 新主题按钮（处理所有语言版本）
    document.querySelectorAll('[id^="new-topic-"]').forEach(button => {
        button.addEventListener('click', () => {
            showPage('topic-setup');
        });
    });
    
    // 输入框回车事件（处理所有语言版本）
    document.querySelectorAll('[id^="topic-input-"]').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const generateButtons = document.querySelectorAll('[id^="generate-questions-"]');
                const activeButton = Array.from(generateButtons).find(btn => btn.style.display !== 'none');
                if (activeButton) {
                    activeButton.click();
                }
            }
        });
    });
    
});

// 添加微信浏览器兼容性
function isWeChatBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent);
}

if (isWeChatBrowser()) {
    // 微信浏览器特殊处理
    document.addEventListener('WeixinJSBridgeReady', function() {
        // 微信浏览器初始化
        
        // 分享给朋友
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                title: '学习英雄 - AI问答引导式学习',
                desc: 'AI问答引导式学习平台，通过闯关答题的形式引导用户更轻松愉快地掌握知识。',
                link: window.location.href,
                imgUrl: 'https://via.placeholder.com/600x300?text=Learning+Hero'
            }, function(res) {
                // 分享成功回调
            });
        });
        
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                title: '学习英雄 - AI问答引导式学习',
                desc: 'AI问答引导式学习平台，通过闯关答题的形式引导用户更轻松愉快地掌握知识。',
                link: window.location.href,
                imgUrl: 'https://via.placeholder.com/600x300?text=Learning+Hero'
            }, function(res) {
                // 分享成功回调
            });
        });
        
        // 分享到QQ
        WeixinJSBridge.on('menu:share:qq', function(argv) {
            WeixinJSBridge.invoke('shareQQ', {
                title: '学习英雄 - AI问答引导式学习',
                desc: 'AI问答引导式学习平台，通过闯关答题的形式引导用户更轻松愉快地掌握知识。',
                link: window.location.href,
                imgUrl: 'https://via.placeholder.com/600x300?text=Learning+Hero'
            }, function(res) {
                // 分享成功回调
            });
        });
        
        // 分享到QQ空间
        WeixinJSBridge.on('menu:share:QZone', function(argv) {
            WeixinJSBridge.invoke('shareQZone', {
                title: '学习英雄 - AI问答引导式学习',
                desc: 'AI问答引导式学习平台，通过闯关答题的形式引导用户更轻松愉快地掌握知识。',
                link: window.location.href,
                imgUrl: 'https://via.placeholder.com/600x300?text=Learning+Hero'
            }, function(res) {
                // 分享成功回调
            });
        });
    });
}

// 添加服务工作者（可选，用于离线功能）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// Version: 1.0.5 (fix for null element errors)
