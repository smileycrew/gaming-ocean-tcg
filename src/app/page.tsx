import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const cards = [
  {
    id: 1,
    description: "description",
    price: 3.99,
  },
  {
    id: 2,
    description: "description",
    price: 3.99,
  },
  {
    id: 3,
    description: "description",
    price: 3.99,
  },
  {
    id: 4,
    description: "description",
    price: 3.99,
  },
  {
    id: 5,
    description: "description",
    price: 3.99,
  },
]

export default function Home() {
  return (
    <main className="flex flex-col gap-10 items-center justify-between p-24">
      <Card className="flex items-center h-[200px] hover:drop-shadow-md w-[800px]">
        <CardContent className="grid grid-cols-[1fr,2fr]">
          <div>
            <p className="text-2xl font-semibold">New releases</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              magni.
            </p>
          </div>
          <div className="bg-gray-100"></div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-10">
        {cards.map((card) => (
          <Card className="hover:border-black" key={card.id}>
            <CardContent>
              <div className="h-[200px] w-[200px]"></div>
              <p>price</p>
              <p>description</p>

              <Button className="bg-[#00A3E0] hover:bg-[#00A3E0]/90">
                Pre order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
