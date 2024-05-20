import {Separator} from "@/components/ui/separator";
import {ArtistRegisterForm} from "@/app/dashboard/artist/register/artist-form";

export default function ArtistRegisterPage() {
  return (
    <div>
      <h3 className="text-lg font-medium">
        Artist Registration
      </h3>
      <Separator/>
      <ArtistRegisterForm />
    </div>
  )
}