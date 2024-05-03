export enum DBCollections {
    Users = "users",
    Rooms = "rooms"
}

export const DBCollectionToSlice = {
    [DBCollections.Users]: "user" as const,
    [DBCollections.Rooms]: "room" as const,
}
