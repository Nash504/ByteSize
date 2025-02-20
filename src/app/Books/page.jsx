import { Card, CardHeader } from "@/components/ui/card";



export default function Books() {
  return (
    <div className="p-2">
      //visit you soon
      <h1 className="text-4xl p-10">Books</h1>
      <div className="flex flex-wrap border-4 w-full h-full">
      <Card>
        <CardHeader>first</CardHeader>
      </Card>
      <Card>
        <CardHeader>second
        </CardHeader>
      </Card>
      </div>
      <h1 className="text-4xl p-10">Caming Soon!!</h1>
    </div>
  );
}