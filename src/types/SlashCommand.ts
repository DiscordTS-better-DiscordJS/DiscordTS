export type Choices = {
    name: string
    description?: string

}

export type Options = {
    name: string
    description?: string
    type: number
    required?: boolean
    choices?: Choices[]
    options?: Options[]
}

export interface SlashCommandType {
    name: string
    type: number,
    description: string
    options?: Options[]
}