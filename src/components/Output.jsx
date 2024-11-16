import { useState } from "react";
import { Box, Button, Text, Textarea, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) {
      toast({
        title: "No Code to Run",
        description: "Please enter code in the editor.",
        status: "warning",
        duration: 4000,
      });
      return;
    }
    try {
      setIsLoading(true);
      setOutput(null);
      const { run: result } = await executeCode(language, sourceCode, input);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      toast({
        title: "Execution Error",
        description: error.message || "An error occurred while running the code.",
        status: "error",
        duration: 6000,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="100%">
      <Text mb={2} fontSize="lg">Output</Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Textarea
        placeholder="Enter input for code execution"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        mb={4}
      />
      <Box
        height="35vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
