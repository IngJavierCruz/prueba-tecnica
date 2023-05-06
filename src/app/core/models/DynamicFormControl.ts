import { TypeControlOption } from "./TypeControlOption";

export interface DynamicFormControl {
  id?: number;
  label: string;
  typeControl: number;
  dynamicFormId: number;
  typesControlsOptions?: TypeControlOption[];
}