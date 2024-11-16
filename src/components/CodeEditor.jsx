import { useRef, useState } from "react";
import { Box, Flex, HStack, Button, Select, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { CODE_SNIPPETS } from "../constants";

const themes = ["vs-dark", "light", "hc-black"]; // Available themes

const CodeEditor = ({ editorRef, setLanguage, language }) => {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  const onThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const saveCode = () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const blob = new Blob([sourceCode], { type: "text/plain" });
    const link = document.createElement("a");

    const fileName = `code.${language === "javascript" ? "js" : language}`;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const runCode = async () => {
    console.log("Run code logic here");
  };

  return (
    <Box>
      {/* Navbar */}
      <Flex
        as="nav"
        bg="blue.1200"
        color="white"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >

        <Text fontSize="xl" fontWeight="bold">
          My Code Editor
        </Text>


        <HStack spacing={4}>
          <Button colorScheme="teal" onClick={() => alert("New File")}>
            New File
          </Button>
          <Button colorScheme="blue" onClick={saveCode}>
            Save Code
          </Button>
          <Button colorScheme="green" onClick={runCode}>
            Run Code
          </Button>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Select
            value={theme}
            onChange={onThemeChange}
            w="150px"
            bg="white"
            color="black"
            borderColor="gray.300"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>


      <HStack spacing={4} mt={4}>
        <Box w="100%">
          <Editor
            options={{ minimap: { enabled: false } }}
            height="60vh"
            width="100%"
            theme={theme}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>
        {/* <Box w="40%">
          <Output
            editorRef={editorRef}
            language={language}
            input={input}
            setInput={setInput}
            setOutput={setOutput}
          />
        </Box> */}
      </HStack>
    </Box>
  );
};

export default CodeEditor;
