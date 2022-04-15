import { Router } from "express"
import { AppController } from "../../controllers/app"

const AppRouter = Router()

AppRouter.get('/package.json', AppController.getConfig)

export { AppRouter }