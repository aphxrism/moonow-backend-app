import { HttpStatusCodes } from "../common/constants/httpStatusCodes";
import { ApiError } from "../common/interfaces/apiError";

// export class PortalError extends Error {
//     readonly code!: string;
//     readonly status?: HttpStatusCodes;
//     private readonly source?: string;

//     constructor (params: ApiError) {
//         super()

//         this.code = params.code;
//         if (params.message) this.message = params.message;
//         if (params.status) this.status = params.status;
//         if (params.source) this.source = params.source;
//     }

//     getSource (): string | undefined {
//         return this.source;
//     }

//     getDebugInfo () {
//         return {
//             code: this.code,
//             message: this.message,
//             status: this.status,
//         };
//     }
// }

export function PortalError (params: ApiError) {
    return params
}