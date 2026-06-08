export const routes = {
  landing: {
    main: `/together-webapp/` as const,
    login: "/together-webapp/login" as const,
    signup: "/together-webapp/signup" as const,
    resetPass: "/together-webapp/reset_password" as const,
  },
  app: {
    home: "/together-webapp/app",
    search: "/together-webapp/app/search" as const,
    friends: "/together-webapp/app/friends" as const,
    collections: "/together-webapp/app/collections" as const,
    liked: "/together-webapp/app/liked" as const,
    room: "/together-webapp/app/room/:roomId" as const,
    myProfile: "/together-webapp/app/my_profile" as const,
    settings: "/together-webapp/app/settings" as const,
    serviceRedirect: "/together-webapp/app/service_redirect" as const,
  },
};
