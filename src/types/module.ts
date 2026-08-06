/** A single named input or output of a module. */
export interface Feature {
  feature_name: string;
  feature_datatype: string;
}

/**
 * A module: one API contract entry inside a session.
 * Field names and shape match the JSON contract supplied in the project brief exactly.
 */
export interface Module {
  number: number;
  page: string;
  name: string;
  description: string;
  input_features: Feature[];
  output_features: Feature[];
  api_route: string;
}

/** Common datatype suggestions offered in the module form (freeform text is still allowed). */
export const FEATURE_DATATYPES = [
  "string",
  "integer",
  "float",
  "boolean",
  "array",
  "object",
  "date",
  "datetime",
  "file",
] as const;
