export const authConfig = {
    AdminDashboard: {
        roles: ['ADMIN'],
        loading: <p>Loading...</p>,
        unauthorized: '/login-with-different-user',
    },
    UserDashboard: {
        roles: ['USER'],
        loading: <p>Loading...</p>,
        unauthorized: '/login-with-different-user',
    },
};