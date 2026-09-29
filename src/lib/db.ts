import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaSchemaHash?: string
}

// Detect Prisma client schema version to allow hot-reload of new models in dev.
const SCHEMA_HASH = 'ppdb-v1'

// In dev, if the schema hash changed (e.g. new models added), recreate the client.
if (process.env.NODE_ENV !== 'production') {
  if (globalForPrisma.prismaSchemaHash !== SCHEMA_HASH) {
    if (globalForPrisma.prisma) {
      try { globalForPrisma.prisma.$disconnect(); } catch {}
      globalForPrisma.prisma = undefined
    }
    globalForPrisma.prismaSchemaHash = SCHEMA_HASH
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
