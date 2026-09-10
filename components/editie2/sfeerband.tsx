import Image from "next/image"
import { BIJSCHRIFT_AI, isAiBeeld, sfeerband } from "@/lib/editie2/beeld"

/**
 * Een smalle beeldband, als adempauze tussen twee tekstblokken.
 *
 * Vaste verhouding, dus de band reserveert zijn ruimte voordat het beeld er
 * is: geen verschuiving in de opmaak. Nooit `priority` — dit beeld staat
 * altijd onder de vouw en mag de laadtijdmeting niet beïnvloeden.
 */
export function Sfeerband({ className = "" }: { className?: string }) {
  const beeld = sfeerband

  return (
    <div className={`relative aspect-[21/9] w-full overflow-clip ${className}`}>
      <Image
        src={beeld.src}
        alt={beeld.alt}
        fill
        sizes="100vw"
        className="ssz-drift object-cover"
        style={{ objectPosition: beeld.positie }}
      />
      {isAiBeeld(beeld) && (
        <span className="e2-glas absolute bottom-4 left-6 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:left-10">
          {BIJSCHRIFT_AI}
        </span>
      )}
    </div>
  )
}
