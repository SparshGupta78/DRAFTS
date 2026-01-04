type props = {
  state: 0 | 1,
  onClick: () => void
}

const Switch = ({state, onClick}: props) => {
  return (
  <div
    className={`p-0.75 w-12 h-6.5 rounded-full border-2 border-[var(--black-1)] duration-300 ${state ? 'bg-[var(--black-6)]' : 'bg-[var(--white-2)]'}`}
    onClick={() => onClick()}
  >
    <div className={`w-4.25 h-4.25 rounded-full duration-300 ${state ? 'bg-[var(--black-5)] translate-x-5.5' : 'bg-[var(--black-1)] translate-x-0'}`}></div>
  </div>
  )
}

export default Switch