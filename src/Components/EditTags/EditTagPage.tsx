import { Badge, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { colors as tagColors, staticPaths } from "../../InitialData/datas";
import { OpenConfirmModal } from "../../Helper/ModalManager"
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { IconPlus, IconTag } from "@tabler/icons"

function EditTagPage(props: EditTagPageProps) {
    const navigate = useNavigate();

    const form = useForm<{ tags: Tag[] }>({
        initialValues: {
            tags: props.tags,
        }
    })

    const formSubmit = (value: { tags: Tag[] }) => {
        OpenConfirmModal("SET TAGS", "You sure u want to update these tags? Unable to revert", () => {
            props.setTags(value.tags);

            props.setNotes((prev) => {
                const data = prev.map(note => { return { ...note, tags: note.tags.filter(tag => value.tags.map(tagId => tagId.id).includes(tag)) } })
                return data;
            })

            navigate(staticPaths.home)

        }, () => { })
    }

    const removeTag = (index: number) => {
        form.removeListItem("tags", index);
    }
    const AddNewTag = () => {
        const tagItem: Tag = {
            label: "empty tag",
            id: uuidV4(),
            color: "blue"
        }
        props.setTags(prev => {
            return [...prev, tagItem]
        })
        form.insertListItem("tags", tagItem);
    }

    return (
        <>
            <form onSubmit={form.onSubmit(formSubmit)}>
                <Grid>
                    {props.tags.map((tag, index, arr) => {
                        if (form.values.tags[index] == null) {
                            return;
                        }

                        const formColor = form.values.tags[index].color;
                        const formLabel = form.values.tags[index].label;

                        return (
                            <Grid.Col key={tag.id + tag.label} >
                                <Badge mb={"sm"} color={formColor} variant="filled" >{formLabel}</Badge>
                                <Grid>
                                    <Grid.Col span={2}>
                                        <Select data={tagColors} {...form.getInputProps(`tags.${index}.color`)} />
                                    </Grid.Col>
                                    <Grid.Col span={"auto"}>
                                        <TextInput  {...form.getInputProps(`tags.${index}.label`)} />
                                    </Grid.Col>
                                    <Grid.Col span={1}>
                                        <Button color={"red"}
                                            variant="outline"
                                            onClick={() => removeTag(index)}>
                                            Delete
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        )
                    })}
                </Grid>

                <Group spacing={10} mt={"xl"}>
                    <Button
                        type="submit"
                        variant="filled"
                        leftIcon={<IconPlus />}>Update tags</Button>

                    <Button type="button"
                        variant="subtle"
                        onClick={() => AddNewTag()}
                        leftIcon={<IconTag />}>New Tag</Button>
                </Group>
            </form>

        </>
    );
}

interface EditTagPageProps {
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
    setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>,
    tags: Tag[]
}
export default EditTagPage;