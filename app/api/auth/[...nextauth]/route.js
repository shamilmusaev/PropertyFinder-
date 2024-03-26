import { authOptions } from "@/utils/authOptions"
import NextAuth from "next-auth/next"

// Создаем обработчик на основе настроек аутентификации из файла authOptions.
// Функция NextAuth принимает настройки аутентификации и возвращает обработчик для обработки запросов на аутентификацию.
const handler = NextAuth(authOptions)

// Экспортируем обработчик как GET и POST. Это позволяет использовать его в качестве обработчика запросов на аутентификацию в Next.js API.
export { handler as GET, handler as POST}
