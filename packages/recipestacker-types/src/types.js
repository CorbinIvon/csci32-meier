"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeNotFoundTypeboxType = exports.RecipeTypeboxType = exports.IngredientMeasurementTypeboxType = exports.CreateRecipeTypeboxType = exports.UpdateRecipeTypeboxType = exports.UpsertIngredientMeasurementTypeboxType = exports.convertToUpdateRecipeDTO = exports.RECIPE_CONSTRAINTS = exports.UnitType = exports.RecipeStatus = exports.SortOrder = void 0;
// Enums and Constants
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var RecipeStatus;
(function (RecipeStatus) {
    RecipeStatus["DRAFT"] = "draft";
    RecipeStatus["PUBLISHED"] = "published";
    RecipeStatus["ARCHIVED"] = "archived";
})(RecipeStatus || (exports.RecipeStatus = RecipeStatus = {}));
var UnitType;
(function (UnitType) {
    UnitType["GRAMS"] = "g";
    UnitType["KILOGRAMS"] = "kg";
    UnitType["MILLILITERS"] = "ml";
    UnitType["LITERS"] = "l";
    UnitType["CUPS"] = "cups";
    UnitType["TABLESPOONS"] = "tbsp";
    UnitType["TEASPOONS"] = "tsp";
})(UnitType || (exports.UnitType = UnitType = {}));
exports.RECIPE_CONSTRAINTS = {
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
    MAX_INGREDIENTS: 50,
};
// Type Conversion Utilities
const convertToUpdateRecipeDTO = (recipe) => ({
    recipe_id: recipe.recipe_id,
    name: recipe.name,
    description: recipe.description,
    ingredient_measurements: recipe.ingredient_measurements.map((im) => ({
        unit: im.unit,
        quantity: im.quantity,
        ingredient_name: im.ingredient.name,
        ingredient_description: im.ingredient.description || '',
        ingredient_id: im.ingredient.ingredient_id,
    })),
});
exports.convertToUpdateRecipeDTO = convertToUpdateRecipeDTO;
// TypeBox Type Definitions
const typebox_1 = require("@sinclair/typebox");
exports.UpsertIngredientMeasurementTypeboxType = typebox_1.Type.Object({
    unit: typebox_1.Type.String(),
    quantity: typebox_1.Type.Number(),
    ingredient_id: typebox_1.Type.Optional(typebox_1.Type.String()),
    ingredient_name: typebox_1.Type.String(),
    ingredient_description: typebox_1.Type.String(),
});
exports.UpdateRecipeTypeboxType = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    directions: typebox_1.Type.Optional(typebox_1.Type.String()),
    deleted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])),
    ingredient_measurements: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Object({
        unit: typebox_1.Type.String(),
        quantity: typebox_1.Type.Number(),
        ingredient_name: typebox_1.Type.String(),
        ingredient_description: typebox_1.Type.String(),
        ingredient_id: typebox_1.Type.Optional(typebox_1.Type.String()),
    }))),
});
exports.CreateRecipeTypeboxType = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    ingredient_measurements: typebox_1.Type.Array(exports.UpsertIngredientMeasurementTypeboxType),
});
exports.IngredientMeasurementTypeboxType = typebox_1.Type.Object({
    unit: typebox_1.Type.String(),
    quantity: typebox_1.Type.Number(),
    ingredient: typebox_1.Type.Object({
        ingredient_id: typebox_1.Type.String(),
        name: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        description: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        image: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
    }),
});
exports.RecipeTypeboxType = typebox_1.Type.Object({
    recipe_id: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    directions: typebox_1.Type.String(),
    image: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
    ingredient_measurements: typebox_1.Type.Array(exports.IngredientMeasurementTypeboxType),
});
exports.RecipeNotFoundTypeboxType = typebox_1.Type.Object({
    statusCode: typebox_1.Type.Literal(404),
    message: typebox_1.Type.String(),
    error: typebox_1.Type.Literal('Not Found'),
});
