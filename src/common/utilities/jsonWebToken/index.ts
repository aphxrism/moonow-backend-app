import jwt, { JwtPayload } from 'jsonwebtoken'
import { jsonWebTokenOptions } from './config'

export class JsonWebToken {

    static generate = (email: string): string | null => {
        try {
            const payload = { email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, jsonWebTokenOptions)
            return token
        } catch (err) {
            return null
        }
    }

    static verify = (token: string): string | JwtPayload | null => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET, jsonWebTokenOptions)
        } catch (err) {
            return null
        }
    }

}