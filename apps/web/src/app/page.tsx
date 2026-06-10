import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

export default function Index() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1>hello</h1>
      <Button>Click me</Button>
      <Badge>New</Badge>
    </div>
  );
}
