import { useForm } from "@mantine/form";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OpenConfirmModal } from "../../Helper/ModalManager";
import { staticPaths } from "../../InitialData/datas";
import NoteForm from "../NoteForm";

function EditPage(props: EditPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    if (id == undefined) {
        navigate(staticPaths.home, { replace: true });
    }
    const note = useMemo(() => props.notes.find(item => item.id == id), [id])!

    const form = useForm<RawNoteData>({
        initialValues: {
            title: note.title,
            content: note.content,
            tags: note.tags.map(x => x.id)
        }
    })

    const onSubmit = (values: RawNoteData) => {
        OpenConfirmModal("EDIT THIS NOTE?", "Please note that changes are not revertable, even us cant rewind time ⏱", () => {
            const data: RawNote = {
                ...values,
                id: note.id
            }
            props.setNotes((prev) => {
                const dummy = prev.filter(item => item.id != data.id)
                return [...dummy, data]
            })

            navigate(staticPaths.home);
        }, () => { })
    }


    return <>
        <h1>Edit Note</h1>
        <NoteForm form={form} onSubmit={onSubmit} initalTags={props.tags} setTags={props.setTags} />
    </>;
}

interface EditPageProps {
    tags: Tag[],
    notes: Note[]
    setNotes: (val: RawNote[] | ((prevState: RawNote[]) => RawNote[])) => void
    setTags: (val: Tag[] | ((prevState: Tag[]) => Tag[])) => void
}
export default EditPage;