import { LucideMessageCircleWarning } from "lucide-react"
import { cloneElement } from "react"

type PlaceholderProps = {
  label: string
  icon?: React.ReactElement
  button?: React.ReactNode
}

const Placeholder = ({ label, icon = <LucideMessageCircleWarning />, button = <div /> }: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-2">
      {cloneElement(icon, {
        // @ts-expect-error React changing the React.ReactElement type from any to unknown
        className: "w-16 h-16 ",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {
        // @ts-expect-error React changing the React.ReactElement type from any to unknown
        cloneElement(button, {
          className: "h-10",
        })
      }
    </div>
  )
}

export { Placeholder }
