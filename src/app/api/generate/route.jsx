import { model } from "@/utils/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const prompt = data.prompt;
    const result = await model.generateContent(
      prompt +
        "(take this text and make it into different questions return in a json format as such {main topic:{{question}  {answer} }}) ensure they are small questions and answers"
    );

    // Return the generated content as a JSON response
    neat( result.response.text());
    return NextResponse.json({ content: result.response.text() });
  } catch (err) {
    console.error(err);
    // Return an error response with status code 500
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const neat = (output) => {
  // console.log(`The ouput ${output}`);
  const cleanedOutput = output.replace(/```json|```/g, '').trim();//cleaning the output
  let mainTopic = JSON.parse(cleanedOutput);//convertind the output to json
  console.log(`The main topic is ${Object.keys(mainTopic)}`);
}


