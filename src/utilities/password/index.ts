import bcrypt from 'bcrypt'

export namespace Password {

    export async function hash (password: string): Promise<string> {
        return await bcrypt.hash(password, 5)
    }

}