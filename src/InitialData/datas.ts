import { MantineColor } from "@mantine/core"

const defaultTags: Tag[] = [
    {
        label: "Study",
        id: "01"
    },
    {
        label: "Work",
        id: "02"
    },
]

const staticPaths = {
    home: "/",
    new: "/new",
    tags: "/tags"
}

const colors = ["dark", "gray", "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "green", "lime", "yellow", "orange", "teal"]



export { defaultTags, staticPaths, colors }
