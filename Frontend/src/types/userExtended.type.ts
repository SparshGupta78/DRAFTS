import type { UserType } from "./user.type"

export type userTypeExtended = UserType & {
    email: string
}