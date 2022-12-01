import { useMemo } from "react";
import { UseFormReturnType } from "@mantine/form";
import { Button, Grid, Group, Stack, Textarea, TextInput } from "@mantine/core";
import CreatableMultiSelect from "./CreatableMultiSelect";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { staticPaths } from "../InitialData/datas";

function NoteForm(props: NoteFormProps) {
  const form = useMemo(() => props.form, [props.form]);

  return (
    <>
      <form onSubmit={form.onSubmit(props.onSubmit)}>
        <Grid>
          <Grid.Col span={"auto"}>
            <TextInput {...form.getInputProps("title")} label="Your note title" required />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <CreatableMultiSelect
              label="Tags"
              data={props.initalTags.map(item => { return { label: item.label, value: item.id } })}
              required
              onCreate={(query) => {
                console.log("Ran")
                const item: Tag = { label: query, id: uuidv4(), color: "blue" }
                if (props.setTags != undefined) {
                  props.setTags(prev => [...prev, item]);
                }

                return { label: item.label, value: item.id }
              }}
              {...props.form.getInputProps("tags")}
            />
          </Grid.Col>
          <Grid.Col>
            <Textarea {...form.getInputProps("content")} label="Note Contents" minRows={15} />
          </Grid.Col>
        </Grid>
        <Group mt={"md"}>
          <Button type="submit">Submit the Form</Button>
          <Link to={staticPaths.home}>
            <Button variant="subtle">Cancel</Button>
          </Link>
        </Group>
      </form>
    </>
  );
}

interface NoteFormProps {
  form: UseFormReturnType<RawNoteData>;
  initalTags: Tag[]
  onSubmit: (values: RawNoteData) => void;
  setTags?: (val: Tag[] | ((prevState: Tag[]) => Tag[])) => void
}
export default NoteForm;
