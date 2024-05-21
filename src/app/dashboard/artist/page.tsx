import ArtistList from "@/app/dashboard/artist/artist-list";
import {artists} from "@/app/dashboard/artist/temp-data";

export default function ArtistPage() {
  return (
    <div>
      <ArtistList artists={artists} />
    </div>
  )
}