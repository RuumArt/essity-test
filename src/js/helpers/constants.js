import {getNumWord} from "./formUtils.js";

export const DEFAULT_LOGO = '/images/form/essity.svg';

export const RULES = {
    REQ: {
        rule: 'required',
        errorMessage: 'Некорректный ввод',
    },
    EMAIL: {
        rule: 'email',
        errorMessage: 'Некорректный ввод',
    },
    FILE: {
        rule: 'maxFilesCount',
        value: 5,
        errorMessage: 'Максимальное кол-во файлов - 5',
    },
}

export const BRANDS = [
    {
        id: 'Zewa',
        title: 'Zewa',
        value: 'zewa',
        image: '/images/form/zewa.png',
    },
    {
        id: 'Libresse',
        title: 'Libresse',
        value: 'libresse',
        image: '/images/form/lib.png',
    },
    {
        id: 'Tena',
        title: 'ТЕНА',
        value: 'tena',
        image: '/images/form/tena.png',
    }
];

export const TYPE_REVIEW = [
    {
        id: 'product',
        title: 'Отзыв на продукт',
        value: 'product',
    },
    {
        id: 'brand',
        title: 'Отзыв на рекламу или коммуникацию от бренда',
        value: 'brand',
    }
];


export const CONTACT_INPUTS = [
    {
        name: 'fio',
        placeholder: 'Иванов Иван Иванович',
        title: 'ФИО',
        isRequired: true,
        type: 'input',
        rules: [
            RULES.REQ,
        ]
    },
    {
        name: 'email',
        placeholder: 'email@mail.ru',
        title: 'Электронная почта',
        isRequired: true,
        type: 'input',
        rules: [
            RULES.REQ,
            RULES.EMAIL,
        ]
    },
    {
        name: 'phone',
        placeholder: '+7 (999) 999-99-99',
        mask: `+{7} (000) 000-00-00`,
        title: 'Телефон',
        isRequired: true,
        type: 'input',
        rules: [
            RULES.REQ,
        ]
    },
];

export const CONTACT_INPUTS_WITH_COMMENT = [
    ...CONTACT_INPUTS,
    {
        name: 'comment',
        placeholder: '',
        title: 'Расскажите о вашем предложении',
        isRequired: false,
        type: 'textarea',
    }
]

export const PRODUCTS_TYPES = {
    zewa: [
        {
            id: 't1',
            title: 'Туалетная бумага',
            value: 'toilet_paper',
        },
        {
            id: 't2',
            title: 'Бумажные полотенца',
            value: 'paper_towels',
        },
        {
            id: 't3',
            title: 'Платочки и салфетки',
            value: 'napkins',
        }
    ],
    tena: [
        {
            id: 't1',
            title: 'Прокладки',
            value: 'laying',
        },
        {
            id: 't2',
            title: 'Впитывающие трусы',
            value: 'briefs',
        },
        {
            id: 't3',
            title: 'Подгузники-трусы для ухода',
            value: 'diapers_care',
        },
        {
            id: 't4',
            title: 'Классические подгузники',
            value: 'diapers_classic',
        },
        {
            id: 't5',
            title: 'Поясные подгузники',
            value: 'diapers_waist',
        },
        {
            id: 't6',
            title: 'Очищение, защита, уход',
            value: 'cleansing',
        },
        {
            id: 't7',
            title: 'Впитывающие пеленки',
            value: 'pampers',
        },
        {
            id: 'other',
            title: 'Другое',
            value: 'other',
        }
    ]
};

export const BRANDS_WITHOUT_TYPE = ['libresse'];

export const PRODUCTS = [
    {
        id: 'p1',
        title: 'Бумажные полотенца Zewa',
        value: 'p1',
        brand: 'zewa',
        type: 'paper_towels',
        image: '/images/form/products/zewa/p1.png',
    },
    {
        id: 'p2',
        title: 'Бумажные полотенца Zewa Expert',
        value: 'p2',
        brand: 'zewa',
        type: 'paper_towels',
        image: '/images/form/products/zewa/p2.png',
    },
    {
        id: 'p3',
        title: 'Бумажные полотенца Zewa Premium',
        value: 'p3',
        brand: 'zewa',
        type: 'paper_towels',
        image: '/images/form/products/zewa/p3.png',
    },
    {
        id: 'p4',
        title: 'Платки бумажные Zewa Deluxe без аромата',
        value: 'p4',
        brand: 'zewa',
        type: 'napkins',
        image: '/images/form/products/zewa/p4.png',
    },
    {
        id: 'p5',
        title: 'Платки бумажные Zewa Deluxe Детские',
        value: 'p5',
        brand: 'zewa',
        type: 'napkins',
        image: '/images/form/products/zewa/p5.png',
    },
    {
        id: 'p6',
        title: 'Платки бумажные Zewa Deluxe Ромашка',
        value: 'p6',
        brand: 'zewa',
        type: 'napkins',
        image: '/images/form/products/zewa/p6.png',
    },
    {
        id: 'p7',
        title: 'Салфетки бумажные в коробке Zewa Deluxe 3 слоя',
        value: 'p7',
        brand: 'zewa',
        type: 'napkins',
        image: '/images/form/products/zewa/p7.png',
    },
    {
        id: 'p8',
        title: 'Салфетки бумажные в коробке Zewa Everyday 2 слоя',
        value: 'p8',
        brand: 'zewa',
        type: 'napkins',
        image: '/images/form/products/zewa/p8.png',
    },
    {
        id: 'p9',
        title: 'Влажная туалетная бумага Zewa Kids 40 л',
        value: 'p9',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p9.png',
    },
    {
        id: 'p10',
        title: 'Влажная туалетная бумага Zewa Natural Camomile 40 л',
        value: 'p10',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p10.png',
    },
    {
        id: 'p11',
        title: 'Влажная туалетная бумага Zewa Pure 40 л ',
        value: 'p11',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p11.png',
    },
    {
        id: 'p12',
        title: 'Туалетная Бумага Zewa Плюс 2-ух сл. БЕЛАЯ',
        value: 'p12',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p12.png',
        isRoll: true,
    },
    {
        id: 'p13',
        title: 'Туалетная Бумага Zewa Плюс 2-ух сл. с ароматом океанической свежести',
        value: 'p13',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p13.png',
        isRoll: true,
    },
    {
        id: 'p14',
        title: 'Туалетная Бумага Zewa Плюс 2-ух сл. с ароматом яблока',
        value: 'p14',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p14.png',
        isRoll: true,
    },
    {
        id: 'p15',
        title: 'Туалетная бумага Zewa Deluxe 3х-сл.',
        value: 'p15',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p15.png',
        isRoll: true,
    },
    {
        id: 'p16',
        title: 'Туалетная бумага Zewa Deluxe Жасмин 3х-сл.',
        value: 'p16',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p16.png',
        isRoll: true,
        rolls: 6,
    },
    {
        id: 'p17',
        title: 'Туалетная бумага Zewa Deluxe Орхидея 3х-сл.',
        value: 'p17',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p17.png',
        isRoll: true,
    },
    {
        id: 'p18',
        title: 'Туалетная бумага Zewa Deluxe Персик 3х-сл.',
        value: 'p18',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p18.png',
        isRoll: true,
    },
    {
        id: 'p19',
        title: 'Туалетная бумага Zewa Deluxe Ромашка 3х-сл.',
        value: 'p19',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p19.png',
        isRoll: true,
    },
    {
        id: 'p20',
        title: 'Туалетная Бумага Zewa Just 1, 4-х сл.',
        value: 'p20',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p20.png',
        isRoll: true,
    },
    {
        id: 'p21',
        title: 'Туалетная бумага Zewa Comfort 3х-сл.',
        value: 'p21',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p21.png',
        isRoll: true,
        rolls: 6,
    },
    {
        id: 'p22',
        title: 'Туалетная бумага Zewa Natural Comfort 3х-сл.',
        value: 'p22',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p22.png',
        isRoll: true,
        rolls: 6,
    },
    {
        id: 'p23',
        title: 'Туалетная Бумага Zewa Natural Soft 4-х сл.',
        value: 'p23',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p23.png',
        isRoll: true,
    },
    {
        id: 'p24',
        title: 'Туалетная бумага Zewa Exclusive Comfort 4-х сл.',
        value: 'p24',
        brand: 'zewa',
        type: 'toilet_paper',
        image: '/images/form/products/zewa/p24.png',
        isRoll: true,
    },

    {
        id: 'p25',
        title: 'Прокладки Libresse Pure Sensitive нормал 6',
        value: 'p25',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p25.png',
    },
    {
        id: 'p26',
        title: 'Прокладки Libresse Pure Sensitive ночные 8',
        value: 'p26',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p26.png',
    },
    {
        id: 'p27',
        title: 'Прокладки Libresse Ultra нормал с мягкой поверхностью 10',
        value: 'p27',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p27.png',
    },
    {
        id: 'p28',
        title: 'Прокладки Libresse Ultra нормал с мягкой поверхностью 20',
        value: 'p28',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p28.png',
    },
    {
        id: 'p29',
        title: 'Прокладки Libresse Ultra супер с мягкой поверхностью 8',
        value: 'p29',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p29.png',
    },
    {
        id: 'p30',
        title: 'Прокладки Libresse Ultra супер с мягкой поверхностью 16',
        value: 'p30',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p30.png',
    },
    {
        id: 'p31',
        title: 'Прокладки Libresse Ultra ночные 8',
        value: 'p31',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p31.png',
    },
    {
        id: 'p32',
        title: 'Прокладки Libresse Ultra ночные 16',
        value: 'p32',
        brand: 'libresse',
        type: 'toilet_paper',
        image: '/images/form/products/lib/p32.png',
    },

    {
        id: 'p33',
        title: 'Прокладки TENA Lady Slim Ultra Mini',
        value: 'p33',
        brand: 'tena',
        type: 'laying',
        image: '/images/form/products/tena/p33.png',
        isCount: true,
    },
    {
        id: 'p35',
        title: 'Прокладки TENA Lady Slim Mini',
        value: 'p35',
        brand: 'tena',
        type: 'laying',
        image: '/images/form/products/tena/p35.png',
        isCount: true,
    },
    {
        id: 'p36',
        title: 'Прокладки TENA Lady Normal',
        value: 'p36',
        brand: 'tena',
        type: 'laying',
        image: '/images/form/products/tena/p36.png',
        isCount: true,
    },
    {
        id: 'p37',
        title: 'Прокладки TENA Lady Slim Extra',
        value: 'p37',
        brand: 'tena',
        type: 'laying',
        image: '/images/form/products/tena/p37.png',
        isCount: true,
    },
    {
        id: 'p38',
        title: 'Прокладки TENA Lady Slim Extra Plus 8 шт.',
        value: 'p38',
        brand: 'tena',
        type: 'laying',
        image: '/images/form/products/tena/p38.png',
    },

    {
        id: 'p39',
        title: 'Впитывающие трусы TENA Lady Slim Pants Normal L 7 шт.',
        value: 'p39',
        brand: 'tena',
        type: 'briefs',
        image: '/images/form/products/tena/p39.png',
    },
    {
        id: 'p40',
        title: 'Впитывающие трусы TENA Lady Pants Plus',
        value: 'p40',
        brand: 'tena',
        type: 'briefs',
        image: '/images/form/products/tena/p40.png',
        isSize: true,
    },

    {
        id: 'p41',
        title: 'Подгузники-трусы TENA Pants Normal',
        value: 'p41',
        brand: 'tena',
        type: 'diapers_care',
        image: '/images/form/products/tena/p41.png',
        isSize: true,
    },
    {
        id: 'p42',
        title: 'Подгузники-трусы TENA Pants Night Super',
        value: 'p42',
        brand: 'tena',
        type: 'diapers_care',
        image: '/images/form/products/tena/p42.png',
        isSize: true,
    },

    {
        id: 'p43',
        title: 'Классические подгузники TENA Slip Original',
        value: 'p43',
        brand: 'tena',
        type: 'diapers_classic',
        image: '/images/form/products/tena/p43.png',
        isSize: true,
    },
    {
        id: 'p44',
        title: 'Классические подгузники TENA Slip Plus',
        value: 'p44',
        brand: 'tena',
        type: 'diapers_classic',
        image: '/images/form/products/tena/p44.png',
        isSize: true,
    },
    {
        id: 'p45',
        title: 'Классические подгузники Tena Proskin Slip Ultima',
        value: 'p45',
        brand: 'tena',
        type: 'diapers_classic',
        image: '/images/form/products/tena/p45.png',
        isSize: true,
    },
    {
        id: 'p46',
        title: 'Поясные подгузники TENA Flex Maxi',
        value: 'p46',
        brand: 'tena',
        type: 'diapers_waist',
        image: '/images/form/products/tena/p46.png',
        isSize: true,
    },

    {
        id: 'p47',
        title: 'Пеленки TENA Bed Underpad Normal 60х60 см, 30 шт',
        value: 'p47',
        brand: 'tena',
        type: 'pampers',
        image: '/images/form/products/tena/p47.png',
    },

    {
        id: 'p48',
        title: 'Крем защитный TENA ProSkin Barrier Cream 150 мл',
        value: 'p48',
        brand: 'tena',
        type: 'cleansing',
        image: '/images/form/products/tena/p48.png',
    },
];

export const COUNTS = [
    {
        id: 'c1',
        title: 'Прокладки TENA Lady Slim Ultra Mini 14 шт.',
        product: 'p33',
        value: 'c1',
    },
    {
        id: 'c2',
        title: 'Прокладки TENA Lady Slim Ultra Mini 28 шт.',
        product: 'p33',
        value: 'c2',
    },

    {
        id: 'c3',
        title: 'Прокладки TENA Lady Slim Mini 10 шт.',
        product: 'p35',
        value: 'c3',
        image: '/images/form/products/tena/c3.png',
    },
    {
        id: 'c4',
        title: 'Прокладки TENA Lady Slim Mini 20 шт.',
        product: 'p35',
        value: 'c4',
        image: '/images/form/products/tena/c4.png',
    },

    {
        id: 'c5',
        title: 'Прокладки TENA Lady Normal 12 шт.',
        product: 'p36',
        value: 'c5',
        image: '/images/form/products/tena/c5.png',
    },
    {
        id: 'c6',
        title: 'Прокладки TENA Lady Normal 24 шт.',
        product: 'p36',
        value: 'c6',
        image: '/images/form/products/tena/c6.png',
    },

    {
        id: 'c7',
        title: 'Прокладки TENA Lady Slim Extra 10 шт.',
        product: 'p37',
        value: 'c7',
        image: '/images/form/products/tena/c7.png',
    },
    {
        id: 'c8',
        title: 'Прокладки TENA Lady Slim Extra 20 шт.',
        product: 'p37',
        value: 'c8',
        image: '/images/form/products/tena/c8.png',
    },
];

export const SIZES = [
    {
        id: 's1',
        title: 'Впитывающие трусы TENA Lady Pants Plus M, черн 9 шт.',
        product: 'p40',
        value: 's1',
        image: '/images/form/products/tena/s1.png'
    },
    {
        id: 's2',
        title: 'Впитывающие трусы TENA Lady Pants Plus L, черн 8 шт.',
        product: 'p40',
        value: 's2',
        image: '/images/form/products/tena/s2.png'
    },

    {
        id: 's3',
        title: 'Подгузники-трусы TENA Pants Normal S 15 шт.',
        product: 'p41',
        value: 's3',
        image: '/images/form/products/tena/s3.png'
    },
    {
        id: 's4',
        title: 'Подгузники-трусы TENA Pants Normal М 10 шт.',
        product: 'p41',
        value: 's4',
        image: '/images/form/products/tena/s4.png'
    },
    {
        id: 's5',
        title: 'Подгузники-трусы TENA Pants Normal M 30 шт.',
        product: 'p41',
        value: 's5',
        image: '/images/form/products/tena/s5.png'
    },
    {
        id: 's6',
        title: 'Подгузники-трусы TENA Pants Normal L 10 шт.',
        product: 'p41',
        value: 's6',
        image: '/images/form/products/tena/s6.png'
    },
    {
        id: 's7',
        title: 'Подгузники-трусы TENA Pants Normal L 30 шт.',
        product: 'p41',
        value: 's7',
        image: '/images/form/products/tena/s7.png'
    },
    {
        id: 's8',
        title: 'Подгузники-трусы TENA Pants Normal XL 15 шт.',
        product: 'p41',
        value: 's8',
        image: '/images/form/products/tena/s8.png'
    },

    {
        id: 's9',
        title: 'Подгузники-трусы TENA Pants Night Super M 10 шт.',
        product: 'p42',
        value: 's9',
        image: '/images/form/products/tena/s9.png'
    },
    {
        id: 's10',
        title: 'Подгузники-трусы TENA Pants Night Super L 10 шт.',
        product: 'p42',
        value: 's10',
        image: '/images/form/products/tena/s10.png'
    },

    {
        id: 's11',
        title: 'Классические подгузники TENA Slip Original M 30 шт.',
        product: 'p43',
        value: 's11',
        image: '/images/form/products/tena/s11.png'
    },
    {
        id: 's12',
        title: 'Классические подгузники TENA Slip Original L 30 шт.',
        product: 'p43',
        value: 's12',
        image: '/images/form/products/tena/s12.png'
    },

    {
        id: 's13',
        title: 'Классические подгузники TENA Slip Plus M 10 шт.',
        product: 'p44',
        value: 's13',
        image: '/images/form/products/tena/s13.png'
    },
    {
        id: 's14',
        title: 'Классические подгузники TENA Slip Plus M 30 шт.',
        product: 'p44',
        value: 's14',
        image: '/images/form/products/tena/s14.png'
    },
    {
        id: 's15',
        title: 'Классические подгузники TENA Slip Plus L 10 шт.',
        product: 'p44',
        value: 's15',
        image: '/images/form/products/tena/s15.png'
    },
    {
        id: 's16',
        title: 'Классические подгузники TENA Slip Plus L 30 шт.',
        product: 'p44',
        value: 's16',
        image: '/images/form/products/tena/s16.png'
    },
    {
        id: 's17',
        title: 'Классические подгузники TENA Slip Plus XL 28 шт.',
        product: 'p44',
        value: 's17',
        image: '/images/form/products/tena/s17.png'
    },

    {
        id: 's18',
        title: 'Классические подгузники Tena Proskin Slip Ultima  р.M 21 шт',
        product: 'p45',
        value: 's18',
        image: '/images/form/products/tena/s18.png'
    },
    {
        id: 's19',
        title: 'Классические подгузники Tena Proskin Slip Ultima  р.L 21 шт',
        product: 'p45',
        value: 's19',
        image: '/images/form/products/tena/s19.png'
    },

    {
        id: 's20',
        title: 'Поясные подгузники TENA Flex Maxi M 22',
        product: 'p46',
        value: 's20',
        image: '/images/form/products/tena/s20.png'
    },
    {
        id: 's21',
        title: 'Поясные подгузники TENA Flex Maxi L 22',
        product: 'p46',
        value: 's21',
        image: '/images/form/products/tena/s21.png'
    },
    {
        id: 's22',
        title: 'Поясные подгузники TENA Flex Maxi XL 21',
        product: 'p46',
        value: 's22',
        image: '/images/form/products/tena/s22.png'
    },

]


export const TYPE_TO = [
    {
        id: 'review',
        title: 'Отзыв',
        value: 'review',
    },
    {
        id: 'offer',
        title: 'Предложение',
        value: 'offer',
    },
];

export const TYPE_TO_2 = [
    {
        id: 'type-1',
        title: 'Сотрудничество по вопросу оптовых продаж',
        value: 'type-1',
    },
    {
        id: 'type-2',
        title: 'Предложения по маркетинговым активностям и другие проекты',
        value: 'type-2',
    },
    {
        id: 'type-3',
        title: 'Другое',
        value: 'type-3',
    }
];


export const ROLLS_ARR = new Array(6).fill({}).map((item, index) => {
    return {
        id: `rolls_${index + 1}`,
        title: getNumWord(index + 1, ['рулон', 'рулона', 'рулонов']),
        value: `rolls_${index + 1}`,
    };
})