import Api from './api';

const UsersService = {
    sign_in: (params) => Api.post('/api/v1/users/sign_in', params),
    sign_up: (params) => Api.post('/api/v1/users/sign_up', params)
}

export default UsersService;