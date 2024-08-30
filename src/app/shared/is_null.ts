//================================= customs message ========================================
import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
export function IsStringOrNull(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
       registerDecorator({
          name: 'isStringOrNull',
          target: object.constructor,
          propertyName: propertyName,
          constraints: [],
          options: validationOptions,
          validator: {
             // eslint-disable-next-line @typescript-eslint/no-unused-vars
             validate(value: any, args: ValidationArguments) {
                return value === null || typeof value === 'string';
             }
          }
       });
    };
 }