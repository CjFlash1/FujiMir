
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const key = "1f3dd12c344c40df149f57c68f13ddf7"
    console.log(`Setting Nova Poshta API Key: ${key}`)

    await prisma.setting.upsert({
        where: { key: 'novaposhta_api_key' },
        update: { value: key },
        create: {
            key: 'novaposhta_api_key',
            value: key,
            description: 'Nova Poshta API Key'
        }
    })
    console.log('Done.')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
