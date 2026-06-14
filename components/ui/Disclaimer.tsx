import { disclaimerLong, disclaimerShort } from "@/lib/content";

export default function Disclaimer({ long = false }: { long?: boolean }) {
  return (
    <p className="text-center text-xs leading-relaxed text-ink/60">
      {long ? disclaimerLong : disclaimerShort}
    </p>
  );
}
