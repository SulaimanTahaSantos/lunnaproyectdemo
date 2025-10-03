// Con esto se crea una instancia de Prisma Client que se puede reutilizar en toda la aplicación

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
