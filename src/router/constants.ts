export const routes = {
  landing: {
    main: "/" as const,
    login: "/login" as const,
    signup: "/signup" as const,
    resetPass: "/reset_password" as const,
  },
  app: {
    home: "/app",
    search: "/app/search" as const,
    friends: "/app/friends" as const,
    collections: "/app/collections" as const,
    liked: "/app/liked" as const,
    room: "/app/room/:roomId" as const,
    myProfile: "/app/my_profile" as const,
    settings: "/app/settings" as const,
    serviceRedirect: "/app/service_redirect" as const,
  },
};
