export interface Hero {
    id: number;
    name: string;
    description?: string;
    fly: boolean;
    created: Date;
    updated?: Date;
}
