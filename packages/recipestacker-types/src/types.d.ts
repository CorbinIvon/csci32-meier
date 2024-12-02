export interface BaseIngredient {
    name: string;
    description: string;
}
export interface BaseRecipe {
    name: string;
    description: string;
    ingredient_measurements: BaseIngredientMeasurement[];
}
export interface BaseIngredientMeasurement {
    unit: string;
    quantity: number;
    ingredient: BaseIngredient;
}
export interface Ingredient extends BaseIngredient {
    ingredient_id: string;
    image?: string | null;
    recipes?: Recipe[];
}
export interface Recipe extends BaseRecipe {
    recipe_id: string;
    deleted?: string | null;
    directions: string;
    image?: string | null;
    User?: User[];
    ingredient_measurements: {
        unit: string;
        quantity: number;
        ingredient: Ingredient;
    }[];
}
export interface IngredientMeasurement extends BaseIngredientMeasurement {
    ingredient_id: string;
    recipe_id: string;
}
export interface User {
    user_id: string;
    name: string;
    email?: string;
    savedRecipes?: Recipe[];
}
export interface IngredientMeasurementDTO {
    unit: string;
    quantity: number;
    ingredient_id?: string;
    ingredient_name: string;
    ingredient_description: string;
}
export interface RecipeDTO {
    name: string;
    description: string;
    ingredient_measurements: IngredientMeasurementDTO[];
}
export interface CreateRecipeDTO extends RecipeDTO {
    user_id?: string;
}
export interface UpdateRecipeDTO {
    recipe_id: string;
    name?: string;
    description?: string;
    directions?: string;
    deleted?: string | null;
    ingredient_measurements?: {
        unit: string;
        quantity: number;
        ingredient_name: string;
        ingredient_description: string;
        ingredient_id?: string;
    }[];
}
export interface CreateIngredientDTO extends BaseIngredient {
}
export interface SearchRecipeDTO {
    name?: string;
    ingredients?: string;
    sortColumn?: string;
    sortOrder?: SortOrder;
    take?: number;
    skip?: number;
    user_id?: string;
}
export interface RecipeContextType {
    recipes: Recipe[];
    mutate: (data?: Recipe[]) => Promise<any>;
    recipeNameQuery: string;
    setRecipeNameQuery: (query: string) => void;
    ingredients: string[];
    ingredientQuery: string;
    removeIngredient: (index: string) => void;
    setIngredients: (ingredients: string[]) => void;
    setIngredientQuery: (query: string) => void;
    showRecipeForm: boolean;
    setShowRecipeForm: (showRecipeForm: boolean) => void;
    dbStatus: boolean;
    dbStatusMessage?: string;
    editingRecipe: Recipe | null;
    handleEdit: (recipe: Recipe) => void;
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare enum RecipeStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare enum UnitType {
    GRAMS = "g",
    KILOGRAMS = "kg",
    MILLILITERS = "ml",
    LITERS = "l",
    CUPS = "cups",
    TABLESPOONS = "tbsp",
    TEASPOONS = "tsp"
}
export interface ApiResponse<T> {
    data?: T;
    error?: {
        code: number;
        message: string;
    };
}
export declare const RECIPE_CONSTRAINTS: {
    readonly NAME_MIN_LENGTH: 3;
    readonly NAME_MAX_LENGTH: 100;
    readonly DESCRIPTION_MAX_LENGTH: 500;
    readonly MAX_INGREDIENTS: 50;
};
export interface GetRecipeOrderByProps {
    sortColumn: string;
    sortOrder: SortOrder;
}
export interface FindOneRecipeProps {
    recipe_id: string;
}
export interface FindManyRecipeProps {
    name?: string;
    ingredients: string;
    sortColumn?: string;
    sortOrder?: SortOrder;
    take?: number;
    skip?: number;
    user_id?: string;
}
export interface CreateOneRecipeProps extends CreateRecipeDTO {
}
export interface DeleteOneRecipeProps {
    recipe_id: string;
}
export interface UpdateOneRecipeProps extends UpdateRecipeDTO {
}
export declare const convertToUpdateRecipeDTO: (recipe: Recipe) => UpdateRecipeDTO;
export declare const UpsertIngredientMeasurementTypeboxType: import("@sinclair/typebox").TObject<{
    unit: import("@sinclair/typebox").TString;
    quantity: import("@sinclair/typebox").TNumber;
    ingredient_id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ingredient_name: import("@sinclair/typebox").TString;
    ingredient_description: import("@sinclair/typebox").TString;
}>;
export declare const UpdateRecipeTypeboxType: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    directions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    deleted: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    ingredient_measurements: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        unit: import("@sinclair/typebox").TString;
        quantity: import("@sinclair/typebox").TNumber;
        ingredient_name: import("@sinclair/typebox").TString;
        ingredient_description: import("@sinclair/typebox").TString;
        ingredient_id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
}>;
export declare const CreateRecipeTypeboxType: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    ingredient_measurements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        unit: import("@sinclair/typebox").TString;
        quantity: import("@sinclair/typebox").TNumber;
        ingredient_id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ingredient_name: import("@sinclair/typebox").TString;
        ingredient_description: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare const IngredientMeasurementTypeboxType: import("@sinclair/typebox").TObject<{
    unit: import("@sinclair/typebox").TString;
    quantity: import("@sinclair/typebox").TNumber;
    ingredient: import("@sinclair/typebox").TObject<{
        ingredient_id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        image: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>;
}>;
export declare const RecipeTypeboxType: import("@sinclair/typebox").TObject<{
    recipe_id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    directions: import("@sinclair/typebox").TString;
    image: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    ingredient_measurements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        unit: import("@sinclair/typebox").TString;
        quantity: import("@sinclair/typebox").TNumber;
        ingredient: import("@sinclair/typebox").TObject<{
            ingredient_id: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
            image: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        }>;
    }>>;
}>;
export declare const RecipeNotFoundTypeboxType: import("@sinclair/typebox").TObject<{
    statusCode: import("@sinclair/typebox").TLiteral<404>;
    message: import("@sinclair/typebox").TString;
    error: import("@sinclair/typebox").TLiteral<"Not Found">;
}>;
//# sourceMappingURL=types.d.ts.map