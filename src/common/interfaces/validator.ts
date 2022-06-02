export interface IValidator {

    [key: string]: (value: string) => boolean;

}