export const server = import.meta.env.VITE_BACKEND_URL;


export const API_PATHS = {
    USER: {
        LOGIN: '/users/login',
        SIGNUP: '/users/signup',
        LOGOUT: '/users/logout',
    },
    CHANNEL: {
        CREATE: "/channels/create",
        JOIN: (id) => `/channels/${id}/join`,
        LEAVE: (id) => `/channels/${id}/leave`,
        MY_CHANNELS: "/channels/my",
        DISCOVER: "/channels",
        DETAILS: (id) => `/channels/${id}`,
    },
    MESSAGE:{
        GET:(channelId,page)=>`/channels/message/${channelId}?page=${page}`
    }


}