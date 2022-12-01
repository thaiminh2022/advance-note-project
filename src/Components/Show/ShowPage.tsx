import { Badge, Button, Container, Divider, Group, Stack, Title } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { staticPaths } from "../../InitialData/datas";
import ReactMarkdown from "react-markdown"
import "./show.scss"
import { OpenDeleteModal } from "../../Helper/ModalManager";

function ShowPage(props: ShowPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    if (id == undefined) {
        // Navigate back to home
        navigate(staticPaths.home, { replace: true })
    }
    const note = useMemo(() => props.notes.find(v => v.id == id), [id])!;

    const onDelete = () => {
        OpenDeleteModal("DELETE THIS NOTE", "Are you sure you want to delete this note. This action cannot be reverted or has very low chance of revert-able", () => {
            props.setNotes((prev) => {
                return prev.filter(v => v.id != note.id);
            })

            navigate(staticPaths.home)
        }, () => { })

    }

    return <>
        <Group position="apart">
            <Stack>
                <Title order={1}>{note.title}</Title>
                <Group>
                    {note.tags.map(tag => (<Badge key={tag.id} variant="filled" color={tag.color}>{tag.label}</Badge>))}
                </Group>
            </Stack>
            <Group>
                <Link to={`/${id}/edit`} ><Button variant="outline" >Edit</Button></Link>
                <Button variant="filled" color={"red"} onClick={onDelete}>Delete</Button>
                <Link to={staticPaths.home}><Button color={"gray"} variant="subtle">Back</Button></Link>
            </Group>
        </Group>
        <Divider mt={"lg"} color="pink" />
        <ReactMarkdown className="mark-down">{note.content}</ReactMarkdown>
    </>;
}

interface ShowPageProps {
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>
}
export default ShowPage;