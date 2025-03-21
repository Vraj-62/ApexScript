import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input = "") => {
  try {
    if (!LANGUAGE_VERSIONS[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
      stdin: input,  // Add the input parameter here
    });

    return response.data;
  } catch (error) {
    console.error("Error executing code:", error.message);
    throw error;
  }
};
