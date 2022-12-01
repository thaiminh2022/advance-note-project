import { Container } from "@mantine/core";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import NewNote from "./Components/NewNote/NewNote";
import { defaultTags } from "./InitialData/datas";
import HomePage from "./Components/Home/HomePage";
import { useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ShowPage from "./Components/Show/ShowPage";
import EditPage from "./Components/Edit/EditPage";
import EditTagPage from "./Components/EditTags/EditTagPage";


function App() {
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])

  const notesWithTags: Note[] = useMemo(() => {
    const data = notes.map(note => {
      const noteTags = tags.filter(x => note.tags.includes(x.id))
      return { id: note.id, content: note.content, title: note.title, tags: noteTags }
    })
    return data;

  }, [notes, tags])


  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage notes={notesWithTags} tags={tags} />} />
        <Route path="/new" element={<NewNote tags={tags} setTags={setTags} setNotes={setNotes} />} />
        <Route path=":id" >
          <Route index element={<ShowPage notes={notesWithTags} setNotes={setNotes} />} />
          <Route path="edit" element={<EditPage tags={tags} notes={notesWithTags} setNotes={setNotes} setTags={setTags} />} />
        </Route>
        <Route path="/tags" element={<EditTagPage tags={tags} setTags={setTags} setNotes={setNotes} />} />
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>

    </Container>
  );
}

export default App;
