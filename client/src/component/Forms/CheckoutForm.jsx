import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { addBooking, addPayment, updateStatus } from '../../Api/booking';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
const CheckoutForm = ({ bookingInfo, closeModal }) => {
      const navigate = useNavigate()
      console.log(bookingInfo.price);
      const stripe = useStripe();
      const elements = useElements();
      const [cardError, setCardError] = useState('');
      const { user } = useContext(AuthContext);
      const [processing, setProcessing] = useState(false)
      const [clientSecret, setClientSecret] = useState('')

      useEffect(() => {
            //genarate client secret and save in the state
            if (bookingInfo?.price) {
                  addPayment({ price: bookingInfo.price })
                        .then(data => {
                              console.log(data.clientSecret);
                              setClientSecret(data.clientSecret)
                        }).catch(err => {
                              console.log(err.message);
                        })
            }

      }, [bookingInfo])
      const handleSubmit = async (event) => {
            // Block native form submission.
            event.preventDefault();

            if (!stripe || !elements) {
                  // Stripe.js has not loaded yet. Make sure to disable
                  // form submission until Stripe.js has loaded.
                  return;
            }

            // Get a reference to a mounted CardElement. Elements knows how
            // to find your CardElement because there can only ever be one of
            // each type of element.
            const card = elements.getElement(CardElement);

            if (card == null) {
                  return;
            }

            // Use your card Element with other Stripe.js APIs
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                  type: 'card',
                  card,
            });

            if (error) {
                  console.log('[error]', error);
                  setCardError(error.message)
            } else {
                  console.log('[PaymentMethod]', paymentMethod);
            }

            setProcessing(true)
            // confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                  clientSecret,
                  {
                        payment_method: {
                              card: card,
                              billing_details: {
                                    name: user?.displayName || 'unknown',
                                    email: user?.email || 'anonymous',
                              },
                        },

                  },

            );

            if (confirmError) {
                  console.log('[error]', confirmError);
                  setCardError(confirmError.message)
            } else {
                  console.log('[paymentIntent]', paymentMethod);
                  if (paymentIntent.status === "succeeded") {
                        //save payment info to database

                        const paymentInfo = {
                              ...bookingInfo,
                              transactionId: paymentIntent.id,
                              date: new Date(),
                        }
                        addBooking(paymentInfo)
                              .then(data => {
                                    console.log(data);
                                    if (data.insertedId) {
                                          updateStatus(paymentInfo.roomId, true)
                                                .then(data => {
                                                      console.log(data);
                                                      const text = `Booking Successfull !!, TransationId: ${paymentIntent.id}`
                                                      toast.success(text)
                                                      setProcessing(false)
                                                      navigate(`/dashboard/my-bookings`)
                                                      closeModal();
                                                }).catch(err => {
                                                      setProcessing(false)
                                                      console.log(err.message);
                                                })
                                    }

                              }).catch(err => {
                                    console.log(err.message);
                              })
                  }
            }

      };



      return (
            <>
                  <form onSubmit={handleSubmit}>
                        <CardElement
                              options={{
                                    style: {
                                          base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                      color: '#000000',
                                                },
                                          },
                                          invalid: {
                                                color: '#9e2146',
                                          },
                                    },
                              }}
                        />

                        <div className='flex mt-2 justify-around'>
                              <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                    onClick={closeModal}
                              >
                                    Cancel
                              </button>
                              <button
                                    disabled={!stripe || processing || !clientSecret}
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                              // onClick={modalHandler}
                              >
                                    {processing ? <ImSpinner9 className='m-auto animate-spin' size={24} /> : <>Pay {bookingInfo?.price}$</>}
                              </button>
                        </div>
                  </form>
                  {cardError && <p className="text-red-500 text-center pt-6">{cardError}</p>}
            </>

      );
};


export default CheckoutForm;