const express = require('express');
const OngController = require ('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const {celebrate, Segments, Joi}= require('celebrate');
const routes = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10). max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string().required()
    }).unknown()
}), profileController.index)
routes.post('/sessions', SessionController.create);


routes.get('/incidents', IncidentController.listAll);
routes.post('/incidents', IncidentController.create);
routes.get('/incidents/ongs', IncidentController.listForOng);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),incidentController.index)


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete)

module.exports = routes;
