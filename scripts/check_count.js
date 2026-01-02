
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.translation.count();
    console.log(`Translation count: ${count}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
