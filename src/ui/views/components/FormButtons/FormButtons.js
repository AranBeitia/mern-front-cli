import { Link, useNavigate } from 'react-router-dom'
import { usePurchase } from '../../../../context/PurchaseContext'

export default function FormButtons() {
  const navigate = useNavigate()
  const { currentStep, changeStep } = usePurchase()
  console.log(currentStep)
  return (
    <div>
      {currentStep > 1 && (
        <button onClick={() => changeStep(currentStep - 1)}>Back</button>
      )}
      {currentStep < 4 && (
        <button onClick={() => changeStep(currentStep + 1)}>Next</button>
      )}
    </div>
  )
}
