
const newPayment = (token, fee) => {

    const stripe = require("stripe")(process.env.STRIPE_API_KEY);

    return stripe.customers.create({
        email: "angelh2m@gmail.com",
        source: token
    })
        .then(customer => stripe.charges.create({
            amount: fee * 100,
            description: "Sample Charge",
            currency: "usd",
            customer: customer.id
        }))
        .then(charge => charge)
        .catch(err => err)
}

const recurringPayment = (customerID, fee) => {

    const stripe = require("stripe")(process.env.STRIPE_API_KEY);

    return stripe.charges.create({
        amount: fee, // $15.00 this time
        currency: 'usd',
        customer: customerID, // Previously stored, then retrieved
        description: 'Example charge',
    })
        .then(charge => charge)
        .catch(err => err)

}

module.exports = {
    newPayment,
    recurringPayment
}