import Api from './api';

const MessagesService = {
    index: (user_id, partner_id) => Api.get(`/api/v1/messages?user=${user_id}&partner=${partner_id}`),
    create: (params) => Api.post('api/v1/messages', params)
}

export default MessagesService;