import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Output from "./components/Output";
import { useRef, useState } from "react";

function App() {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor editorRef={editorRef} setLanguage={setLanguage} language={language} />
      <Output editorRef={editorRef} language={language} />
    </Box>
  );
}

export default App;
