import { Button, Flex, Grid, Group, MultiSelect, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { staticPaths } from "../../InitialData/datas";
import NoteCard from "./NoteCard";
import "./home.scss"

function HomePage({ notes, tags }: HomePageProps) {


    const queryForm = useForm<{ title: string, tags: Tag[] }>({
        initialValues: {
            title: "",
            tags: []
        }
    })

    const filteredNotes = useMemo(() => {
        const titleFilter = queryForm.values.title;
        const tagFilters = queryForm.values.tags;

        return notes.filter((note) => {
            const noteCheck = titleFilter === "" || note.title.toLowerCase().includes(titleFilter.toLowerCase());
            const tagsCheck = tagFilters.length === 0 ||
                tagFilters.every(tagFilter => note.tags.some(noteTag => noteTag.id == tagFilter.id))

            return noteCheck && tagsCheck
        })

    }, [queryForm.values])


    return (
        <>
            <Group position="apart">

                <div ><h1>Notes</h1></div>
                <div   >
                    <Flex style={{ height: "100%" }} align="center" justify={"center"} gap={3}>
                        <Link to={staticPaths.new}>
                            <Button type="button">Create New</Button>
                        </Link>
                        <Link to={staticPaths.tags}>
                            <Button type="button" variant="outline">Edit Tags</Button>
                        </Link>
                    </Flex>
                </div>
            </Group >

            <form >
                <Group grow spacing={"lg"} >
                    <TextInput label="Title" {...queryForm.getInputProps("title")} />
                    <MultiSelect
                        data={tags.map(x => { return { label: x.label, value: x.id } })}
                        label="Tags"
                        onChange={tagsId => {
                            const fullTag: Tag[] = tagsId.map(tagId => {
                                return tags.find(tag => tag.id == tagId)!
                            })

                            queryForm.setFieldValue("tags", fullTag)

                        }} />
                </Group>
            </form>
            <Grid className="cards" grow mt={"md"}>
                {filteredNotes.map((item, index, arr) => {
                    return (
                        <Grid.Col span={"auto"} key={item.id + item.content}>
                            <NoteCard key={item.id}
                                title={item.title}
                                desc={item.content}
                                tags={item.tags}
                                id={item.id} />
                        </Grid.Col>


                    )
                })}
            </Grid>

            {/* <Button onClick={() => console.log(queryForm.values)}>Log Form</Button> */}
        </>

    );
}

interface HomePageProps {
    notes: Note[],
    tags: Tag[]
}
export default HomePage;