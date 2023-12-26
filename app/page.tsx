import Button from "@/src/components/ui/Button"
import { db } from "@/src/lib/db"

export default async function Home() {

  await db.set('hello', 'hello')
  return <Button>Home</Button>
}
