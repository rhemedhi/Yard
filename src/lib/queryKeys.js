export const queryKeys = {
    auth: {
        base: ['auth'],
        session: () => [...queryKeys.auth.base, 'session'],
        user: (userId) => [...queryKeys.auth.base, 'user', userId]
    },
    properties: {
        base: ['properties'],
        featured: () => [...queryKeys.properties.base, 'featured'],
        newLists: () => [...queryKeys.properties.base, 'newlists'],
        categories: () => [...queryKeys.properties.base, 'categories'],
        alldata: () => [...queryKeys.properties.base, 'alldata'],
        savedPropertiesByUser: (userId) => [...queryKeys.properties.base, 'savedproperties', userId],
        savedFullProperties: (userId) => [...queryKeys.properties.base, 'savedfullproperties', userId],
        propertyview: (userId) => [...queryKeys.properties.base, 'propertyview', userId],
    },
    listing: {
        base: ['listing'],
    },
    messages: {
        base: ['messages'],
        chats: (userId) => [...queryKeys.messages.base, userId],
        chatcount: (userId, conversationId) => [...queryKeys.messages.base, userId, conversationId],
        chatInbox: (userId, conversationId) => [...queryKeys.messages.base, userId, conversationId, 'inbox'],
    },
    profile: {
        base: ['profile'],
        userProfile: (userId) => [...queryKeys.profile.base, userId],
        userListings: (userId) => [...queryKeys.profile.base, userId, 'listings']
    },
    settings: {
        base: ['settings'],
        userSetting: (userId) => [...queryKeys.settings.base, userId],
    },
};


