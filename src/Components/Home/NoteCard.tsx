import { Card, Group, Badge, Button, Text, Flex, Paper } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function NoteCard(props: NoteCardProps) {



    return (
        <Paper shadow={"sm"} p="lg" radius={"md"} withBorder >
            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.title}</Text>
                <Group spacing={"sm"}>
                    {props.tags.map(tag => (
                        <Badge key={tag.label} variant="outline" color={tag.color}>
                            {tag.label}
                        </Badge>
                    ))}
                </Group>

            </Group>
            <Text size="sm" color="dimmed" lineClamp={3}>
                {props.desc}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" component={Link} to={`/${props.id}`}>
                View
            </Button>
        </Paper>
    )

}

interface NoteCardProps {
    title: string,
    desc: string,
    tags: Tag[]
    id: string
}
export default NoteCard;