import {Redis} from '@upstash/redis'

export const db =  new Redis({
    url: 'https://usw1-direct-bulldog-33324.upstash.io',
    token: 'AYIsASQgZDk0ZmUzMDAtNGQ2MS00N2YxLTg1MzYtYjYyYjE1YmY1NWEzOTFmYzNmMGEyODM3NDU4Yjg0OGE0ZDYyN2NhY2M2NWY='
})