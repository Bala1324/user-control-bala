import React from 'react';
import { useCart } from 'react-use-cart';
import GooglePayButton from '@google-pay/button-react'
// import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';

const Card = () => {
    let history = useHistory();

    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();
    if (isEmpty) {
        return <h1 className="text-center">Your Cart is Empty</h1>
    }
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems}) Total Items: ({totalItems})</h5>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.img} style={{ height: '6rem' }} />
                                        </td>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>
                                            ₹{item.price}
                                        </td>
                                        <td>
                                            Quantity ({item.quantity})
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-info ms-2"
                                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            >-</button>
                                            <button
                                                className="btn btn-info ms-2"
                                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                            <button className="btn btn-danger ms-2"
                                                onClick={() => removeItem(item.id)}>Remove Item</button>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-auto ms-auto">
                    <h2>Total price: ₹ {cartTotal} </h2>
                </div>
                <div className='col-auto'>
                    <button className="btn btn-danger m-2"
                        onClick={() => emptyCart()}
                    >Clear Cart</button>
                    <button className="btn btn-primary m-2" >Buy Now</button>
                    <div>
                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '14527',
                                currencyCode: 'INR',
                                countryCode: 'IN',
                            },
                            shippingAddressRequired: true,
                            callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('Success', paymentRequest);
                        }}
                        onPaymentAuthorized={paymentData => {
                            console.log('Payment Authorised Success', paymentData)
                            return { transactionState: 'SUCCESS' }
                        }
                        }
                        onPaymentDataChanged={paymentData => {
                            console.log('On Payment Data Changed', paymentData)
                            return {}
                        }
                        }
                        existingPaymentMethodRequired='false'
                        buttonColor='black'
                        buttonType='Buy'
                    />
                    </div>

                    {/* { 
            <StripeCheckout
            label='Pay Now'
            name='Freaky Jolly Co.'
            billingAddress
            shippingAddress
            description={`Your total is $${totalPrice}`}
            amount={totalPrice.toFixed(2)}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={'pk_test_51JU7zhSJFCCnwNP2x4wWvWkal9zaw2eI1ONN7fxWyeIiw8CaTKfS13WIObPBkVc6gCD4fvZc0vkxFICdMwkL6O8H00dPcSetTD'}
            
        /> } */}

                </div>
            </div>

        </section>
    );
};

export default Card;