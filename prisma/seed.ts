import { Prisma, PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  email: "edwin.moz@outlook.com",
  hashedPassword: "",
}

async function main() {
  console.log(`Start seeding ...`)

  const hashedPassword = await bcrypt.hash("Samsung001!", 10)
  userData.hashedPassword = hashedPassword

  await prisma.user.create({
    data: userData,
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
