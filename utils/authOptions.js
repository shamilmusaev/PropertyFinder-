import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

// Настройки для аутентификации с помощью Google
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // Определяем обратные вызовы для работы сессий
  callbacks: {
    // Вызывается при успешной авторизации
    async signIn({ profile }) {
      // 1. Подключаемся к базе данных
      await connectDB();
      // 2. проверяем, существует ли пользователь в базе данных
      const userExists = await User.findOne({ email: profile.email });
      // 3. если нет, добавляем пользователя в базу данных
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. возвращаем true, чтобы разрешить авторизацию
      return true;
    },
    // Модифицирует объект сессии
    async session({ session }) {
      // 1. получаем пользователя из базы данных
      const user = await User.findOne({ email: session.user.email });
      // 2. присваиваем идентификатор пользователя сессии
      session.user.id = user._id.toString();
      // 3 возвращаем сессию
      return session;
    },
  },
};
