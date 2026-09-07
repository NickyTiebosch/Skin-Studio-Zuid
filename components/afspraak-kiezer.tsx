"use client"

import { useMemo } from "react"
import { DayPicker } from "react-day-picker"
import { addMonths, format, startOfToday, startOfTomorrow } from "date-fns"
import { nl } from "date-fns/locale/nl"
import { cn } from "@/lib/utils"
import {
  DAGDELEN,
  GESLOTEN_WEEKDAGEN,
  MAANDEN_VOORUIT,
  type Afspraak,
  type DagdeelId,
  formatteerDatum,
  labelDagdeel,
  metHoofdletter,
} from "@/lib/agenda"

/**
 * Datum en dagdeel kiezen voor een afspraakaanvraag.
 *
 * De kalender is react-day-picker zonder de meegeleverde stylesheet: alle
 * opmaak komt uit de klassen hieronder, in de taal van de rest van de site
 * (serif voor de maand, kleine kapitalen voor de weekdagen, rosé-goud voor de
 * keuze). Toetsenbordbediening en de aria-labels komen uit de bibliotheek.
 */
export function AfspraakKiezer({
  afspraak,
  datum,
  onDatum,
  dagdeel,
  onDagdeel,
}: {
  afspraak: Afspraak
  datum: Date | undefined
  onDatum: (datum: Date | undefined) => void
  dagdeel: DagdeelId
  onDagdeel: (dagdeel: DagdeelId) => void
}) {
  const vandaag = useMemo(() => startOfToday(), [])
  const morgen = useMemo(() => startOfTomorrow(), [])
  const laatsteMaand = useMemo(() => addMonths(vandaag, MAANDEN_VOORUIT), [vandaag])

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0 flex flex-col gap-4">
      <legend className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
        Wanneer schikt het u? *
      </legend>

      {afspraak.toelichting && (
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
          {afspraak.toelichting}
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <DayPicker
          mode="single"
          locale={nl}
          weekStartsOn={1}
          selected={datum}
          onSelect={onDatum}
          startMonth={vandaag}
          endMonth={laatsteMaand}
          disabled={[{ before: morgen }, { dayOfWeek: GESLOTEN_WEEKDAGEN }]}
          showOutsideDays={false}
          formatters={{
            formatCaption: (maand) =>
              metHoofdletter(format(maand, "LLLL yyyy", { locale: nl })),
          }}
          labels={{
            labelPrevious: () => "Vorige maand",
            labelNext: () => "Volgende maand",
          }}
          classNames={{
            root: "font-sans text-sm w-fit shrink-0",
            months: "relative",
            month: "flex flex-col",
            nav: "absolute top-0 inset-x-0 z-10 flex items-center justify-between",
            button_previous:
              "h-9 w-9 flex items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-[color:var(--rose-gold)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground",
            button_next:
              "h-9 w-9 flex items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-[color:var(--rose-gold)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground",
            chevron: "w-4 h-4 fill-current",
            month_caption: "flex items-center justify-center h-9 px-10 mb-3",
            caption_label: "font-serif text-lg text-foreground",
            month_grid: "border-collapse",
            weekdays: "",
            weekday:
              "h-8 w-9 text-center align-middle font-sans font-normal text-[10px] tracking-[0.15em] uppercase text-muted-foreground",
            weeks: "",
            week: "",
            day: "p-0 text-center",
            day_button:
              "h-9 w-9 flex items-center justify-center font-sans text-sm text-foreground transition-colors duration-200 hover:bg-[color:var(--sand)] focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[color:var(--rose-gold)]",
            selected:
              "[&>button]:bg-[color:var(--rose-gold)] [&>button]:text-[color:var(--cream)] [&>button]:hover:bg-[color:var(--rose-gold)]",
            today: "[&>button]:underline [&>button]:underline-offset-4",
            disabled:
              "[&>button]:text-muted-foreground [&>button]:opacity-30 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent",
            outside: "invisible",
            hidden: "invisible",
          }}
        />

        <div className="flex flex-col gap-3 md:pt-12 min-w-0">
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
            Dagdeel
          </p>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Dagdeel">
            {DAGDELEN.map((d) => {
              const actief = d.id === dagdeel
              return (
                <button
                  key={d.id}
                  type="button"
                  role="radio"
                  aria-checked={actief}
                  onClick={() => onDagdeel(d.id)}
                  className={cn(
                    "border px-3 py-3 font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-200",
                    actief
                      ? "text-[color:var(--cream)]"
                      : "text-foreground hover:border-[color:var(--rose-gold)]"
                  )}
                  style={
                    actief
                      ? { backgroundColor: "var(--rose-gold)", borderColor: "var(--rose-gold)" }
                      : { borderColor: "var(--border)" }
                  }
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="font-sans text-sm leading-relaxed text-foreground" aria-live="polite">
        {datum ? (
          <>
            Uw aanvraag: {afspraak.naam.toLowerCase()} op{" "}
            <span className="font-medium">{formatteerDatum(datum)}</span>
            {dagdeel !== "geen-voorkeur" && `, ${labelDagdeel(dagdeel).toLowerCase()}`}.
            Wij bevestigen de afspraak per e-mail of telefoon.
          </>
        ) : (
          <span className="text-muted-foreground">
            Kies een datum; wij bevestigen de afspraak per e-mail of telefoon.
          </span>
        )}
      </p>
    </fieldset>
  )
}
