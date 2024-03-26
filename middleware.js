// Импортируем `default` из модуля `next-auth/middleware`. Это позволяет использовать Next.js middleware для аутентификации 
export {default} from 'next-auth/middleware'

// Конфигурация для middleware. Она определяет массив путей, для которых middleware должен быть применен.
export const config = {
    // Массив путей, для которых аутентификация должна быть применена.
    // Когда пользователь заходит по одному из этих путей, middleware будет применять аутентификацию.
    matcher: ['/properties/add', '/profile', '/properties/saved', '/messages']
}
