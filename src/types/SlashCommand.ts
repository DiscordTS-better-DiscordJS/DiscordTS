export type CommandOptionsChoices = {
    name: string
    value: string | number
}

export type CommandOptions = {
    name: string
    description: string
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    default?: boolean
    required?: boolean
    choices?: CommandOptionsChoices[]
    options?: CommandOptions[]
}

export interface SlashCommandType {
    name: string
    description: string
    options?: CommandOptions[]
}