
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Generating prisma/seed.ts based on current database...');

    // Fetch data
    const settings = await prisma.setting.findMany();
    const translations = await prisma.translation.findMany();
    const pages = await prisma.page.findMany();
    const printSizes = await prisma.printSize.findMany({ include: { discounts: true } });
    const quantityTiers = await prisma.quantityTier.findMany();
    const printOptions = await prisma.printOption.findMany(); // Assuming model exists
    const magnetPrices = await prisma.magnetPrice.findMany();
    const deliveryOptions = await prisma.deliveryOption.findMany();
    const products = await prisma.product.findMany();

    // Help Center
    const helpCategories = await prisma.helpCategory.findMany({
        include: {
            translations: true,
            articles: {
                include: {
                    translations: true
                }
            }
        }
    });

    // Helper to escape JSON
    const json = (data) => JSON.stringify(data, null, 2);

    const seedContent = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const settings = ${json(settings)};
const translations = ${json(translations)};
const pages = ${json(pages)};
const printSizes = ${json(printSizes)};
const quantityTiers = ${json(quantityTiers)};
const printOptions = ${json(printOptions)};
const magnetPrices = ${json(magnetPrices)};
const deliveryOptions = ${json(deliveryOptions)};
const products = ${json(products)};
const helpCategories = ${json(helpCategories)};

async function main() {
  console.log('Starting seed...');

  // 1. Settings
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log('Seeded Settings');

  // 2. Translations
  for (const t of translations) {
    await prisma.translation.upsert({
      where: { lang_key: { lang: t.lang, key: t.key } },
      update: { value: t.value },
      create: { lang: t.lang, key: t.key, value: t.value },
    });
  }
  console.log('Seeded Translations');

  // 3. Pages
  for (const p of pages) {
    const { id, ...data } = p;
    await prisma.page.upsert({
      where: { slug_lang: { slug: p.slug, lang: p.lang } },
      update: data,
      create: data,
    });
  }
  console.log('Seeded Pages');

  // 4. Quantity Tiers (needed for discounts)
  for (const q of quantityTiers) {
    const { id, discounts, ...data } = q;
    await prisma.quantityTier.upsert({
      where: { id: q.id },
      update: data,
      create: { ...data, id: q.id },
    });
  }

  // 5. Print Sizes & Discounts
  for (const ps of printSizes) {
    const { id, discounts, ...data } = ps;
    await prisma.printSize.upsert({
      where: { slug: ps.slug },
      update: data,
      create: { ...data, id: ps.id },
    }); // Upsert size by slug

    // Re-create discounts (simplest way: delete existing for size and re-add)
    // Or upsert map. Since logic is complex, deleting old discounts for size is safer during seed.
    // However, explicit IDs help.
    if (discounts && discounts.length > 0) {
        for(const d of discounts) {
             // We need to link by tierId/printSizeId
             // Since we upserted tiers and sizes with IDs, we can use them.
             await prisma.volumeDiscount.upsert({
                 where: { id: d.id },
                 update: {
                     minQuantity: d.minQuantity,
                     price: d.price,
                     tierId: d.tierId,
                     printSizeId: ps.id
                 },
                 create: {
                     minQuantity: d.minQuantity,
                     price: d.price,
                     tierId: d.tierId,
                     printSizeId: ps.id
                 }
             }).catch(() => {
                 // Fallback if ID conflict (unlikely) -> Create new
                  prisma.volumeDiscount.create({
                     data: {
                         minQuantity: d.minQuantity,
                         price: d.price,
                         tierId: d.tierId,
                         printSizeId: ps.id
                     }
                  });
             });
        }
    }
  }
  console.log('Seeded Print Sizes & Discounts');

  // 6. Print Options
  for (const o of printOptions) {
    const { id, ...data } = o;
    await prisma.printOption.upsert({
      where: { slug: o.slug },
      update: data,
      create: data,
    });
  }

  // 7. Magnet Prices
  for (const mp of magnetPrices) {
    const { id, ...data } = mp;
    // No unique constraint on sizeSlug easily visible other than ID.
    // We'll upsert by ID if preserved, or create if not exist?
    // Let's usert by ID.
    await prisma.magnetPrice.upsert({
      where: { id: mp.id },
      update: data,
      create: { ...data, id: mp.id },
    });
  }

  // 8. Delivery Options
  for (const d of deliveryOptions) {
    const { id, ...data } = d;
    await prisma.deliveryOption.upsert({
      where: { slug: d.slug },
      update: data,
      create: data,
    });
  }

  // 9. Products
  for (const p of products) {
    const { id, ...data } = p;
    await prisma.product.upsert({
      where: { id: p.id },
      update: data,
      create: { ...data, id: p.id },
    });
  }
  console.log('Seeded Products & Configs');

  // 10. Help Center
  for (const cat of helpCategories) {
    const { id, translations, articles, ...catData } = cat;
    
    // Upsert Category
    const createdCat = await prisma.helpCategory.upsert({
      where: { slug: cat.slug },
      update: catData,
      create: catData,
    });

    // Category Translations
    for (const tr of translations) {
        const { id: trId, helpCategoryId, ...trData } = tr;
        await prisma.helpCategoryTranslation.upsert({
            where: { helpCategoryId_lang: { helpCategoryId: createdCat.id, lang: tr.lang } },
            update: trData,
            create: { ...trData, helpCategoryId: createdCat.id }
        });
    }

    // Articles
    for (const art of articles) {
         const { id: artId, translations: artTrans, helpCategoryId: ignored, ...artData } = art;
         const createdArt = await prisma.helpArticle.upsert({
            where: { slug: art.slug },
            update: { ...artData, helpCategoryId: createdCat.id },
            create: { ...artData, helpCategoryId: createdCat.id },
         });

         // Article Translations
         for (const at of artTrans) {
            const { id: atId, helpArticleId, ...atData } = at;
            await prisma.helpArticleTranslation.upsert({
                where: { helpArticleId_lang: { helpArticleId: createdArt.id, lang: at.lang } },
                update: atData,
                create: { ...atData, helpArticleId: createdArt.id }
            });
         }
    }
  }
  console.log('Seeded Help Center');

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

    fs.writeFileSync(path.join(process.cwd(), 'prisma', 'seed.ts'), seedContent);
    console.log('Created prisma/seed.ts');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
