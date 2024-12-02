export type QRCode = {
    id: number
    title: string
    text: string
    image: Uint8Array
    isFavorite: boolean
    created_at: Date
    updated_at: Date
}
export type CsrfToken = {
    csrf_token: string
}
export type Credential = {
    email: string
    password: string
}
