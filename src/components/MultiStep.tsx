interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  return (
    <div className="">
      <label htmlFor="">
        Passo {currentStep} de {size}
      </label>

      <div className="grid-cols-step mt-1 grid gap-2">
        {Array.from({ length: size }, (_, index) => index + 1).map((step) => {
          return (
            <div
              key={step}
              aria-checked={currentStep >= step}
              className="h-1 rounded bg-gray-600 aria-checked:bg-gray-100"
            />
          )
        })}
      </div>
    </div>
  )
}
