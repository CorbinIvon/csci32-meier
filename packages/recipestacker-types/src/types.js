"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECIPE_CONSTRAINTS = exports.UnitType = exports.RecipeStatus = exports.SortOrder = void 0;
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
