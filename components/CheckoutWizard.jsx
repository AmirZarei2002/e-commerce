export default function CheckoutWizard({ activeStep = 0 }) {
    return (
      <div className="mb-5 flex flex-wrap">
        {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
          (step, index) => (
            <div
              key={step}
              className={`flex-1 border-b-2  
            text-center 
         ${
           index <= activeStep
             ? 'border-indigo-600  light-yellow'
             : 'border-gray-400 text-white'
         }
            
         `}
            >
              {step}
            </div>
          )
        )}
      </div>
    );
  }