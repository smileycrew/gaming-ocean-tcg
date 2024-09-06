import { User } from "next-auth"

declare module "next-auth" {
    interface User {
        email: string
        hasAccess: boolean
        stripeCustomerId: string
    }

    interface Session {
        user: User & {
            id: string
        }
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        email: string
        hasAccess: boolean
        stripeCustomerId: string
        userId: string
    }
}
