import { getNumWord } from "./formUtils.js";
import { apiRequest } from "./api.js";

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
    FILE_EXT: {
        rule: 'files',
        value: {
            files: {
                extensions: ['jpeg', 'JPG' ,'jpg', 'png','webp', 'png','mp4','ogg','webm'],
                types: [
                    "image/jpeg",
                    "image/jpg",
                    "image/x-png",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "audio/aac",
                    "video/mpeg",
                    "video/mp4",
                    "video/x-msvideo",
                    "video/ogg",
                    "application/ogg",
                    "video/webm"
                ],
            },
        },
        errorMessage: 'Можно загружать только фото и видео',
    },
    FILE_SIZE: {
        rule: 'files',
        value: {
            files: {
                maxSize: 20000000,
            },
        },
        errorMessage: 'Можно загружать файлы не более 20 мб',
    }

}

export const BRANDS = [
    {
        id: 'Zewa',
        title: 'Zewa',
        value: 'zewa',
        image: '/images/form/zewa.png',
        folder: 'zewa',
    },
    {
        id: 'Libresse',
        title: 'Libresse',
        value: 'libresse',
        image: '/images/form/lib.png',
        folder: 'lib',
    },
    {
        id: 'Tena',
        title: 'ТЕНА',
        value: 'tena',
        image: '/images/form/tena.png',
        folder: 'tena',
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
        mask: /^[a-zA-ZА-Яа-я\s]{1,50}$/,
        rules: [
            RULES.REQ
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
            title: 'Урологические прокладки',
            value: 'laying',
        },
        {
            id: 't2',
            title: 'Впитывающие трусы для женщин',
            value: 'briefs',
        },
        {
            id: 't3',
            title: 'Подгузники-трусы',
            value: 'diapers_care',
        },
        {
            id: 't4',
            title: 'Классические подгузники для взрослых',
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

const result = await apiRequest('https://xn--h1aazag6d.xn--p1acf/api/products/', {}, { 'Content-Type': 'application/json' }).then(function (data) {
    return data;
});

export const PRODUCTS = result;

export const COUNTS = [
    {
        id: 'c1',
        title: 'Прокладки TENA Lady Slim Ultra Mini 14 шт.',
        product: 'p33',
        value: 'c1',
        image: '/images/form/products/tena/c1.png',
    },
    {
        id: 'c2',
        title: 'Прокладки TENA Lady Slim Ultra Mini 28 шт.',
        product: 'p33',
        value: 'c2',
        image: '/images/form/products/tena/c2.png',
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
        image: '/images/form/products/tena/s1.png',
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
    // {
    //     id: 's23',
    //     title: 'Впитывающие трусы TENA Lady Slim Pants Normal M 8 шт.',
    //     product: 'p39',
    //     value: 's23',
    //     image: '/images/form/products/tena/s23.png'
    // },
    {
        id: 's23',
        title: 'Впитывающие трусы TENA Lady Slim Pants Normal L 7 шт.',
        product: 'p39',
        value: 's23',
        image: '/images/form/products/tena/s23.png'
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