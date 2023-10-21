import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { ModulLandKarteAstType, Model } from './generated/ast.js';
import type { ModulLandKarteServices } from './modul-land-karte-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: ModulLandKarteServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.ModulLandKarteValidator;
    const checks: ValidationChecks<ModulLandKarteAstType> = {
        Model: validator.checkModelDummy
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class ModulLandKarteValidator {

    checkModelDummy(model: Model, accept: ValidationAcceptor): void {
        if (model.name) {
            accept('warning', 'Example warning, just ignore', { node: model, property: 'name' });
        }
    }

}
