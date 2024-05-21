import {ScrollArea} from "@/components/ui/scroll-area";
import {Artist} from "@/app/dashboard/artist/temp-data";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

interface ArtistListProps {
  artists: Artist[]
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <ScrollArea className="h-screen">

      <div className="flex flex-col gap-2 p-4 pt-9">
        {artists.map((artist) => (
          <Card key={artist.id}>
            <CardHeader>
              <CardTitle>{artist.name}</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, soluta!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, velit.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}