import { cn } from "../../utils/cn"

type props = {
  setLoaderOff: boolean
}

const Loader = ({ setLoaderOff }: props) => {
  return (
    <div className={cn(
      'fixed inset-0 z-200 bg-[linear-gradient(var(--black-3),var(--black-5))] duration-700',
      setLoaderOff && 'opacity-0 pointer-events-none'
    )}>
      {!setLoaderOff && (
        <div className="relative w-full h-full grid place-items-center">
          <div className="w-fit h-22.5 flex">
            <div className="h-full w-9 flex flex-col justify-between">
              <div className="w-full h-3 bg-[var(--white-1)] rounded-l-full"></div>
              <div className="w-16 flex flex-col gap-3.25 translate-x-4">
                <div className="oFwfioeW w-full h-2.25 mx-auto bg-[var(--white-1)] opacity-70 rounded-full"></div>
                <div className="hwR3gWf w-full h-2.25 mx-auto bg-[var(--white-1)] opacity-70 rounded-full"></div>
              </div>
              <div className="w-full h-3 bg-[var(--white-1)] rounded-l-full"></div>
            </div>
            <div className="h-full w-20">
              <div className="w-full h-full rounded-r-full border-y-12 border-r-12 border-[var(--white-1)]"></div>
            </div>
          </div>
          <div className="absolute left-0 bottom-10 w-full h-fit px-10">
            <div className="w-full relative">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[radial-gradient(transparent_10%,_var(--black-5)_75%)] z-1"></div>
              <div className="hglVsNd h-0.5 bg-[var(--white-1)] rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader