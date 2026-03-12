export default function ReadReceipt({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Double checkmark — read receipt */}
      <path
        d="M1.5 6.5L5.5 10.5L13.5 2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6.5L10.5 10.5L18.5 2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
