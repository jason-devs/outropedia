import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SearchEndingsBar() {
  return (
    <Field className="md:max-w-150">
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input
          id="input-button-group"
          placeholder="Search by # or nickname..."
        />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  );
}
