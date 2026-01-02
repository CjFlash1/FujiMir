const fs = require('fs');
const path = 'prisma/data/translations.json';

const newItems = [
    { lang: 'uk', key: 'home.seo.title', value: 'Послуги цифрового фотодруку через інтернет у м. Дніпро' },
    { lang: 'uk', key: 'home.seo.intro', value: 'Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!' },
    { lang: 'uk', key: 'home.seo.offer', value: 'Саме це і пропонує своїм клієнтам служба друку фотографій онлайн «FUJI-Світ» — друк фотографій у Дніпрі. Ви скажете, що друк фото у Дніпрі пропонують багато хто, і, звісно ж, маєте рацію! Але відчути себе на крок попереду всіх, скориставшись послугою друку фотографій через інтернет у Дніпрі, допоможемо вам саме ми!' },
    { lang: 'uk', key: 'home.seo.services_title', value: 'У нас ви можете замовити ряд дизайнерських послуг таких як:' },
    { lang: 'uk', key: 'home.seo.service_scanning', value: 'сканування фотографій та плівок' },
    { lang: 'uk', key: 'home.seo.service_restoration', value: 'реставрація та комп\'ютерна обробка фотографій' },
    { lang: 'uk', key: 'home.seo.service_redeye', value: 'усунення ефекту червоних очей' },
    { lang: 'uk', key: 'home.seo.service_collage', value: 'розробка різноманітних макетів та колажів' },
    { lang: 'uk', key: 'home.seo.service_docs', value: 'а також зробити фотографію на документи' },
    { lang: 'uk', key: 'home.seo.service_film', value: 'продаж фотоплівки та проявка плівок' },
    { lang: 'uk', key: 'home.seo.service_frames', value: 'продаж фоторамок різних розмірів' },
    { lang: 'uk', key: 'home.seo.slogan', value: 'Наш сервіс для тих людей, хто цінує свій час та гроші!' },

    { lang: 'ru', key: 'home.seo.title', value: 'Услуги цифровой фотопечати через интернет в г. Днепр' },
    { lang: 'ru', key: 'home.seo.intro', value: 'Как вы думаете, для чего нужны фотографии? Фотографии нужны для того, чтобы запечатлеть уникальные моменты жизни, которые, возможно, никогда не повторятся!' },
    { lang: 'ru', key: 'home.seo.offer', value: 'Именно это и предлагает своим клиентам служба печати фотографий онлайн «FUJI-Світ» — печать фотографий в Днепре. Вы скажете, что печать фото в Днепре предлагают многие, и, конечно же, будете правы! Но почувствовать себя на шаг впереди всех, воспользовавшись услугой печати фотографий через интернет в Днепре, поможем вам именно мы!' },
    { lang: 'ru', key: 'home.seo.services_title', value: 'У нас вы можете заказать ряд дизайнерских услуг, таких как:' },
    { lang: 'ru', key: 'home.seo.service_scanning', value: 'сканирование фотографий и пленок' },
    { lang: 'ru', key: 'home.seo.service_restoration', value: 'реставрация и компьютерная обработка фотографий' },
    { lang: 'ru', key: 'home.seo.service_redeye', value: 'устранение эффекта красных глаз' },
    { lang: 'ru', key: 'home.seo.service_collage', value: 'разработка разнообразных макетов и коллажей' },
    { lang: 'ru', key: 'home.seo.service_docs', value: 'а также сделать фотографию на документы' },
    { lang: 'ru', key: 'home.seo.service_film', value: 'продажа фотопленки и проявка пленок' },
    { lang: 'ru', key: 'home.seo.service_frames', value: 'продажа фоторамок разных размеров' },
    { lang: 'ru', key: 'home.seo.slogan', value: 'Наш сервис для тех людей, кто ценит свое время и деньги!' },

    { lang: 'en', key: 'home.seo.title', value: 'Digital photo printing services via the Internet in Dnipro' },
    { lang: 'en', key: 'home.seo.intro', value: 'What do you think photographs are for? Photographs are needed to capture unique moments in life that may never happen again!' },
    { lang: 'en', key: 'home.seo.offer', value: 'This is exactly what the online photo printing service «FUJI-Svit» offers — photo printing in Dnipro. You might say that many offer photo printing in Dnipro, and, of course, you would be right! But we are the ones who will help you feel a step ahead of everyone else by taking advantage of the online photo printing service in Dnipro!' },
    { lang: 'en', key: 'home.seo.services_title', value: 'Here you can order a range of design services such as:' },
    { lang: 'en', key: 'home.seo.service_scanning', value: 'scanning photos and films' },
    { lang: 'en', key: 'home.seo.service_restoration', value: 'restoration and computer processing of photos' },
    { lang: 'en', key: 'home.seo.service_redeye', value: 'red-eye removal' },
    { lang: 'en', key: 'home.seo.service_collage', value: 'development of various layouts and collages' },
    { lang: 'en', key: 'home.seo.service_docs', value: 'as well as take a photo for documents' },
    { lang: 'en', key: 'home.seo.service_film', value: 'sale of photographic film and film development' },
    { lang: 'en', key: 'home.seo.service_frames', value: 'sale of photo frames of various sizes' },
    { lang: 'en', key: 'home.seo.slogan', value: 'Our service is for those who value their time and money!' },

    // Benefits Fixes
    { lang: 'en', key: 'benefits.delivery.desc', value: 'Production starts immediately after upload. Delivery throughout Ukraine.' },
    { lang: 'en', key: 'benefits.delivery.title', value: 'Fast Delivery' },
    { lang: 'en', key: 'benefits.discounts.desc', value: 'Order more, pay less. Discounts are applied automatically in the cart.' },
    { lang: 'en', key: 'benefits.discounts.title', value: 'Auto Discounts' },
    { lang: 'en', key: 'benefits.quality.desc', value: 'Original Fuji Crystal Archive paper for bright colors and clear details.' },
    { lang: 'en', key: 'benefits.quality.title', value: 'Premium Quality' },
];

let data = JSON.parse(fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));

newItems.forEach(newItem => {
    // Find existing index
    const index = data.findIndex(i => i.key === newItem.key && i.lang === newItem.lang);
    if (index >= 0) {
        data[index] = newItem;
    } else {
        data.push(newItem);
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Updated JSON with SEO and EN fixes');
