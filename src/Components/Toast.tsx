
type Props = {message?: string}
const Toast = ({message}: Props) => {


    return (
    <div
    id="toast-success"
    className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs"
    role="alert"
    style={{direction: "rtl"}}
    >
<div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
    <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    >
    <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 11.917 9.724 16.5 19 7.5"
    />
    </svg>
    <span className="sr-only">Check icon</span>
  </div>
  <div className="ms-3 text-sm font-normal">{message}</div>
</div>
)
}
export default Toast
