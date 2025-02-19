import { model } from "@/utils/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const prompt = data.prompt;
    const result = await model.generateContent(
      prompt +
        "(take this text and make it into different questions return in a json format as such {main topic:{Questions:{{question}  {answer}} }}  ) ensure they are questions and answers"
    );

    const output = result.response.text();
    // Process the output using the neat function and return the structured data
    const processedOutput = processOutput(output);
    console.log(processedOutput)
    return NextResponse.json({ content: processedOutput });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const processOutput = (output) => {
  try {
    const cleanedOutput = output.replace(/```json|```/g, "").trim();
    const jsonOutput = JSON.parse(cleanedOutput);
    const mainTopic = Object.keys(jsonOutput);
    const result = {};
    for(var i = 0; i < mainTopic.length; i++){
      result[mainTopic[i]] = jsonOutput[mainTopic[i]].Questions;
    }

    return result;

  } catch (error) {
    console.error("Failed to parse output:", error);
    return { topic: ["Error"], questions: [] };
  }
};