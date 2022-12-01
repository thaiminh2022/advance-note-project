import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import CreatableMultiSelect from "../CreatableMultiSelect";
import NoteForm from "../NoteForm";

function NewNote(props: NewNoteProps) {
  const navigate = useNavigate();

  const form = useForm<RawNoteData>({
    initialValues: {
      title: "",
      tags: [],
      content: ""
    }
  })

  const onSubmit = (values: RawNoteData) => {
    console.log(values)

    const item: RawNote = { ...values, id: v4() }
    props.setNotes(prev => [...prev, item])
    navigate("..");
  }

  return (
    <>
      <h1>NewNote</h1>
      <NoteForm form={form} initalTags={props.tags} setTags={props.setTags} onSubmit={onSubmit} />
    </>
  );
}

interface NewNoteProps {
  tags: Tag[]
  setTags: (val: Tag[] | ((prevState: Tag[]) => Tag[])) => void
  setNotes: (val: RawNote[] | ((prevState: RawNote[]) => RawNote[])) => void
}

export default NewNote;
