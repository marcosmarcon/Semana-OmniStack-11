const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })
    
    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: 'apad',
            email: 'contato@contado.com',
            whatsapp: '4444444444',
            city: 'Rio del sul',
            uf: "sc"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})