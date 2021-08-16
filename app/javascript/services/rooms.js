import Api from './api';

const RoomsService = {
    create: (params) => Api.post('/api/v1/rooms', params),
}

export default RoomsService;