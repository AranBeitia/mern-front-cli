import React, {useState} from 'react'
import { useAuth } from '../../../../context/AuthContext'



export default function Purchase() {
    const { currentUser } = useAuth()
    const [step, setStep] = useState(1)
    return (
        <>
            <h1>Purchase</h1>
            <p>{currentUser.email}</p>
            <button onClick={() => setStep(step + 1)}>Next</button>
            <button onClick={() => setStep(step - 1)}>Back</button>

        {step===1?(<div>STEP1</div>):null}
        {step===2?(<div>STEP2</div>):null}
        {step===3?(<div>STEP3</div>):null}
        {step===4?(<div>STEP4</div>):null}
        </>
    )
}
