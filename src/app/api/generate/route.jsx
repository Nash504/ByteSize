import { model } from "@/utils/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const prompt = data.prompt;
    const result = await model.generateContent(
      prompt +
        "(take this text and make it into different questions return in a json format as such {main topic:{Questions:{{question}  {answer}} }}  ) ensure they are small questions and answers"
    );

    // Return the generated content as a JSON response
    neat(result.response.text());
    return NextResponse.json({ content: result.response.text() });
  } catch (err) {
    console.error(err);
    // Return an error response with status code 500
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const neat = (output) => {
  try {
    // Remove backticks and json content
    const cleanedOutput = output.replace(/```json|```/g, '').trim();
    const jsonOutput = JSON.parse(cleanedOutput);
    const mainTopic = Object.keys(jsonOutput)[0];
    console.log(`The main topic is ${mainTopic ? mainTopic : "not found"}`);
    jsonOutput[mainTopic].Questions.forEach((q, index) => {
      console.log(`Question ${index + 1}: ${q.question}`);
      console.log(`Answer ${index + 1}: ${q.answer}`); 
    });
  } catch (error) {
    console.error("Failed to parse output:", error);
    
  }
}
